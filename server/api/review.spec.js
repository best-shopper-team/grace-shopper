/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const User = db.model('user')
const Product = db.model('product')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const newUser = {
      name: 'Bob Smith',
      password: '123',
      email: 'bob@gmail.com',
    }

    const newProduct = {
      title: 'Pretty Socks',
      description: 'these are pretty socks',
      price: 500,
      quantity: 20,
      isAvailable: true
    }

    const newReview = {
      content: 'I loved this product',
      rating: '4',
      userId: 1,
      productId: 1
    }

    beforeEach(() => {
      let createDummy = Promise.all([
        User.create(newUser),
        Product.create(newProduct),
        Review.create(newReview)
      ])
      return createDummy
    })

    describe('GET /api/reviews', () => {
      // REVIEW: multiple tests with single assertions
      it('the response body is an array',
        return request(app)
          .get('/api/reviews')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
          })
      it('the content is ....', () => {
        return request(app)
          .get('/api/reviews')
          .expect(200)
          .then(res => {
            expect(res[0].content).to.equal('Whatever the body is')
          })
      })
    })
  }) // end describe('/api/reviews')
}) // end describe('Review routes')
