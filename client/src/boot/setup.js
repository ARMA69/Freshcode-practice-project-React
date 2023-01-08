import React from 'react';
import { Provider } from 'react-redux';
import { initSocket } from '../api/ws/socketController';
import configureStore from './configureStore';
import App from '../App';

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: initSocket(configureStore()),
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }
}

export default Setup;
