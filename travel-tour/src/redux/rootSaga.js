import { all } from 'redux-saga/effects';
import auth from './auth/saga';
import user from './user/saga';
import product from './product/saga';
import order from './order/saga';

export default function* rootSaga() {
  yield all([auth(), user(), product(), order()]);
}