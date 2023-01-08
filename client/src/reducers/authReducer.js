import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.AUTH_ACTION_REQUEST: {
      return {
        isFetching: true,
        error: null,
      };
    }
    case ACTION.AUTH_ACTION_SUCCESS: {
      return {
        isFetching: false,
        error: null,
      };
    }
    case ACTION.AUTH_ACTION_ERROR: {
      return {
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.AUTH_ACTION_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case ACTION.AUTH_ACTION_CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
}
