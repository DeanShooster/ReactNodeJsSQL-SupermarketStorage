import React, { Component } from 'react';

import './sort-product.scss';

class SortProduct extends Component {

    onSortHandler(event){ this.props.onSortProductListHandler(event.target.value); }

    render() {
        return (
            <div className='sort-product-container'>
                <label>Sort By</label>
                <select onChange={ (event)=> this.onSortHandler(event) }>
                    <option>Name</option>
                    <option>Price</option>
                    <option>Stock</option>
                    <option>Popularity</option>
                </select>
            </div>
        );
    }
}

export default SortProduct;