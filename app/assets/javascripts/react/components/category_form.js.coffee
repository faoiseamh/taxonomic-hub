@CategoryForm = React.createClass
  getInitialState: ->
    title: ''
    topics: []
  handleChange: (e) ->
    name = e.target.name
    @setState "#{name}": e.target.value
  handleSubmit: (e) ->
    e.preventDefault()
    $.post '', { category: @state }, (data) =>
      @props.handleNewCategory data
      @setState @getInitialState()
    , 'JSON'
  valid: ->
    @state.title
  render: ->
    React.DOM.form
      className: 'form-inline'
      onSubmit: @handleSubmit
      React.DOM.div
        className: 'form-group'
        React.createElement TextField,
          name: 'title'
          hintText: 'Title'
          onChange: @handleChange
          value: @state.title
      React.createElement RaisedButton,
        label: 'Create category'
        type: 'submit'
        primary: true
        disabled: !@valid()
