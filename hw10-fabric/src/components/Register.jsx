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
      password2: '',
    };

    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
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
            <div className="login__block"> Confirm Password:
              <input
                className="login__input"
                type="password"
                value={this.state.password2}
                onChange={e => this.setState({ password2: e.target.value })} />
            </div>
            <button
              type="submit"
              id="equal"
              className="login__button login__button-submit"> Register </button>
          </form>
          <Link to="/login" className="login__link">
            Already registered? Log in! </Link>
        </div>
      </div>
    );
  }

  submit(e) {   // eslint-disable-line
    console.log('submitting');   // eslint-disable-line
    e.preventDefault();

    axios.post(`${uriPrefix}/api/user`, {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      console.log(`created:`);   // eslint-disable-line
      console.log(res);   // eslint-disable-line
      this.props.history.push('/login');
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