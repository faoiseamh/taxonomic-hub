//React Library
React = require('react')
ReactDOM = require('react-dom')
React.addons = {}
React.addons.update = require('react-addons-update')
injectTapEventPlugin = require('react-tap-event-plugin'); injectTapEventPlugin()


// Color
ColorPicker = require("react-color").CirclePicker;

//Material Design Library
MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
MaterialUi = require('material-ui')

//Material Design Library Custom Theme
// MyRawTheme = require('./theme');

// Material UI
Card = require('material-ui/Card').Card;
CardActions = require('material-ui/Card').CardActions;
CardHeader = require('material-ui/Card').CardHeader;
CardMedia = require('material-ui/Card').CardMedia;
CardTitle = require('material-ui/Card').CardTitle;
CardText = require('material-ui/Card').CardText;

Divider = require('material-ui/Divider').default;


RaisedButton = require('material-ui/RaisedButton/RaisedButton').default;

TextField = require('material-ui/TextField').default;

Table = require('material-ui/Table').Table;
TableBody = require('material-ui/Table').TableBody;
TableHeader = require('material-ui/Table').TableHeader;
TableHeaderColumn = require('material-ui/Table').TableHeaderColumn;
TableRow = require('material-ui/Table').TableRow;
TableRowColumn = require('material-ui/Table').TableRowColumn;

List = require('material-ui/List').List;
ListItem = require('material-ui/List').ListItem;