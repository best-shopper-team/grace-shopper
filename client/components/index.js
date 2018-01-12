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
export {default as SingleProduct} from './SingleProduct'
export {default as AddProduct} from './addProduct'
export {default as EditProduct} from './editProduct'
export {default as WriteReview} from './writeReview'
