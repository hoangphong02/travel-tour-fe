import { createAction } from "redux-actions";

export const getAllBookingRequest = createAction("GET_ALL_BOOKING_REQUEST");
export const getAllBookingSuccess = createAction("GET_ALL_BOOKING_SUCCESS");
export const getAllBookingFailure = createAction("GET_ALL_BOOKING_FAILURE");

export const getDetailBookingRequest = createAction(
  "GET_DETAIL_BOOKING_REQUEST"
);
export const getDetailBookingSuccess = createAction(
  "GET_DETAIL_BOOKING_SUCCESS"
);
export const getDetailBookingFailure = createAction(
  "GET_DETAIL_BOOKING_FAILURE"
);

export const createBookingRequest = createAction("CREATE_BOOKING_REQUEST");
export const createBookingSuccess = createAction("CREATE_BOOKING_SUCCESS");
export const createBookingFailure = createAction("CREATE_BOOKING_FAILURE");
export const resetCreateBooking = createAction("RESET_CREATE_BOOKING");

export const updateBookingRequest = createAction("UPDATE_BOOKING_REQUEST");
export const updateBookingSuccess = createAction("UPDATE_BOOKING_SUCCESS");
export const updateBookingFailure = createAction("UPDATE_BOOKING_FAILURE");
export const resetUpdateBooking = createAction("RESET_UPDATE_BOOKING");

export const deleteBookingRequest = createAction("DELETE_BOOKING_REQUEST");
export const deleteBookingSuccess = createAction("DELETE_BOOKING_SUCCESS");
export const deleteBookingFailure = createAction("DELETE_BOOKING_FAILURE");
export const resetDeleteBooking = createAction("RESET_DELETE_BOOKING");

export const resetBookingState = createAction("RESET_Booking_STATE");
