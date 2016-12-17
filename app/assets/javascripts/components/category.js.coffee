@Category = React.createClass
  render: ->
    React.DOM.tr null,
      React.DOM.td null, @props.category.title
      React.DOM.td null, '-'
