@Categories = React.createClass
  addCategory: (category) ->
    categories = React.addons.update(@state.categories, { $push: [category] })
    @setState categories: categories
  getInitialState: ->
    categories: @props.data
  getDefaultProps: ->
    categories: []
  render: ->
    React.createElement MuiThemeProvider, null,
      React.DOM.div
        className: 'categories'
        React.DOM.h2
          className: 'title'
          'Categories'
        React.createElement CategoryForm, handleNewCategory: @addCategory
        React.createElement Table, null,
          React.createElement TableHeader, adjustForCheckbox: false, displaySelectAll: false,
            React.createElement TableRow, null,
              React.createElement TableHeaderColumn, null, 'Title'
              React.createElement TableHeaderColumn, null, 'Topics'
          React.createElement TableBody, displayRowCheckbox: false,
            for category in @state.categories
              React.createElement Category, key: category.id, category: category