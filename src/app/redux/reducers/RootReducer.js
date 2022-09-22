import { combineReducers } from "redux";

import ServiceReducer from "../reducers/service/index";


const RootReducer = combineReducers({
  service: ServiceReducer,

});

export default RootReducer;
