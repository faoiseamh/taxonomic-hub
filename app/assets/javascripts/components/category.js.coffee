@Category = React.createClass
  render: ->
    React.DOM.tr null,
      React.DOM.td null, @props.category.title
      React.DOM.td null,
        React.DOM.ul null,
          React.DOM.li(key: topic.id, topic.title) for topic in @props.category.topics
