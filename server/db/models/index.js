const User = require('./user')
const Address = require('./address')
const Order = require('./order')
const OrderItem = require('./orderItem')
const Category = require('./category')
const Review = require('./review')
const Product = require('./product')
const Session = require('./session')

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

OrderItem.belongsTo(Product)
Product.hasMany(OrderItem)

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsTo(Address)
Address.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Product.belongsToMany(Category, {through: 'prod_cat'})
Category.belongsToMany(Product, {through: 'prod_cat'})

module.exports = {
  Session,
  User,
  Address,
  Order,
  OrderItem,
  Category,
  Review,
  Product
}
