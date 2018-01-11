import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { WriteReview } from './writeReview.js'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('WriteReview', () => {
  let writeReview

  beforeEach(() => {
    const product = {
      title: "title"
    }
    const getProduct = () => console.log('i ran!')
    writeReview = shallow(<WriteReview product={product} getProduct={getProduct} />)
  })

  it('renders a div with the number 5', () => {
    expect(writeReview.find('h3')).to.have.length(1);
  })

  it('renders forrm component', () => {
    expect(writeReview.find('form')).to.have.length(1);
  })
})
