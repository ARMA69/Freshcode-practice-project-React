import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserAction } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, props) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUserAction(data)),
  });

  class Hoc extends React.Component {
    componentDidMount() {
      if (!this.props.data) {
        this.props.getUser(this.props.history.replace);
      }
    }

    
    render() {
      if (this.props.error) return <Redirect to="/" />;

      return (
        <>
          {this.props.isFetching ? <Spinner mtop />
            : <Component history={this.props.history} match={this.props.match} {...props} />}
        </>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
