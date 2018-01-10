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

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].content).to.be.equal('I loved this product')
          expect(res.body[0].rating).to.be.equal('4')
          expect(res.body[0].userId).to.be.equal(1)
          expect(res.body[0].productId).to.be.equal(1)
        })
    })
  }) // end describe('/api/reviews')
}) // end describe('Review routes')
