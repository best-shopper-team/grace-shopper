/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {default as AllProducts} from './allProducts'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as SingleProduct} from './singleProduct'
export {default as Checkout} from './checkout'
export {default as AddProduct} from './addProduct'
export {default as EditProduct} from './editProduct'
export {default as WriteReview} from './writeReview'
export {default as AllUsers} from './allUsers'
export {default as OrderHistory} from './orderHistory'
export {default as UserOrderHistory} from './userOrderHistory'
export {default as SingleProductReviews} from './singleProductReviews'
