@CategoryForm = React.createClass
  getInitialState: ->
    title: ''
    color: ''
    topics: []
  handleChange: (e) ->
    name = e.target.name
    @setState "#{name}": e.target.value
  handleColorChange: (color, e) ->
    @setState "color": color.hex
  handleSubmit: (e) ->
    e.preventDefault()
    $.post '', { category: @state }, (data) =>
      @props.handleNewCategory data
      @setState @getInitialState()
    , 'JSON'
  valid: ->
    @state.title && @state.color
  render: ->
    React.DOM.form
      className: 'form-inline'
      onSubmit: @handleSubmit
      React.DOM.div
        className: 'form-group'
        React.createElement TextField,
          name: 'title'
          hintText: 'a concise title for category'
          floatingLabelText: 'Title'
          onChange: @handleChange
          value: @state.title
      React.DOM.div
        className: 'form-group'
        React.createElement ColorPicker,
          circleSpacing: 10
          onChangeComplete: @handleColorChange
          color: @state.color
      React.createElement RaisedButton,
        label: 'Create category'
        type: 'submit'
        primary: true
        disabled: !@valid()
