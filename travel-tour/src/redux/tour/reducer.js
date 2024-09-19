import { handleActions } from "redux-actions";

import * as Actions from "./actions";

const initialState = {
  // Get All Food
  isGetAllTourRequest: false,
  isGetAllTourSuccess: false,
  isGetAllTourFailure: false,
  getAllTourState: {},
  // Create Food
  isCreateTourRequest: false,
  isCreateTourSuccess: false,
  isCreateFoodFailure: false,
  // Update Food
  isUpdateTourRequest: false,
  isUpdateTourSuccess: false,
  isUpdateTourFailure: false,
  // Delete Food
  isDeleteTourRequest: false,
  isDeleteTourSuccess: false,
  isDeleteTourFailure: false,

  // Local
  errorMessages: [],
};

const reducer = handleActions(
  {
    // #region : Get All Food
    [Actions.getAllTourRequest]: (state) => ({
      ...state,
      isGetAllTourRequest: true,
      isGetAllTourSuccess: false,
      isGetAllTourFailure: false,
    }),
    [Actions.getAllTourSuccess]: (state, { payload }) => ({
      ...state,
      isGetAllTourRequest: false,
      isGetAllTourSuccess: true,
      isGetAllTourFailure: false,
      getAllTourState: payload,
    }),
    [Actions.getAllTourFailure]: (state, { payload }) => ({
      ...state,
      isGetAllTourRequest: false,
      isGetAllTourSuccess: false,
      isGetAllTourFailure: true,
      errorMessages: payload,
    }),
    // #endregion
    // #region : Create Food
    [Actions.createTourRequest]: (state) => ({
      ...state,
      isCreateTourRequest: true,
      isCreateTourSuccess: false,
      isCreateTourFailure: false,
    }),
    [Actions.createTourSuccess]: (state) => ({
      ...state,
      isCreateTourRequest: false,
      isCreateTourSuccess: true,
      isCreateTourFailure: false,
    }),
    [Actions.createTourFailure]: (state, { payload }) => ({
      ...state,
      isCreateTourRequest: false,
      isCreateTourSuccess: false,
      isCreateTourFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetCreateTour]: (state) => ({
      ...state,
      isCreateTourRequest: false,
      isCreateTourSuccess: false,
      isCreateTourFailure: false,
      errorMessages: [],
    }),
    // #endregion
    // #region : Update Food
    [Actions.updateTourRequest]: (state) => ({
      ...state,
      isUpdateTourRequest: true,
      isUpdateTourSuccess: false,
      isUpdateTourFailure: false,
    }),
    [Actions.updateTourSuccess]: (state) => ({
      ...state,
      isUpdateTourRequest: false,
      isUpdateTourSuccess: true,
      isUpdateTourFailure: false,
    }),
    [Actions.updateTourFailure]: (state, { payload }) => ({
      ...state,
      isUpdateTourRequest: false,
      isUpdateTourSuccess: false,
      isUpdateTourFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetUpdateTour]: (state) => ({
      ...state,
      isUpdateTourRequest: false,
      isUpdateTourSuccess: false,
      isUpdateTourFailure: false,
      errorMessages: [],
    }),
    // #endregion
    // #region : Delete Food
    [Actions.deleteTourRequest]: (state) => ({
      ...state,
      isDeleteTourRequest: true,
      isDeleteTourSuccess: false,
      isDeleteTourFailure: false,
    }),
    [Actions.deleteTourSuccess]: (state) => ({
      ...state,
      isDeleteTourRequest: false,
      isDeleteTourSuccess: true,
      isDeleteTourFailure: false,
    }),
    [Actions.deleteTourFailure]: (state, { payload }) => ({
      ...state,
      isDeleteTourRequest: false,
      isDeleteTourSuccess: false,
      isDeleteTourFailure: true,
      errorMessages: payload,
    }),
    [Actions.resetDeleteTour]: (state) => ({
      ...state,
      isDeleteTourRequest: false,
      isDeleteTourSuccess: false,
      isDeleteTourFailure: false,
      errorMessages: [],
    }),

    // #region : Local
    [Actions.resetTourState]: () => initialState,
    // #endregion
  },
  initialState
);

export default reducer;
