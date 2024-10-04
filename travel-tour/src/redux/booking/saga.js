import { call, put, takeLatest } from "redux-saga/effects";

import { axiosMicro } from "../../services";
import * as Actions from "./actions";

function* getAllBookings({ payload }) {
  try {
    const response = yield call(
      typeof payload === "string"
        ? () => axiosMicro.get(`/booking?${payload}`)
        : () => axiosMicro.get("/booking", { params: payload })
    );
    yield put(Actions.getAllBookingSuccess(response.data));
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.getAllBookingFailure(messages));
    }
  }
}

function* getDetailBookings({ payload }) {
  try {
    const response = yield call(
      typeof payload === "string"
        ? () => axiosMicro.get(`/booking/${payload.id}`)
        : () => axiosMicro.get(`/booking/${payload.id}`, { params: payload })
    );
    yield put(Actions.getDetailBookingSuccess(response.data));
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.getDetailBookingFailure(messages));
    }
  }
}

function* createBooking({ payload }) {
  try {
    const response = yield call(() => axiosMicro.post("/booking", payload));
    if (response?.data?.status === "OK") {
      yield put(Actions.createBookingSuccess(response.data));
    } else {
      const messages = response.data.messages;
      yield put(Actions.createBookingFailure(messages));
    }
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.createBookingFailure(messages));
    }
  }
}

function* updateBooking({ payload }) {
  try {
    const response = yield call(() =>
      axiosMicro.put(`/booking/${payload.id}`, payload.body)
    );
    yield put(Actions.updateBookingSuccess(response.data));
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.updateBookingFailure(messages));
    }
  }
}

function* deleteBooking({ payload }) {
  try {
    yield call(() => axiosMicro.delete(`/booking/${payload}`));
    yield put(Actions.deleteBookingSuccess(payload));
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.deleteBookingFailure(messages));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.getAllBookingRequest, getAllBookings);
  yield takeLatest(Actions.getDetailBookingRequest, getDetailBookings);
  yield takeLatest(Actions.createBookingRequest, createBooking);
  yield takeLatest(Actions.updateBookingRequest, updateBooking);
  yield takeLatest(Actions.deleteBookingRequest, deleteBooking);
}