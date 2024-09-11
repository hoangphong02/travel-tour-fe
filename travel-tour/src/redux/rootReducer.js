import { combineReducers } from "redux";
import auth from "./auth/reducer";
import user from "./user/reducer";
import product from "./product/reducer";
import order from "./order/reducer";
import food from "./food/reducer";

const rootReducer = combineReducers({
  auth,
  user,
  product,
  order,
  food,
});

export default rootReducer;
