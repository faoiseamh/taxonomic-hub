// The pattern I've chosen for form widgets like this, for now, is to maintain the state locally.
// The local state is initially populated from props but from that point forward (after constructor)
// the state is modified and maintained locally and passed up to parent via an onChange callback
// similar to the pattern established by react-color.
// Also operating on normal JS objects (not Immutables) in local state
import React, { PropTypes } from 'react';
import _ from 'lodash';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
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

export default class TopicCategoryRelationshipMultiselect extends BaseComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    $$categories: PropTypes.object.isRequired,
    $$categoryTopicRelationships: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      categoryTopicRelationships: this.props.$$categoryTopicRelationships.toJS(),
    };

    _.bindAll(this, [
      'handleChange',
    ]);
  }

  addRelationship($$category) {
    const relationship = {
      category_id: $$category.get('id'),
      topic_id: $$category.get('id'),
      $$category: $$category.toJS(),
    };
    this.setState({
      categoryTopicRelationships: this.state.categoryTopicRelationships.concat([relationship]),
    }, this.handleChange);
  }

  // Call handleChange callback from properties, passing it the current relationships expressed by
  // id, category_id, and topic
  handleChange() {
    const { categoryTopicRelationships } = this.state;
    const simplifiedRelationships = categoryTopicRelationships.map((categoryTopicRelationship) =>
      ({
        id: categoryTopicRelationship.id,
        category_id: categoryTopicRelationship.category_id,
        topic_id: categoryTopicRelationship.topic_id,
      }),
    );
    this.props.onChange(simplifiedRelationships);
  }

  handleRequestDelete(relationshipToDelete) {
    // Remove an element from the array (immutably) so setState actually gets triggered.
    this.setState((prevState) => ({
      categoryTopicRelationships: prevState.categoryTopicRelationships.filter(
        (categoryTopicRelationship) =>
          !(
            categoryTopicRelationship.category_id === relationshipToDelete.category_id &&
            categoryTopicRelationship.topic_id === relationshipToDelete.topic_id
          ),
      ),
    }), this.handleChange);
  }

  // Build the add relationship menu
  renderAddMenu() {
    const { $$categories } = this.props;
    const { categoryTopicRelationships } = this.state;

    // Convert to strings to be safe
    const selectedCategoryIds = categoryTopicRelationships.map(
      (relationship) => relationship.category_id,
    );
    // Only show categories that are not already associated with this topic
    const $$availableCategories = $$categories.filter(($$category) => {
      const categoryId = $$category.get('id');
      return selectedCategoryIds.indexOf(categoryId) === -1;
    });

    const categoryMenuNodes = $$availableCategories.map(($$category) =>
      <MenuItem
        key={$$category.get('id')}
        primaryText={$$category.get('title')}
        onTouchTap={() => { this.addRelationship($$category); }}
      />,
    );

    const button = (
      <IconButton
        disabled={$$availableCategories.toArray().length === 0}
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
    const { categoryTopicRelationships } = this.state;

    const selectedCategoryNodes = categoryTopicRelationships.map(
      (categoryTopicRelationship) => {
        // TODO: The naming convention breaks down a bit here because the overall object has been
        // converted to pure JS so $$category property is no longer an Immutable object.
        const category = categoryTopicRelationship.$$category;

        const chipKey = `${categoryTopicRelationship.id}-${categoryTopicRelationship.category_id}-${categoryTopicRelationship.topic_id}`;
        return (
          <Chip
            key={chipKey}
            style={styles.chip}
            onRequestDelete={() => this.handleRequestDelete(categoryTopicRelationship)}
          >
            <Avatar
              color={category.color}
              icon={<FontIcon className="material-icons">folder</FontIcon>}
            />
            {category.title}
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
          {selectedCategoryNodes}
        </div>
      </div>
    );
  }

}
