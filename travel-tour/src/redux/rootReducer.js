import { combineReducers } from "redux";
import auth from "./auth/reducer";
import user from "./user/reducer";
import product from "./product/reducer";
import order from "./order/reducer";
import food from "./food/reducer";
import categoryBlog from "./categoryBlog/reducer";
import categoryTour from "./categoryTour/reducer";
import blog from "./blog/reducer";

const rootReducer = combineReducers({
  auth,
  user,
  product,
  order,
  food,
  categoryBlog,
  categoryTour,
  blog,
});

export default rootReducer;
