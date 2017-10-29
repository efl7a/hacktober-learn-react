import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './LoginForm.css';

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            isError: false,
            errorsList: [],
            loginDetails: {
                username: '',
                password: ''
            }
        };

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    render() {
        return(<div className='login-form'>
                <h2>Login</h2>

                {this.state.errorsList.map((error, index) => {
                    return <span key={index} className="error">{error}</span>
                })}

                <form onSubmit={this._handleSubmit}>
                    <TextField name="username" floatingLabelText="Username" onChange={this._updateState.bind(this)} />
                    <TextField name="password" floatingLabelText="Password" type="password" defaultValue="" onChange={this._updateState.bind(this)} />
                    <br />
                    <RaisedButton label="Login" onClick={this._handleSubmit} />
                </form>
            </div>);
    }

    _updateState(e) {
        let newLoginDetails = Object.assign({}, this.state.loginDetails);
        newLoginDetails[e.target.name] = e.target.value;
        this.setState(Object.assign({}, this.state, { loginDetails : newLoginDetails }));
    }

    _validateCredentials() {
        let loginDetails = this.state.loginDetails;
        let errors = [];

        this.setState(Object.assign({}, this.state, { errorsList : [] }));

        if ( ! loginDetails.username ) {
            errors.push('Please provide a username!');
        }

        if ( ! loginDetails.password ) {
            errors.push('Please provide a password!');
        }

        if ( errors.length ) {
            this.setState(Object.assign({}, this.state, { errorsList : errors }));
            return false;
        }

        return true;
    }

    _handleSubmit(e) {
        e.preventDefault();

        if ( ! this._validateCredentials() ) {
            return;
        }
    }
}

export default LoginForm;
