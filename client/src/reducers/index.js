import { combineReducers } from "redux";
import { getallProductsReducer } from './ProductReducers'

const rootReducer = combineReducers({
    getallProducts: getallProductsReducer,
});

export default rootReducer;