import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uriPrefix from './uriPrefix';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Log in</h1>
        <div>
          <form className="login__form" onSubmit={this.submit} autoComplete="off">
            <div className="login__block"> Username:
              <input
                className="login__input"
                type="text"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })} />
            </div>
            <div className="login__block"> Password:
              <input
                className="login__input"
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })} />
            </div>
            <button
              type="submit"
              className="login__button login__button-submit"> Log in </button>
          </form>
          <Link to="/register" className="login__link">
            Not yet registered? Register for free! </Link>
        </div>
      </div>
    );
  }

  submit(e) {   // eslint-disable-line
    console.log('submitting');   // eslint-disable-line
    e.preventDefault();

    axios.post(`${uriPrefix}/api/user/login`, {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      sessionStorage.setItem('token', res.data.token);  // eslint-disable-line
      sessionStorage.setItem('username', this.state.username);  // eslint-disable-line
      this.props.history.push('/');
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });
  }
}

Login.propTypes = {
  input: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default Login;