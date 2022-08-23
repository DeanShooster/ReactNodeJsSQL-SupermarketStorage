import { Component } from 'react';
import {Link} from 'react-router-dom';

import './product-list.scss';
import {FcManager} from 'react-icons/fc';

import AdminContext from '../../context/AdminContext';

import Product from './product/Product';
import SearchProduct from './search-product/SearchProduct';
import SortProduct from './sort-product/SortProduct';
import Loader from '../loader/Loader';
import { GetProductList, IsAdminLogged } from '../../api/AdminAPIRequests';

class ProductList extends Component{
    static contextType = AdminContext;

    constructor(props){
        super(props);
        this.state = {
            products: null,
            showProducts: true
        };
    }

    showProductsHandler(){ this.setState( {showProducts: !(this.state.showProducts)} ); }

    async componentDidMount(){ 
        if( !this.context.name || !this.context.token ){
            const result = await IsAdminLogged( {token: sessionStorage.getItem('token') } );
            if( !(result.name) ) document.getElementById('navigateToLogin').click();
            this.context.LogIn( result.name , sessionStorage.getItem('token') );
        }
        setTimeout( async() => { 
            const result = await GetProductList( this.context.token );
            this.setState( {products: result});
        }, 1500);
    }

    async onSearchProductHandler(productName){
        if(productName.length === 0) { this.setState( { products: await GetProductList( this.context.token ) } ); return;}
        const filteredArray = [];
        for(let i = 0; i < this.state.products.length; i++){
            if( this.state.products[i].Name.toLocaleLowerCase().startsWith(productName.toLocaleLowerCase()) )
                filteredArray.push(this.state.products[i]);
        }
        this.setState( {products: filteredArray } ); this.setState( {showProducts: true} );
    }

    onSortProductListHandler(sortByMethod){
        const currentArr = [...this.state.products ];
        let sortedArr;
        switch(sortByMethod){
            case 'Name': sortedArr = currentArr.sort( (a,b)=> a.Name.toLocaleLowerCase() > b.Name.toLocaleLowerCase() ? 1 : -1 );  break;
            case 'Price': sortedArr = currentArr.sort( (a,b)=> a.Price - b.Price ); break;
            case 'Stock': sortedArr = currentArr.sort( (a,b)=> a.Stock - b.Stock ); break;
            case 'Popularity': sortedArr = currentArr.sort( (a,b)=> a.Popularity - b.Popularity ); break;
            default: return; 
        }
        this.setState( {products: sortedArr } ); this.setState( {showProducts: true} );
    }

    render(){
        return (
        <div className='product-list-container'>
            <Link to='/' id='navigateToLogin'></Link>
            <div className='manager-profile'>Manager {this.context.name} <FcManager className='manager-icon'/></div>
            <button onClick={ ()=>this.showProductsHandler() }> {this.state.showProducts ? 'Hide' : 'Show'} Products </button>
            <SearchProduct onSearchProductHandler={this.onSearchProductHandler.bind(this)}/>
            <SortProduct onSortProductListHandler={this.onSortProductListHandler.bind(this)}/>
            { this.state.showProducts && <ul>
                <li className='titles'>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Stock</div>
                    <div>Popularity</div>
                </li>
                { this.state.products ? 
                    this.state.products?.map((product,index) => ( <Product key={index} product={product} />)) 
                    : <Loader /> }
            </ul> }
        </div>
        )
    }
}

export default ProductList;
