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
      title: 'best product'
    },
    {
      id: 2,
      photoUrl: 'www.google.com',
      title: 'second best product'
    },
    {
      id: 3,
      photoUrl: 'www.google.com',
      title: 'third best product'
    }
  ]

  const loadProducts = () => console.log('i ran so far away')

  beforeEach(() => {
    wrapper = shallow(<AllProducts allProducts={products} loadProducts={loadProducts}/>)
  })


  it('renders a div', () => {
    expect(wrapper.contains(<div></div>)).to.equal(true);
  })

  it.only('renders a Link for each product', () => {
    expect(wrapper.find('Link')).to.have.length(products.length);
  })

})
