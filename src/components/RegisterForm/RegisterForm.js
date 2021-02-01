import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              required
              onChange={this.handleInputChangeFor('firstName')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              required
              onChange={this.handleInputChangeFor('lastName')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleInputChangeFor('email')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
