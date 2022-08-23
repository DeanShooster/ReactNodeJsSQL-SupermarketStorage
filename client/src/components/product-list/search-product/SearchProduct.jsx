import React, { Component } from 'react';

import './search-product.scss';

class SearchProduct extends Component {

    onSearchHandler(event){ this.props.onSearchProductHandler(event.target.value); }

    render() {
        return (
            <div className='search-product-container'>
                <label>Search Product</label>
                <input onChange={ (event)=>{this.onSearchHandler(event)} } placeholder='Product Name'/>
            </div>
        );
    }
}

export default SearchProduct;