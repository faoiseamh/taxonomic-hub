@Categories = React.createClass
  addCategory: (category) ->
    categories = @state.categories.slice()
    categories.push category
    @setState categories: categories
  getInitialState: ->
    categories: @props.data
  getDefaultProps: ->
    categories: []
  render: ->
    React.DOM.div
      className: 'categories'
      React.DOM.h2
        className: 'title'
        'Categories'
      React.createElement CategoryForm, handleNewCategory: @addCategory
      React.DOM.table
        className: 'table table-bordered'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'Title'
            React.DOM.th null, 'Topics'
        React.DOM.tbody null,
          for category in @state.categories
            React.createElement Category, key: category.id, category: category