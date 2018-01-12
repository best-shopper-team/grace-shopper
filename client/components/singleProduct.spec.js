import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import  { SingleProduct } from './SingleProduct.js'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let SingleProductWrapper;
  let mockProduct;
  let mockRatingArr;
  let mockUser;

  beforeEach(() => {
    mockProduct = {
      id: 1,
      title: 'Super Kool Socks',
      description: 'Checkout the newest socks in our store!!! They are amazing and you will be too when you wear these super kool socks!!!',
      price: 400,
      quantity: 20,
      isAvailable: true,
      photoUrl: 'https://cdn.shopify.com/s/files/1/2607/2780/products/socks-template.jpg?v=1512403868',
      createdAt: '2018-01-09T21:52:42.818Z',
      updatedAt: '2018-01-09T21:52:42.818Z'
  }
  mockRatingArr = [{
    id: 1,
    content: 'I loved these socks they rock my socks',
    rating: '5',
    createdAt: '2018-01-09T21:52:42.929Z',
    updatedAt: '2018-01-09T21:52:42.929Z',
    userId: 1,
    productId: 1
}]

mockUser = {
  id: 1,
  name: 'Cody McDonald',
  isAdmin: true,
  isActive: true,
  email: 'cody@email.com'
}
  SingleProductWrapper = shallow(<SingleProduct product={mockProduct} ratingArray={mockRatingArr} user={mockUser} getProduct={() => {}} getReviews={() => {}} />)
  })

  it(`renders the product's title`, () => {
    expect(SingleProductWrapper.text()).to.contain(mockProduct.title);
  })

  it.only(`renders the correct price`, () => {
    expect(SingleProductWrapper.text()).to.contain('$' + mockProduct.price/100);
  })
  it.only(`renders the product's image`, () => {
    expect(SingleProductWrapper.find('#single-product-page-image')).to.have.length(1);
  })
  it.only(`renders an edit button if the user is an admin`, () => {
    expect(SingleProductWrapper.find('button')).have.length(1);
    SingleProductWrapper.setProps({user: {
      id: 1,
      name: 'Cody McDonald',
      isAdmin: false,
      isActive: true,
      email: 'cody@email.com'
    }})
    expect(SingleProductWrapper.find('button')).have.length(0);
  })

})
