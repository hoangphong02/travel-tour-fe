import { call, put, takeLatest } from 'redux-saga/effects';

// import { routesAuth } from '~/configs';
import { STORAGE_KEY } from '../../constants';
import { axiosMicro } from '../../services';
import { Realtime } from '../../helpers/utils';
import * as Actions from './actions';

function* loginRequest({ payload }) {
  try {
    const response = yield call(() =>
      axiosMicro.post('/clients/web/login', payload),
    );
    const {
      token_type: tokenType,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = response.data;
    localStorage.setItem(
      STORAGE_KEY.ACCESS_TOKEN,
      `${tokenType} ${accessToken}`,
    );
    localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEY.EXPIRES_IN, expiresIn);
    localStorage.setItem(STORAGE_KEY.IS_LOGIN, true);
    yield put(Actions.loginSuccess(response.data));
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.loginFailure(messages));
    }
  }
}

function* logoutRequest({ payload }) {
  try {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEY.EXPIRES_IN);
    localStorage.removeItem(STORAGE_KEY.IS_LOGIN);
    // window.location.replace(routesAuth.login);
    Realtime.leave(`users.${payload.id}`);
    yield call(() => axiosMicro.delete('/logout'));
  } catch {
    //
  }
}

function* checkUserExists({ payload }) {
  try {
    const response = yield call(() =>
      axiosMicro.get('/authentications/check', { params: payload }),
    );
    yield put(Actions.checkUserExistsSuccess(response.data));
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.checkUserExistsFailure(messages));
    }
  }
}

function* register({ payload }) {
  try {
    const response = yield call(() => axiosMicro.post('/register', payload));
    yield put(Actions.registerSuccess(response.data));
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.registerFailure(messages));
    }
  }
}

function* updateUser({ payload }) {
  try {
    const { type, data } = payload;
    const form = new FormData();
    if (type === 'forgot-password') {
      form.append('password', data.password);
    } else if (type === 'update-information') {
      if (data?.name) {
        form.append('name', data.name);
      }
      if (data?.email) {
        form.append('email', data.email);
      }
      if (data?.gender) {
        form.append('gender', data.gender);
      }
      if (data?.username) {
        form.append('username', data.username);
      }
      if (data?.username) {
        form.append('shop_id', data.shop_id);
      }
      if (data.email) {
        form.append('email', data.email);
      }
      if (data.birthday) {
        form.append('birthday', data.birthday);
      }
      if (data?.phone) {
        form.append('phone', data.phone);
      }
      if (data?.avatar) {
        form.append('avatar', data.avatar);
      }
    } else if (type === 'update-avatar') {
      form.append('avatar', data.avatar);
    }
    const response = yield call(() =>
      axiosMicro.post(`/users/${data.id}?_method=PATCH`, form),
    );
    yield put(Actions.updateUserSuccess(response.data));
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.updateUserFailure(messages));
    }
  }
}
function* uploadFile({ payload }) {
  try {
    const response = yield call(() =>
      axiosMicro.post('/files/upload', payload),
    );
    yield put(Actions.uploadFileSuccess(response.data));
  } catch (e) {
    if (e?.response?.data) {
      const messages = e.response.data;
      yield put(Actions.uploadFileFailure(messages));
    }
  }
}
// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.loginRequest, loginRequest);
  yield takeLatest(Actions.logoutRequest, logoutRequest);
  yield takeLatest(Actions.checkUserExistsRequest, checkUserExists);
  yield takeLatest(Actions.registerRequest, register);
  yield takeLatest(Actions.updateUserRequest, updateUser);
  yield takeLatest(Actions.uploadFileRequest, uploadFile);
}