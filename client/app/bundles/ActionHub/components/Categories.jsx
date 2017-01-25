import React from 'react';
// import React, { PropTypes } from 'react';
import CategoryForm from './CategoryForm';

// AppBar = require('material-ui/AppBar').default;
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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


export default class Categories extends React.Component {
  // updateCategories = (categories) => {
  //   this.setState({ categories });
  // };
  // static propTypes = {
  //   actions: PropTypes.object.isRequired,
  //   data: PropTypes.object.isRequired,
  // };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  // constructor(props, _railsContext) {
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { categories: this.props.categories };
  }

  addCategory = (category) => {
    var categories = React.addons.update(this.state.categories, { $push: [category] });
    this.setState({ categories: categories });
  };

  renderCategories(categories) {
    if (categories == undefined) {
      categories = []
    }
    return categories.map((category) => {
      return(
        <TableRow key={category.id}>
          <TableRowColumn>{category.title}</TableRowColumn>
          <TableRowColumn>{category.topics.length}</TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { actions, data } = this.props;
    return (
      <div>
        <Card>
          <CardHeader title="Categories" />
          <CardMedia>
            <div className="text-center">
              <CategoryForm
                handleNewCategory={this.addCategory}
                data={data}
                actions={actions}
              />
            </div>
            <Divider style={{marginBottom: 10, marginTop: 10}} />
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Topics</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.renderCategories(data.get('$$categories'))}
              </TableBody>
            </Table>
          </CardMedia>
        </Card>
      </div>
    );
  }
}
