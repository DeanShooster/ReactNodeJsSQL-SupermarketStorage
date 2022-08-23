import React, { Component } from 'react';

const AdminContext = React.createContext();

export class AdminContextProvider extends Component{
    state = {
        name: null,
        token: null
    }

    LogIn = (name,token) => { this.setState( {name,token}); }

    render(){
        const {name,token} = this.state;
        const {LogIn} = this;
        return (
            <AdminContext.Provider value={ {name,token,LogIn} }>
                {this.props.children}
            </AdminContext.Provider>
        )
    }
}

export default AdminContext;