// Simple example of a React "smart" component
import { PropTypes } from 'react';

import { connect } from 'react-redux';
import ActionHub from '../components/ActionHub';
import BaseComponent from '../../../libs/components/BaseComponent';
// import * as actions from '../actions/actionHubActionCreators';
import * as categoriesActionCreators from '../actions/categoriesActionCreators';


function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  console.log("in select middleware");
  console.log(state);
  return { data: state.$$categoriesStore };
}

class CategoriesContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    // location: PropTypes.shape({
    //   state: PropTypes.object,
    // }).isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(categoriesActionCreators, dispatch);
    // const locationState = this.props.location.state;

    return (
      <Categories  {...{ actions, data }} />
    );
  }
}


// Don't forget to actually use connect!
// Note that we don't export ActionHub, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(CategoriesContainer);