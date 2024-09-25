import { createAction } from "redux-actions";

export const getAllTourRequest = createAction("GET_ALL_TOUR_REQUEST");
export const getAllTourSuccess = createAction("GET_ALL_TOUR_SUCCESS");
export const getAllTourFailure = createAction("GET_ALL_TOUR_FAILURE");

export const getDetailTourRequest = createAction("GET_DETAIL_TOUR_REQUEST");
export const getDetailTourSuccess = createAction("GET_DETAIL_TOUR_SUCCESS");
export const getDetailTourFailure = createAction("GET_DETAIL_TOUR_FAILURE");

export const createTourRequest = createAction("CREATE_TOUR_REQUEST");
export const createTourSuccess = createAction("CREATE_TOUR_SUCCESS");
export const createTourFailure = createAction("CREATE_TOUR_FAILURE");
export const resetCreateTour = createAction("RESET_CREATE_TOUR");

export const updateTourRequest = createAction("UPDATE_TOUR_REQUEST");
export const updateTourSuccess = createAction("UPDATE_TOUR_SUCCESS");
export const updateTourFailure = createAction("UPDATE_TOUR_FAILURE");
export const resetUpdateTour = createAction("RESET_UPDATE_TOUR");

export const deleteTourRequest = createAction("DELETE_TOUR_REQUEST");
export const deleteTourSuccess = createAction("DELETE_TOUR_SUCCESS");
export const deleteTourFailure = createAction("DELETE_TOUR_FAILURE");
export const resetDeleteTour = createAction("RESET_DELETE_TOUR");

export const resetTourState = createAction("RESET_TOUR_STATE");
