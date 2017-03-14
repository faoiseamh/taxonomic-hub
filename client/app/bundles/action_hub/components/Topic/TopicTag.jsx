import React, { Component, PropTypes } from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

class TopicTag extends Component {

  static propTypes = {
    $$topic: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    margin: PropTypes.number,
  };

  static defaultProps = {
    margin: 4,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const { $$topic, categories } = this.props;
    // const {
    //   prepareStyles,
    // } = this.context.muiTheme;

    // const styles = {
    //   root: {
    //     marginBottom: 24,
    //     marginRight: 24,
    //     maxWidth: 360,
    //     width: '100%',
    //   },
    //   container: {
    //     border: 'solid 1px #d9d9d9',
    //     borderBottom: 'none',
    //     height: this.props.height,
    //     overflow: 'hidden',
    //   },
    //   bottomTear: {
    //     display: 'block',
    //     position: 'relative',
    //     marginTop: -10,
    //     maxWidth: 360,
    //   },
    // };

    const chipStyle = {
      margin: this.props.margin,
    };

    const color = categories[0].get('color');

    // <Avatar
    //   size={32}
    //   color={textColor}
    //   backgroundColor={color}
    //   icon={<FontIcon className="material-icons">library books</FontIcon>}
    // />
    // Avatar colored
    return (
      <Chip
        style={chipStyle}
      >
        <Avatar
          color={color}
          icon={<FontIcon className="material-icons">fiber_manual_record</FontIcon>}
        />
        {$$topic.get('title')}
      </Chip>
    );

    // BG colored
    // return (
    //   <Chip
    //     style={chipStyle}
    //     backgroundColor={color}
    //   >
    //     {$$topic.get('title')}
    //   </Chip>
    // );
  }
}

export default TopicTag;
