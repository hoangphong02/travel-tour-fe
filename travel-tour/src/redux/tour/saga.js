import { call, put, takeLatest } from "redux-saga/effects";

import { axiosMicro } from "../../services";
import * as Actions from "./actions";

function* getAllTours({ payload }) {
  try {
    const response = yield call(
      typeof payload === "string"
        ? () => axiosMicro.get(`/tour?${payload}`)
        : () => axiosMicro.get("/tour", { params: payload })
    );
    yield put(Actions.getAllTourSuccess(response.data));
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.getAllTourFailure(messages));
    }
  }
}

function* createTour({ payload }) {
  try {
    const response = yield call(() => axiosMicro.post("/tour", payload));
    if (response?.data?.status === "OK") {
      yield put(Actions.createTourSuccess(response.data));
    } else {
      const messages = response.data.messages;
      yield put(Actions.createTourFailure(messages));
    }
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.createTourFailure(messages));
    }
  }
}

function* updateTour({ payload }) {
  try {
    const response = yield call(() =>
      axiosMicro.put(`/tour/${payload.id}`, payload.body)
    );
    yield put(Actions.updateTourSuccess(response.data));
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.updateTourFailure(messages));
    }
  }
}

function* deleteTour({ payload }) {
  try {
    yield call(() => axiosMicro.delete(`/tour/${payload}`));
    yield put(Actions.deleteTourSuccess(payload));
  } catch (error) {
    if (error?.response?.data) {
      const messages = error.response.data;
      yield put(Actions.deleteTourFailure(messages));
    }
  }
}

// eslint-disable-next-line func-names
export default function* () {
  yield takeLatest(Actions.getAllTourRequest, getAllTours);
  yield takeLatest(Actions.createTourRequest, createTour);
  yield takeLatest(Actions.updateTourRequest, updateTour);
  yield takeLatest(Actions.deleteTourRequest, deleteTour);
}
