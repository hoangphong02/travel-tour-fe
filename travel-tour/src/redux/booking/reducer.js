import { handleActions } from "redux-actions";

import * as Actions from "./actions";

const initialState = {
  // Get All Food
  isGetAllBookingRequest: false,
  isGetAllBookingSuccess: false,
  isGetAllBookingFailure: false,
  getAllBookingState: {},
  // Get All Food
  isGetDetailBookingRequest: false,
  isGetDetailBookingSuccess: false,
  isGetDetailBookingFailure: false,
  getDetailBookingState: {},
  // Create Food
  isCreateBookingRequest: false,
  isCreateBookingSuccess: false,
  isCreateBookingFailure: false,
  // Update Food
  isUpdateBookingRequest: false,
  isUpdateBookingSuccess: false,
  isUpdateBookingFailure: false,
  // Delete Food
  isDeleteBookingRequest: false,
  isDeleteBookingSuccess: false,
  isDeleteBookingFailure: false,

  // Local
  errorMessages: [],
};

const reducer = handleActions(
  {
    // #region : Get All Food
    [Actions.getAllBookingRequest]: (state) => ({
      ...state,
      isGetAllBookingRequest: true,
      isGetAllBookingSuccess: false,
      isGetAllBookingFailure: false,
    }),
    [Actions.getAllBookingSuccess]: (state, { payload }) => ({
      ...state,
      isGetAllBookingRequest: false,
      isGetAllBookingSuccess: true,
      isGetAllBookingFailure: false,
      getAllBookingState: payload,
    }),
    [Actions.getAllBookingFailure]: (state, { payload }) => ({
      ...state,
      isGetAllBookingRequest: false,
      isGetAllBookingSuccess: false,
      isGetAllBookingFailure: true,
      errorMessages: payload,
    }),
    // #region : Get detail tour
    [Actions.getDetailBookingRequest]: (state) => ({
      ...state,
      isGetDetailBookingRequest: true,
      isGetDetailBookingSuccess: false,
      isGetDetailBookingFailure: false,
    }),
    [Actions.getDetailBookingSuccess]: (state, { payload }) => ({
      ...state,
      isGetDetailBookingRequest: false,
      isGetDetailBookingSuccess: true,
      isGetDetailBookingFailure: false,
      getDetailBookingState: payload,
    }),
    [Actions.getDetailBookingFailure]: (state, { payload }) => ({
      ...state,
      isGetDetailBookingRequest: false,
      isGetDetailBookingSuccess: false,
      isGetDetailBookingFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Create Food
    [Actions.createBookingRequest]: (state) => ({
      ...state,
      isCreateBookingRequest: true,
      isCreateBookingSuccess: false,
      isCreateBookingFailure: false,
    }),
    [Actions.createBookingSuccess]: (state) => ({
      ...state,
      isCreateBookingRequest: false,
      isCreateBookingSuccess: true,
      isCreateBookingFailure: false,
    }),
    [Actions.createBookingFailure]: (state, { payload }) => ({
      ...state,
      isCreateBookingRequest: false,
      isCreateBookingSuccess: false,
      isCreateBookingFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetCreateBooking]: (state) => ({
      ...state,
      isCreateBookingRequest: false,
      isCreateBookingSuccess: false,
      isCreateBookingFailure: false,
      errorMessages: [],
    }),
    // #endregion
    // #region : Update Food
    [Actions.updateBookingRequest]: (state) => ({
      ...state,
      isUpdateBookingRequest: true,
      isUpdateBookingSuccess: false,
      isUpdateBookingFailure: false,
    }),
    [Actions.updateBookingSuccess]: (state) => ({
      ...state,
      isUpdateBookingRequest: false,
      isUpdateBookingSuccess: true,
      isUpdateBookingFailure: false,
    }),
    [Actions.updateBookingFailure]: (state, { payload }) => ({
      ...state,
      isUpdateBookingRequest: false,
      isUpdateBookingSuccess: false,
      isUpdateBookingFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetUpdateBooking]: (state) => ({
      ...state,
      isUpdateBookingRequest: false,
      isUpdateBookingSuccess: false,
      isUpdateBookingFailure: false,
      errorMessages: [],
    }),
    // #endregion
    // #region : Delete Food
    [Actions.deleteBookingRequest]: (state) => ({
      ...state,
      isDeleteBookingRequest: true,
      isDeleteBookingSuccess: false,
      isDeleteBookingFailure: false,
    }),
    [Actions.deleteBookingSuccess]: (state) => ({
      ...state,
      isDeleteBookingRequest: false,
      isDeleteBookingSuccess: true,
      isDeleteBookingFailure: false,
    }),
    [Actions.deleteBookingFailure]: (state, { payload }) => ({
      ...state,
      isDeleteBookingRequest: false,
      isDeleteBookingSuccess: false,
      isDeleteBookingFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetDeleteBooking]: (state) => ({
      ...state,
      isDeleteBookingRequest: false,
      isDeleteBookingSuccess: false,
      isDeleteBookingFailure: false,
      errorMessages: [],
    }),

    // #region : Local
    [Actions.resetBookingState]: () => initialState,
    // #endregion
  },
  initialState
);

export default reducer;
