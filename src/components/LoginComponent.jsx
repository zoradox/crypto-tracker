import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';

import './LoginComponent.css';

class LoginComponent extends React.Component {

  state = {
    username: '',
    password: '',
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLogin = () => {
    axios.post('/login', this.state)
      .then((user) =>{
        localStorage.setItem('token', user.token);
        this.props.history.push('/dashboard');
      });
  }

  render() {
    return (
      <div>
        <div className="login-page">
          <div className="form">
            <h2>Crypto Tracker</h2>
            <div className="login-form">
              <input type="text" placeholder="username" name="username" onChange={this.handleInputChange}/>
              <input type="password" placeholder="password" name="password" onChange={this.handleInputChange}/>
              <button onClick={this.handleLogin}>login</button>
              <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(LoginComponent);