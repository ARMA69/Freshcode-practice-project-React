import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import history from '../browserHistory';
import * as restController from '../api/rest/restController';

export function* loginSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield restController.loginRequest(action.data);
    action.history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
  }
}

export function* registerSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield restController.registerRequest(action.data);
    action.history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response });
  }
}
