import { Component } from 'react';

import './product.scss';
import {AiTwotoneStar} from 'react-icons/ai';

class Product extends Component{
  render() {
    const stars = [];
    for(let i = 0; i < this.props.product.Popularity; i++)
      stars.push( <AiTwotoneStar key={'star'+i} className='star'/>);
    
    return (
      <li className='product'>
        <div>{this.props.product.Name}</div>
        <div>{this.props.product.Price}</div>
        <div>{this.props.product.Stock}</div>
        <div>{stars}</div>
      </li>
    );
  }
}

export default Product;
