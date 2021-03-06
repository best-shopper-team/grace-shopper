import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import singleProduct from './singleProduct'
import reviews from './reviews'
import allProducts from './allProducts'
import allUsers from './allUsers'
import orders from './orders'
import categories from './categories'
import searchBar from './searchBar'


const reducer = combineReducers({user, allProducts, singleProduct, reviews, cart, categories, orders, allUsers, searchBar})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './singleProduct'
export * from './reviews'
export * from './allProducts'
export * from './allUsers'
export * from './orders'
export * from './categories'
export * from './searchBar'
