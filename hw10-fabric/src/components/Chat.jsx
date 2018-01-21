import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import io from 'socket.io-client';
import uriPrefix from './uriPrefix';

const socket = io.connect(`${uriPrefix}/`);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      image: null,
      response: '', // not yet attempted to authorize
      message: '',
      chat: []
    };

    this.auth = this.auth.bind(this);
    this.say = this.say.bind(this);
    this.logout = this.logout.bind(this);

    this.auth();

    socket.on('message', (msg) => {
      this.setState({ chat: [...this.state.chat, msg] });
    });
  }

  componentDidUpdate() {
    if (!this.state.image) {
      this.loadImage();
    }
  }

  loadImage() {
    axios.get(`${uriPrefix}/api/user/avatar/${this.state.username}`)
      .then((res) => {
        this.setState({ ...this.state, image: res.data });
      });
  }

  render() {
    return (
      <div>
        {this.state.auth && (
          <div className="chat__container">
            <div className="chat__auth">
              {this.state.response &&
                <span className="chat__response">{this.state.response}</span>}
              {this.state.username && (
                <span>
                  <span className="chat__username">
                    [<Link to="/cabinet">{this.state.username}</Link>]
                  </span>
                  { this.state.image &&
                    <Link to="/cabinet">
                      <img
                        src={this.state.image}
                        style={{ width: '50px', height: '50px', verticalAlign: 'top' }}
                      />
                    </Link>
                  }
                  <button className="chat__button" onClick={this.logout}>Log Out</button>
                </span>
              )}
            </div>
            <form onSubmit={this.say}>
              <input className="chat__input" type="text" autoComplete="off"
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })} />
              <button className="chat__button" type="submit">Say</button>
            </form>
            <div>{this.state.chat.map((msg, idx) =>
                <div className="chat__message" key={idx}>{msg}</div>)}</div>
          </div>
        )}
      </div>
    );
  }

  auth() {
    axios.defaults.headers.common.Authorization = `JWT ${sessionStorage.getItem('token')}`;
    axios.get(`${uriPrefix}/auth`)
      .then((res) => {
        this.setState({
          auth: res.data.auth,
          response: res.data.result,
          username: sessionStorage.getItem('username')
        });
      })
      .catch((err) => {
        if (!err.response.data.auth) this.props.history.push('/login');
      });
  }

  say(e) {
    e.preventDefault();
    socket.emit('message', this.state.message);
    console.log(`saying ${this.state.message}`); // eslint-disable-line
    this.setState({ message: '' });
  }

  logout() {
    socket.emit('message', `[${this.state.username}] left`);
    sessionStorage.clear();
    this.props.history.push('/login');
  }
}

Chat.propTypes = {
  input: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default Chat;
