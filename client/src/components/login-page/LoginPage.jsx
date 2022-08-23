import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './login-page.scss';

import AdminContext from '../../context/AdminContext';
import { AdminLogin, IsAdminLogged } from '../../api/AdminAPIRequests';

class LoginPage extends Component {
    static contextType = AdminContext;
    
    constructor(props){
        super(props);
        this.state = {
            ID: null,
            password: null,
            errorMsg: null
        }
    }

    async onLoginSubmitHandler(event){
        event.preventDefault();
        if( this.state.ID && this.state.password ){
            const credentials = { adminID: event.target[0].value, password: event.target[1].value };
            const result = await AdminLogin(credentials);
            if( result.error ){ this.setState( { errorMsg: result.error } ); return; }
            sessionStorage.setItem('token',result.token);
            const { LogIn } = this.context;
            LogIn(result.name,result.token);
            sessionStorage.setItem('token',result.token);
            event.target.reset();
            document.getElementById('navigateToStorage').click();
        } else this.setState( { errorMsg: 'Missing Credentials' } );
    }

    onIDBlurHandler(event){
        if( event.target.value.length > 2 ) this.setState( {ID: true} );
        else this.setState( {ID: false} );
    }

    onIDChangeHandler(event){
        if( this.state.ID === null ) return;
        if( event.target.value.length > 2 ) this.setState( {ID: true} );
        else this.setState( {ID: false} );
    }

    onPasswordBlurHandler(event){
        if( event.target.value.length > 4 ) this.setState( {password: true} );
        else this.setState( {password: false} );
    }

    onPasswordChangeHandler(event){
        if( this.state.password === null ) return;
        if( event.target.value.length > 4 ) this.setState( {password: true} );
        else this.setState( {password: false} );
    }

    async componentDidMount(){
        if( sessionStorage.getItem('token') ){
            const result = await IsAdminLogged( { token: sessionStorage.getItem('token')});
            if( result.name ) { 
                this.context.LogIn( result.name ); 
                document.getElementById('navigateToStorage').click();
                return; 
            }
            sessionStorage.clear();
        }
    }

    render() {
        const AdminIDClass = this.state.ID ? '' : (this.state.ID===null ? null : 'error');
        const passwordClass = this.state.password ? '' : (this.state.password===null ? null : 'error');
        return (
            <div className='login-container'>
                <h1>Administration Login</h1>
                <form onSubmit={ (event)=> this.onLoginSubmitHandler(event)}>
                    <div>
                        <label>Admin ID</label>
                        <input autoComplete='username' onBlur={(event)=> this.onIDBlurHandler(event)} 
                            onChange={(event)=> this.onIDChangeHandler(event) } className={AdminIDClass} />
                    </div>
                    {AdminIDClass==='error' && <p>ID too short</p>}
                    <div>
                        <label>Password</label>
                        <input type='password' autoComplete='current-password' 
                            onBlur={(event)=> this.onPasswordBlurHandler(event)}
                            onChange={(event)=> this.onPasswordChangeHandler(event) } className={passwordClass} />
                    </div>
                    {passwordClass==='error' && <p>Password too short</p>}
                    <button>Login</button>
                    { this.state.errorMsg && <p>{this.state.errorMsg}</p> }
                </form>
                <Link to='/storage' id='navigateToStorage'></Link>
            </div>
        );
    }
}

export default LoginPage;