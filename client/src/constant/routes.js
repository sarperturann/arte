const eway = "https://eway-server.vercel.app/api/";
const gcloud = "https://arte-386819.uc.r.appspot.com";

// auth routes
export const login = eway + 'users/login';
export const signup = eway + 'users/signup';
export const getuser = eway + 'users/getuser';
export const updateuser = eway + 'users/updateuser/'; // user id required

export const getMyUser = gcloud + 'user/get/'; // user id required
export const createMyUserCart = gcloud % 'carts/create';
export const getMyCart = gcloud % 'carts/'; //cart idididi
// Search route
export const searchKeyword = eway + 'search/byuser/'; // keyword in param required

// Contact us route
export const contactUs = eway + 'contact/sendmessage';

// blog routes
export const addblog = eway + 'blogs/addblog';
export const getallblogs = eway + 'blogs/getallblogs';
export const getblogbyid = eway + 'blogs/getblogbyid';
export const updateblog = eway + 'blogs/updateblog/'; // blog id required
export const deleteblog = eway + 'blogs/deleteblog/'; // blog id required

// product routes
export const addproduct = eway + 'products/addblog';
export const getallproducts = eway + 'products/getallproducts';
export const getallartworks = gcloud + '/api/v1/artwork/get_all';
export const getAllArtworkImages = gcloud + "/api/v1/images/get_all";
export const getCartbyIdBiz = gcloud + "/api/v1/carts/";
export const getArtworkByIdBiz = gcloud + "/api/v1/artwork/get"
export const updateproduct = eway + 'products/updateproduct/'; // product id required
export const deleteproduct = eway + 'products/deleteproduct/'; // product id required

// cart routes
export const addcart = eway + 'carts/createcartproduct';
export const updatecart = eway + 'carts/updatecartproduct/'; // user id required
export const getcartbyid = eway + 'carts/getcartproduct/'; // user id required
export const removeProduct = eway + 'carts/deleteproduct/'; // user id and product id required :uid/:productId

// order routes
export const placeorder = eway + 'userorder/placeorder'; // authentication required
export const getorders = eway + 'userorder/getorders/'; // user id required in params + authentication required
export const cancelorder = eway + 'userorder/cancelorder/'; // order id required in params + authentication required