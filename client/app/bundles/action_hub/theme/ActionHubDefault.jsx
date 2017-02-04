// References
// https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
// https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js

import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import { spacing, fontFamily, palette } from 'material-ui/baseThemes/lightBaseTheme';
// import { palette } from 'material-ui/styles/baseThemes/lightBaseTheme';
import {
  red500, grey400, grey500, grey600, grey700,
  transparent, lightWhite, white, darkWhite, lightBlack, black,
} from 'material-ui/styles/colors';

export default getMuiTheme({
  appBar: {
    color: white,
    textColor: grey600,
  },
});
