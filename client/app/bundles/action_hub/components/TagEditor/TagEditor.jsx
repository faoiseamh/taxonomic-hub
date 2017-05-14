// The pattern I've chosen for form widgets like this, for now, is to maintain the state locally.
// The local state is initially populated from props but from that point forward (after constructor)
// the state is modified and maintained locally and passed up to parent via an onChange callback
// similar to the pattern established by react-color.
// Also operating on normal JS objects (not Immutables) in local state

// TODO: Refactor to match formsy component style: https://github.com/christianalfoni/formsy-react

import React, { PropTypes } from 'react';
import _ from 'lodash';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
import { HOC } from 'formsy-react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  addButton: {
    padding: 5,
    width: 30,
    height: 30,
  },
  addButtonIcon: {
    fontSize: 20,
  },
};

const fieldNames = {
  objectId: null,
  relationshipObject: null,
  objectDisplayText: 'title',
};

class TagEditor extends BaseComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    objectName: PropTypes.string.isRequired,
    $$objects: PropTypes.object.isRequired,
    $$relationships: PropTypes.object,
    initialObjectId: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      relationships: this.props.$$relationships ? this.props.$$relationships.toJS() : [],
    };

    fieldNames.objectId = `${props.objectName}_id`;
    fieldNames.relationshipObject = `$$${props.objectName}`;

    _.bindAll(this, [
      'handleChange',
    ]);
  }

  componentDidMount() {
    const { initialObjectId, $$objects } = this.props;

    if (initialObjectId) {
      const $$initialObject = $$objects.find(
        ($$object) => $$object.get('id') === initialObjectId,
      );
      this.addRelationship($$initialObject);
    }

    this.setFormsyValue();
  }

  addRelationship($$object) {
    const relationship = {
      [fieldNames.objectId]: $$object.get('id'),
      [fieldNames.relationshipObject]: $$object.toJS(),
    };
    this.setState((prevState) => {
      // Remove a matching element that might exist if it had previously been deleted
      const newRelationships = this.constructor.removeRelationshipFromArray(
        prevState.relationships, relationship);
      newRelationships.push(relationship);
      return {
        relationships: newRelationships,
      };
    }, this.handleChange);
  }

  // Returns an array of relationships that do not have _destroy flag set
  getUndeletedRelationships() {
    const { relationships } = this.state;
    return relationships.filter((relationship) =>
      !relationship._destroy, // eslint-disable-line no-underscore-dangle
    );
  }

  // Call handleChange callback from properties, passing it the current relationships expressed by
  // id, category_id, and topic
  handleChange() {
    const { relationships } = this.state;
    const simplifiedRelationships = relationships.map((relationship) =>
      ({
        id: relationship.id,
        [fieldNames.objectId]: relationship[fieldNames.objectId],
        _destroy: relationship._destroy, // eslint-disable-line no-underscore-dangle
      }),
    );
    this.props.onChange(simplifiedRelationships);
    this.setFormsyValue();
  }

  setFormsyValue() {
    // Consider value for validation purposes to be the new state rather than the actions to be made
    const newRelationshipsState = this.getUndeletedRelationships();
    if (newRelationshipsState.length === 0) {
      this.props.setValue(undefined);
    } else {
      this.props.setValue(newRelationshipsState);
    }
  }

  // isDefaultRequiredValue() {
  //   return this.getUndeletedRelationships().length === 0;
  // }

  handleRequestDelete(relationshipToDelete) {
    this.setState((prevState) => {
      // Remove an element from the array (immutably) so setState actually gets triggered.
      const newRelationships = this.constructor.removeRelationshipFromArray(
        prevState.relationships, relationshipToDelete);

      // If the relationship being deleted had an id, add it back with the _destroy flag to
      // tell backend to delete it.
      if (relationshipToDelete.id) {
        const newRelationship = relationshipToDelete;
        newRelationship._destroy = true; // eslint-disable-line no-underscore-dangle
        newRelationships.push(newRelationship);
      }
      return {
        relationships: newRelationships,
      };
    }, this.handleChange);
  }

  // Removes a relationship from the array based on the two foreign keys
  static removeRelationshipFromArray(array, relationshipToDelete) {
    return array.filter(
      (relationship) =>
        relationship[fieldNames.objectId] !== relationshipToDelete[fieldNames.objectId],
    );
  }

  // Build the add relationship menu
  renderAddMenu() {
    const { $$objects } = this.props;

    // Convert to strings to be safe
    const selectedObjectIds = this.getUndeletedRelationships().map(
      (relationship) => relationship[fieldNames.objectId],
    );
    // Only show categories that are not already associated with this topic
    const $$availableObjects = $$objects.filter(($$object) => {
      const categoryId = $$object.get('id');
      return selectedObjectIds.indexOf(categoryId) === -1;
    });

    const categoryMenuNodes = $$availableObjects.map(($$object) =>
      <MenuItem
        key={$$object.get('id')}
        primaryText={$$object.get(fieldNames.objectDisplayText)}
        onTouchTap={() => { this.addRelationship($$object); }}
      />,
    );

    const button = (
      <IconButton
        disabled={$$availableObjects.toArray().length === 0}
        style={styles.addButton}
        iconStyle={styles.addButtonIcon}
      >
        <FontIcon className="material-icons">add</FontIcon>
      </IconButton>
    );
    return (
      <IconMenu
        iconButtonElement={button}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        touchTapCloseDelay={1}
      >
        {categoryMenuNodes}
      </IconMenu>
    );
  }

  render() {
    const selectedObjectNodes = this.getUndeletedRelationships().map(
      (relationship) => {
        // TODO: The naming convention breaks down a bit here because the overall object has been
        // converted to pure JS so $$object property is no longer an Immutable object.
        const object = relationship[fieldNames.relationshipObject];

        const chipKey = `${relationship.id}-${relationship[fieldNames.objectId]}`;
        return (
          <Chip
            key={chipKey}
            style={styles.chip}
            onRequestDelete={() => this.handleRequestDelete(relationship)}
          >
            <Avatar
              color={object.color}
              icon={<FontIcon className="material-icons">folder</FontIcon>}
            />
            {object[fieldNames.objectDisplayText]}
          </Chip>
        );
      },
    );

    return (
      <div>
        <h4>
          Categories
          {this.renderAddMenu()}
        </h4>
        <div style={styles.wrapper}>
          {selectedObjectNodes}
        </div>
        <div className="text-danger">
          {this.props.getErrorMessage()}
        </div>
      </div>
    );
  }

}

export default HOC(TagEditor);
