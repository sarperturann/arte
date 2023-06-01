const temp = "https://eway-server.vercel.app/api/";
const gcloud = "https://arte-386819.uc.r.appspot.com";

// auth routes
export const login = temp + 'users/login';
export const signup = temp + 'users/signup';
export const getuser = temp + 'users/getuser';
export const updateuser = temp + 'users/updateuser/'; // user id required

export const getMyUser = gcloud + 'user/get/'; // user id required
export const createMyUserCart = gcloud % 'carts/create';
export const getMyCart = gcloud % 'carts/'; //cart idididi
// Search route
export const searchKeyword = temp + 'search/byuser/'; // keyword in param required

// Contact us route
export const contactUs = temp + 'contact/sendmessage';

// blog routes
export const addblog = temp + 'blogs/addblog';
export const getallblogs = temp + 'blogs/getallblogs';
export const getblogbyid = temp + 'blogs/getblogbyid';
export const updateblog = temp + 'blogs/updateblog/'; // blog id required
export const deleteblog = temp + 'blogs/deleteblog/'; // blog id required

// product routes
export const addproduct = temp + 'products/addblog';
export const getallproducts = temp + 'products/getallproducts';
export const getallartworks = gcloud + '/api/v1/artwork/get_all';
export const getAllArtworkImages = gcloud + "/api/v1/images/get_all";
export const getCartbyIdBiz = gcloud + "/api/v1/carts/";
export const getArtworkByIdBiz = gcloud + "/api/v1/artwork/get/"
export const updateproduct = temp + 'products/updateproduct/'; // product id required
export const deleteproduct = temp + 'products/deleteproduct/'; // product id required

// cart routes
export const addcart = temp + 'carts/createcartproduct';
export const updatecart = temp + 'carts/updatecartproduct/'; // user id required
export const getcartbyid = temp + 'carts/getcartproduct/'; // user id required
export const removeProduct = temp + 'carts/deleteproduct/'; // user id and product id required :uid/:productId

// order routes
export const placeorder = temp + 'userorder/placeorder'; // authentication required
export const getorders = temp + 'userorder/getorders/'; // user id required in params + authentication required
export const cancelorder = temp + 'userorder/cancelorder/'; // order id required in params + authentication required

export const getallordersBiz = gcloud + '/api/v1/order/get_all';