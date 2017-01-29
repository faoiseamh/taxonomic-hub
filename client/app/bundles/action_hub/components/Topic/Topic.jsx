import React from 'react';
import BaseComponent from 'libs/components/BaseComponent'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

// AppBar = require('material-ui/AppBar').default;
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

export default class Topic extends BaseComponent {
  render() {
    const { actions, data } = this.props;

    // TODO: Figure out best way to sort data in redux -- in reducer or here? Why doesn't this work?
    // const $$topic = data.get('$$topic');
    return (
      <div>topic shiz goes here</div>
    );
  }
}
