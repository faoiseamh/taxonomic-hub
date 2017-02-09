import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

// AppBar = require('material-ui/AppBar').default;
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router';

import CategoryForm from './CategoryForm';

export default class Categories extends BaseComponent {
  render() {
    const { actions, data, $$categories, getTopicsForCategory } = this.props;

    // Cannot sort $$categories directly because it is immutable
    const $$categoriesSorted = $$categories.sort((a, b) => a.get('title').localeCompare(b.get('title')));

    const categoryNodes = $$categoriesSorted.map(($$category, index) => {
      const topicNodes = getTopicsForCategory($$category.get('id')).map(($$topic, topicIndex) =>
        <ListItem
          key={$$topic.get('id') || topicIndex}
          primaryText={$$topic.get('title')}
          containerElement={<Link to={`/topics/${$$topic.get('id')}`} />}
        />,
      );

      return (
        <TableRow
          key={$$category.get('id') || index}
          style={{ backgroundColor: $$category.get('color') }}
        >
          <TableRowColumn>{$$category.get('title')}</TableRowColumn>
          <TableRowColumn>
            <List>
              {topicNodes}
            </List>
          </TableRowColumn>
        </TableRow>
      );
    });

    // Render the categories card containing table of categories
    return (
      <div>
        <Card>
          <CardHeader title="Categories" />
          <CardMedia>
            <div className="text-center">
              <CategoryForm
                data={data}
                actions={actions}
              />
            </div>
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
      </div>
    );
  }
}
