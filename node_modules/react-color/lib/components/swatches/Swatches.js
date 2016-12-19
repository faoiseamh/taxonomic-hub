'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swatches = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactcss = require('reactcss');

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _color = require('../../helpers/color');

var _color2 = _interopRequireDefault(_color);

var _materialColors = require('material-colors');

var _materialColors2 = _interopRequireDefault(_materialColors);

var _common = require('../common');

var _reactMaterialDesign = require('../../../modules/react-material-design');

var _SwatchesGroup = require('./SwatchesGroup');

var _SwatchesGroup2 = _interopRequireDefault(_SwatchesGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Swatches = exports.Swatches = function Swatches(_ref) {
  var width = _ref.width,
      height = _ref.height,
      onChange = _ref.onChange,
      colors = _ref.colors,
      hex = _ref.hex;

  var styles = (0, _reactcss2.default)({
    'default': {
      picker: {
        width: width,
        height: height
      },
      overflow: {
        height: height,
        overflowY: 'scroll'
      },
      body: {
        padding: '16px 0 6px 16px'
      },
      clear: {
        clear: 'both'
      }
    }
  });

  var handleChange = function handleChange(data, e) {
    _color2.default.isValidHex(data) && onChange({
      hex: data,
      source: 'hex'
    }, e);
  };

  return _react2.default.createElement(
    'div',
    { style: styles.picker, className: 'swatches-picker' },
    _react2.default.createElement(
      _reactMaterialDesign.Raised,
      null,
      _react2.default.createElement(
        'div',
        { style: styles.overflow },
        _react2.default.createElement(
          'div',
          { style: styles.body },
          (0, _map2.default)(colors, function (group) {
            return _react2.default.createElement(_SwatchesGroup2.default, {
              key: group.toString(),
              group: group,
              active: hex,
              onClick: handleChange
            });
          }),
          _react2.default.createElement('div', { style: styles.clear })
        )
      )
    )
  );
};

/* eslint-disable max-len */
Swatches.defaultProps = {
  width: 320,
  height: 240,
  colors: [[_materialColors2.default.red['900'], _materialColors2.default.red['700'], _materialColors2.default.red['500'], _materialColors2.default.red['300'], _materialColors2.default.red['100']], [_materialColors2.default.pink['900'], _materialColors2.default.pink['700'], _materialColors2.default.pink['500'], _materialColors2.default.pink['300'], _materialColors2.default.pink['100']], [_materialColors2.default.purple['900'], _materialColors2.default.purple['700'], _materialColors2.default.purple['500'], _materialColors2.default.purple['300'], _materialColors2.default.purple['100']], [_materialColors2.default.deepPurple['900'], _materialColors2.default.deepPurple['700'], _materialColors2.default.deepPurple['500'], _materialColors2.default.deepPurple['300'], _materialColors2.default.deepPurple['100']], [_materialColors2.default.indigo['900'], _materialColors2.default.indigo['700'], _materialColors2.default.indigo['500'], _materialColors2.default.indigo['300'], _materialColors2.default.indigo['100']], [_materialColors2.default.blue['900'], _materialColors2.default.blue['700'], _materialColors2.default.blue['500'], _materialColors2.default.blue['300'], _materialColors2.default.blue['100']], [_materialColors2.default.lightBlue['900'], _materialColors2.default.lightBlue['700'], _materialColors2.default.lightBlue['500'], _materialColors2.default.lightBlue['300'], _materialColors2.default.lightBlue['100']], [_materialColors2.default.cyan['900'], _materialColors2.default.cyan['700'], _materialColors2.default.cyan['500'], _materialColors2.default.cyan['300'], _materialColors2.default.cyan['100']], [_materialColors2.default.teal['900'], _materialColors2.default.teal['700'], _materialColors2.default.teal['500'], _materialColors2.default.teal['300'], _materialColors2.default.teal['100']], ['#194D33', _materialColors2.default.green['700'], _materialColors2.default.green['500'], _materialColors2.default.green['300'], _materialColors2.default.green['100']], [_materialColors2.default.lightGreen['900'], _materialColors2.default.lightGreen['700'], _materialColors2.default.lightGreen['500'], _materialColors2.default.lightGreen['300'], _materialColors2.default.lightGreen['100']], [_materialColors2.default.lime['900'], _materialColors2.default.lime['700'], _materialColors2.default.lime['500'], _materialColors2.default.lime['300'], _materialColors2.default.lime['100']], [_materialColors2.default.yellow['900'], _materialColors2.default.yellow['700'], _materialColors2.default.yellow['500'], _materialColors2.default.yellow['300'], _materialColors2.default.yellow['100']], [_materialColors2.default.amber['900'], _materialColors2.default.amber['700'], _materialColors2.default.amber['500'], _materialColors2.default.amber['300'], _materialColors2.default.amber['100']], [_materialColors2.default.orange['900'], _materialColors2.default.orange['700'], _materialColors2.default.orange['500'], _materialColors2.default.orange['300'], _materialColors2.default.orange['100']], [_materialColors2.default.deepOrange['900'], _materialColors2.default.deepOrange['700'], _materialColors2.default.deepOrange['500'], _materialColors2.default.deepOrange['300'], _materialColors2.default.deepOrange['100']], [_materialColors2.default.brown['900'], _materialColors2.default.brown['700'], _materialColors2.default.brown['500'], _materialColors2.default.brown['300'], _materialColors2.default.brown['100']], [_materialColors2.default.blueGrey['900'], _materialColors2.default.blueGrey['700'], _materialColors2.default.blueGrey['500'], _materialColors2.default.blueGrey['300'], _materialColors2.default.blueGrey['100']], ['#000000', '#525252', '#969696', '#D9D9D9', '#FFFFFF']]
};

exports.default = (0, _common.ColorWrap)(Swatches);