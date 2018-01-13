/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User,
  Address,
  Order,
  OrderItem,
  Category,
  Product,
  Review} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({name: 'Cody McDonald', email: 'cody@email.com', password: '123', passwordReset: true}),
    User.create({name: 'Murphy Edward', email: 'murphy@email.com', password: '123'}),
    User.create({name: 'Soxxx McGee', isAdmin: true, email: 'soxxx@email.com', password: '123'}),
    User.create({name: 'Martina McBobaFett', isActive: false, email: 'martina@email.com', password: '123'}),
    User.create({name: 'Antonio Leocakkas', passwordReset: true, email: 'antonio@email.com', password: '123'}),
  ])

  const addresses = await Promise.all([
    Address.create({street: '123 Cactus Drive', city: 'Phoenix', state: 'AZ', zip: '12322', email: 'mrcactus@gmail.com'}),
    Address.create({street: '456 Pine Grove', city: 'Boston', state: 'MA', zip: '33828', email: 'mrboston@gmail.com'}),
    Address.create({street: '483 Elizabeth Drive', city: 'Wood Dale', state: 'IL', zip: '60191', email: 'socksmcgee@gmail.com'}),
  ])

  const products = await Promise.all([
    Product.create({title: 'Super Stitched Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super kool socks!!!', price: 400, quantity: 20, photoUrl: 'http://localhost:8080/images/bait.jpg'}),
    Product.create({title: 'Super Rad Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super rad socks!!!', price: 1000, quantity: 10, isAvailable: false, photoUrl: 'http://localhost:8080/images/blueTyeDye.jpg'}),
    Product.create({title: 'Super Blue Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super blue socks!!!', price: 540, quantity: 18, isAvailable: false, photoUrl: 'http://localhost:8080/images/darkBlooms.jpg'}),
    Product.create({title: 'Super Rare Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super rare socks!!!', price: 2300, quantity: 2, photoUrl: 'http://localhost:8080/images/easyDoesItGirls.jpg'}),
    Product.create({title: 'Super Giant Bear Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super giant bear socks!!!', price: 460, quantity: 11, photoUrl: 'http://localhost:8080/images/fence.jpg'}),
    Product.create({title: 'Super Festive Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super festive socks!!!', price: 1200, quantity: 8, photoUrl: 'http://localhost:8080/images/holidaySock1.jpg'}),
    Product.create({title: 'Super Planty Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super planty socks!!!', price: 1200, quantity: 40, photoUrl: 'http://localhost:8080/images/houseplantBoys.jpg'}),
    Product.create({title: 'Super Soft Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super soft socks!!!', price: 1500, quantity: 30, photoUrl: 'http://localhost:8080/images/jasmine.jpg'}),
    Product.create({title: 'Super Secret Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super secret socks!!!', price: 1200, quantity: 8, photoUrl: 'http://localhost:8080/images/noShowRed.jpg'}),
    Product.create({title: 'Super Kool Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super kool socks!!!', price: 1100, quantity: 60, photoUrl: 'http://localhost:8080/images/oldMan.jpg'}),
    Product.create({title: 'Super Sunny Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super sunny socks!!!', price: 1200, quantity: 8, photoUrl: 'http://localhost:8080/images/shortYellow.jpg'}),
    Product.create({title: 'Super Flowery Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super flowery socks!!!', price: 1500, quantity: 80, photoUrl: 'http://localhost:8080/images/smallRose.jpg'}),
    Product.create({title: 'Super Pink Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super pink socks!!!', price: 1250, quantity: 50, photoUrl: 'http://localhost:8080/images/staySick.jpg'}),
    Product.create({title: 'Super Ski Lodge Socks', description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super ski lodge socks!!!', price: 1350, quantity: 80, photoUrl: 'http://localhost:8080/images/trees.jpg'})
  ])

  const categories = await Promise.all([
    Category.create({name: 'Festive'}),
    Category.create({name: 'Professional'}),
    Category.create({name: 'Crazy'}),
    Category.create({name: 'Normal'}),
    Category.create({name: 'Puppies'}),
    Category.create({name: 'Kitties'}),
  ])

  products.forEach((product, index) => {
    product.setCategories(categories[index % 6])
  })

  const orders = await Promise.all([
    Order.create({userId: 1, status: 'inProcess', addressId: 1}),
    Order.create({userId: 2, status: 'submitted', purchaseTime: '2018-01-09 05:30:00', addressId: 2}),
    Order.create({userId: 2, status: 'shipped', purchaseTime: '2018-01-01 08:21:04', addressId: 2}),
    Order.create({userId: 1, status: 'cancelled', purchaseTime: '2018-01-04 11:04:32', addressId: 1}),
    Order.create({sessionId: 1, status: 'inProcess', addressId: 3}),
    Order.create({sessionId: 2, status: 'inProcess', addressId: 3}),
    Order.create({sessionId: 1, userId: 3, status: 'inProcess', addressId: 3}),
  ])

  const orderitems = await Promise.all([
    OrderItem.create({quantity: 2, itemPrice: 400, productId: 1, orderId: 1}),
    OrderItem.create({quantity: 1, itemPrice: 400, productId: 1, orderId: 2}),
    OrderItem.create({quantity: 5, itemPrice: 460, productId: 5, orderId: 2}),
    OrderItem.create({quantity: 6, itemPrice: 400, productId: 1, orderId: 3}),
    OrderItem.create({quantity: 3, itemPrice: 400, productId: 1, orderId: 4}),
    OrderItem.create({quantity: 5, itemPrice: 1000, productId: 5, orderId: 4}),
    OrderItem.create({quantity: 1, itemPrice: 2300, productId: 4, orderId: 4}),
    OrderItem.create({quantity: 8, itemPrice: 400, productId: 1, orderId: 5}),
    OrderItem.create({quantity: 1, itemPrice: 400, productId: 1, orderId: 6}),
    OrderItem.create({quantity: 10, itemPrice: 540, productId: 4, orderId: 6}),
    OrderItem.create({quantity: 9, itemPrice: 400, productId: 1, orderId: 7}),

  ])

  const reviews = await Promise.all([
    Review.create({content: 'I loved these socks they rock my socks', rating: '5', productId: 4, userId: 1}),
    Review.create({content: 'i cannut believe i found dese rere socks', rating: '4', productId: 4, userId: 2}),
    Review.create({content: 'dese socks not bear like i wanted it to be baer', rating: '3', productId: 5, userId: 2}),
    Review.create({content: 'I am appropriately satisfied with my Super Kool Socks. I would shop here again. Excellent quality craftmanship.', rating: '4', productId: 1, userId: 1}),
  ])


  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
