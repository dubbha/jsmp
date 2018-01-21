import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import io from 'socket.io-client';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket = io.connect(`http://127.0.0.1:3000/`);
  message = 'hello, world';
  chat = [];
  username = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.username = this.authService.username;
    this.socket.on('message', (msg) => {
      this.chat.push(msg);
    });
  }

  say(e) {
    this.socket.emit('message', `[${this.username}] ${this.message}`);
    console.log(`saying ${this.message}`);
    this.message = '';
  }

  logout() {
    this.socket.emit('message', `[${this.username}] left`);
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}


/*

const socket = io.connect(`${uriPrefix}/`);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
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
                  <span className="chat__username">[{this.state.username}]</span>
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

*/