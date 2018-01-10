import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class AllProducts extends Component {

  constructor () {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount () {
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => this.setState({ products }));
  }

  render () {

    const products = this.state.products;

    return (
      <div>
        <div className="product-group">
          {
            products.map(product => {
              return (
                <div className="product" key={product.id}>
                  <img className="product-image" src={product.photoUrl} />
                  <Link to={`/products/${product.id}`}>{ product.title }</Link>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
