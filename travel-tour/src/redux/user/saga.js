import { call, put, takeLatest } from 'redux-saga/effects';

import { getFCMToken } from '../../helpers/utils';
import { axiosMicro } from '../../services';
import * as Actions from './actions';

function* getProfile() {
  try {
    const response = yield call(() => axiosMicro.get('user/get-detail'));
    yield put(Actions.getProfileSuccess(response.data));
    getFCMToken();
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.getProfileFailure(messages));
    }
  }
}

function* getConfig() {
  try {
    const response = yield call(() => axiosMicro.get('/configs'));
    yield put(Actions.getConfigSuccess(response.data));
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.getConfigFailure(messages));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.getProfileRequest, getProfile);
  yield takeLatest(Actions.getConfigRequest, getConfig);
}
