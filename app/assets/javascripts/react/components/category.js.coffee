@Category = React.createClass
  render: ->
    React.createElement TableRow, null,
      React.createElement TableRowColumn, null, @props.category.title
      React.createElement TableRowColumn, null,
        React.createElement List, null,
          React.createElement ListItem, key: topic.id, primaryText: topic.title for topic in @props.category.topics
