import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

import _ from 'lodash';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router';
import CategoryForm from '../Categories/CategoryForm';
import * as paths from '../../constants/paths';

const styles = {
  actionColumnWith: 96,
};

export default class Categories extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      categoryFormOpen: false,
    };

    _.bindAll(this, [
      'handleCloseForm',
      'showAddCategory',
    ]);
  }

  handleCloseForm() {
    this.setState({ categoryFormOpen: false });
  }

  showEditCategory($$category) {
    const { getTopicsForCategory } = this.props;

    this.setState({
      categoryFormOpen: true,
      topicsForCategory: getTopicsForCategory($$category.get('id')),
      $$category,
    });
  }

  showAddCategory() {
    this.setState({
      categoryFormOpen: true,
      topicsForCategory: null,
      $$category: null,
    });
  }

  render() {
    const { actions, data, $$categories, getTopicsForCategory } = this.props;

    // Cannot sort $$categories directly because it is immutable
    const $$categoriesSorted = $$categories.sort((a, b) => a.get('title').localeCompare(b.get('title')));

    const categoryNodes = $$categoriesSorted.map(($$category, index) => {
      const topicNodes = getTopicsForCategory($$category.get('id')).map(($$topic, topicIndex) =>
        <ListItem
          key={$$topic.get('id') || topicIndex}
          primaryText={$$topic.get('title')}
          containerElement={<Link to={`/topics/${$$topic.get('id')}`} />} // eslint-disable-line jsx-a11y/anchor-has-content
        />,
      );
      // Add topic button
      // topicNodes.push(
      //   <ListItem
      //     key="add"
      //     leftIcon={<FontIcon className="material-icons">add</FontIcon>}
      //     primaryText="New Topic"
      //   />,
      // );

      return (
        <TableRow
          key={$$category.get('id') || index}
          style={{ backgroundColor: $$category.get('color') }}
        >
          <TableRowColumn width={styles.actionColumnWith}>
            <IconButton
              onClick={() => { this.showEditCategory($$category); }}
            >
              <FontIcon className="material-icons">edit</FontIcon>
            </IconButton>
          </TableRowColumn>
          <TableRowColumn>
            {$$category.get('title')}
          </TableRowColumn>
          <TableRowColumn>
            <List>
              {topicNodes}
              <IconButton
                containerElement={
                  <Link to={`${paths.TOPIC_CREATE_PATH}?category_id=${$$category.get('id')}`} /> // eslint-disable-line jsx-a11y/anchor-has-content
              }
              >
                <FontIcon className="material-icons">add</FontIcon>
              </IconButton>

            </List>
          </TableRowColumn>
        </TableRow>
      );
    });

    // Render the categories card containing table of categories
    return (
      <div>
        <Card>
          <CardHeader
            avatar={<Avatar icon={<FontIcon className="material-icons">folder</FontIcon>} />}
            title="Categories"
            subtitle="manage categories and topics"
          />
          <CardMedia>
            {
              // HACK: Wrap in divs to avoid the MUI prepareStyles warning:
              // "You cannot call prepareStyles() on the same style object more than once"
              // See https://github.com/callemall/material-ui/issues/4239
            }
            <div>
              <Divider style={{ marginBottom: 10, marginTop: 10 }} />
            </div>
            <Table selectable={false}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn width={styles.actionColumnWith} />
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Topics</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {categoryNodes}
              </TableBody>
            </Table>
          </CardMedia>
        </Card>

        <FloatingActionButton
          onTouchTap={this.showAddCategory}
          className="floating-actions-menu"
        >
          <ContentAdd />
        </FloatingActionButton>

        <CategoryForm
          data={data}
          actions={actions}
          open={this.state.categoryFormOpen}
          handleClose={this.handleCloseForm}
          topics={this.state.topicsForCategory}
          $$category={this.state.$$category}
        />
      </div>
    );
  }
}
