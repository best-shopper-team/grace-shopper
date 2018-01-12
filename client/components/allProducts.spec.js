import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AllProducts } from './allProducts.js'

const adapter = new Adapter()
enzyme.configure({adapter})


describe('AllProducts', () => {
  let wrapper

  const products = [
    {
      id: 1,
      photoUrl: 'www.google.com',
      title: 'best product',
      categories: [{name: 'festive'}],
      isAvailable: true
    },
    {
      id: 2,
      photoUrl: 'www.google.com',
      title: 'second best product',
      categories: [{name: 'festive'}],
      isAvailable: true
    },
    {
      id: 3,
      photoUrl: 'www.google.com',
      title: 'third best product',
      categories: [{name: 'festive'}],
      isAvailable: true
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<AllProducts categories={[{name: ''}]} allProducts={products} loadProducts={() => {}} match={{params: {categories: ''}}} loadCategories={() => {}} />)
  })

  it('renders all of the products', () => {
    expect(wrapper.find('.product')).to.have.length(products.length);
  })

  it(`renders all of the product's images`, () => {
    expect(wrapper.find('.product-image')).to.have.length(products.length);
  })

})
