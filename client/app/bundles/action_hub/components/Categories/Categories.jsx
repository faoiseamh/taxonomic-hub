import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

// AppBar = require('material-ui/AppBar').default;
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import CategoryForm from './CategoryForm';

// RaisedButton = require('material-ui/RaisedButton/RaisedButton').default;
// TextField = require('material-ui/TextField').default;
// Table = require('material-ui/Table').Table;
// TableBody = require('material-ui/Table').TableBody;
// TableHeader = require('material-ui/Table').TableHeader;
// TableHeaderColumn = require('material-ui/Table').TableHeaderColumn;
// TableRow = require('material-ui/Table').TableRow;
// TableRowColumn = require('material-ui/Table').TableRowColumn;
// List = require('material-ui/List').List;
// ListItem = require('material-ui/List').ListItem;


export default class Categories extends BaseComponent {
  render() {
    const { actions, data } = this.props;

    const $$categories = data.get('$$categories');
    const categoryNodes = $$categories.map(($$category, index) =>
      <TableRow
        key={$$category.get('id') || index}
        style={{ backgroundColor: $$category.get('color') }}
      >
        <TableRowColumn>{$$category.get('title')}</TableRowColumn>
        <TableRowColumn>{$$category.get('topics').length}</TableRowColumn>
      </TableRow>,
    );

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
            <Divider style={{ marginBottom: 10, marginTop: 10 }} />
            <Table>
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
