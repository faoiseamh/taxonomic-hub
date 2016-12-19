'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactcss = require('reactcss');

var _reactcss2 = _interopRequireDefault(_reactcss);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _materialColors = require('material-colors');

var _materialColors2 = _interopRequireDefault(_materialColors);

var _common = require('../common');

var _CircleSwatch = require('./CircleSwatch');

var _CircleSwatch2 = _interopRequireDefault(_CircleSwatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Circle = exports.Circle = function Circle(_ref) {
  var width = _ref.width,
      onChange = _ref.onChange,
      colors = _ref.colors,
      hex = _ref.hex,
      circleSize = _ref.circleSize,
      circleSpacing = _ref.circleSpacing;

  var styles = (0, _reactcss2.default)({
    'default': {
      card: {
        width: width,
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: -circleSpacing,
        marginBottom: -circleSpacing
      }
    }
  });

  var handleChange = function handleChange(hexCode, e) {
    return onChange({ hex: hexCode, source: 'hex' }, e);
  };

  return _react2.default.createElement(
    'div',
    { style: styles.card, className: 'circle-picker' },
    (0, _map2.default)(colors, function (c) {
      return _react2.default.createElement(_CircleSwatch2.default, {
        key: c,
        color: c,
        onClick: handleChange,
        active: hex === c.toLowerCase(),
        circleSize: circleSize,
        circleSpacing: circleSpacing
      });
    })
  );
};

Circle.defaultProps = {
  width: '252px',
  circleSize: 28,
  circleSpacing: 14,
  colors: [_materialColors2.default.red['500'], _materialColors2.default.pink['500'], _materialColors2.default.purple['500'], _materialColors2.default.deepPurple['500'], _materialColors2.default.indigo['500'], _materialColors2.default.blue['500'], _materialColors2.default.lightBlue['500'], _materialColors2.default.cyan['500'], _materialColors2.default.teal['500'], _materialColors2.default.green['500'], _materialColors2.default.lightGreen['500'], _materialColors2.default.lime['500'], _materialColors2.default.yellow['500'], _materialColors2.default.amber['500'], _materialColors2.default.orange['500'], _materialColors2.default.deepOrange['500'], _materialColors2.default.brown['500'], _materialColors2.default.blueGrey['500']]
};

exports.default = (0, _common.ColorWrap)(Circle);