import { combineReducers } from "redux";
import {
    userLoginReducer,
    userSignupReducer,
} from './userReducers'
import {
    getSearchResult,
    sendMessageResult
} from './utilsReducers'
import { getallBlogsReducer } from './blogReducers'
import { getallProductsReducer } from './ProductReducers'
import { getallOrdersReducer } from './orderReducers'
import { getArtworkImagesReducer } from './artworkImageReducers'
import {getArtworkReducer} from './artworkReducers'
import { cartReducer } from './cartReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    getallBlogs: getallBlogsReducer,
    getallProducts: getallProductsReducer,
    cart: cartReducer,
    searchKeyword: getSearchResult,
    sendMessage: sendMessageResult,
    userOrders: getallOrdersReducer,
    getArtworkImages: getArtworkImagesReducer,
    getArtwork: getArtworkReducer
});

export default rootReducer;