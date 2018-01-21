import React from 'react';
import PropTypes from 'prop-types';

import Svg from './Svg';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curTheme: 'default',
      type: 'month'
    };

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  render() {
    return (
      <div id="main" className={`theme-${this.state.curTheme}`}>
        <nav className="navbar d-flex flex-row justify-content-end">
          <a className="navbar-brand mr-auto" href="#">
            <Svg name='icon' className="navbar-brand__icon align-middle" />
            Calendar
          </a>
          <a className="navbar-link" onClick={this.toggleTheme}>
            <Svg name='theme' className="navbar-link__icon align-middle" />
          </a>
        </nav>
        {this.state.type === 'month' && (
          <table className="table table-striped calendar-table">
            <thead>
              <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
              </tr>
            </thead>
            <tbody>
              <tr className="week">
                <td className="calendar__date day">
                  <div className="day__number">1
                    <span
                      className={`month-name
                        month-name_current
                        month-name_view_days_7`}> May</span>
                  </div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">2</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">3</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">4</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">5</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">6</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">7</div>
                </td>
              </tr>
              <tr className="week">
                <td className="calendar__date day">
                  <div className="day__number">8</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">9</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">10</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">11</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">12</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">13</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">14</div>
                </td>
              </tr>
              <tr className="week">
                <td className="calendar__date day">
                  <div className="day__number">15</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">16</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">17</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">18</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">19</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">20</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">21</div>
                </td>
              </tr>
              <tr className="week week_current">
                <td className="calendar__date day">
                  <div className="day__number">22</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">23<span
                      className={`month-name
                        month-name_current
                        month-name_view_days_3`} > May</span></div>
                </td>
                <td className="calendar__date calendar__date_today day">
                    <div className="day__number day__number_today">24</div>
                    <span
                      className={`month-name
                          month-name_current
                          month-name_view_days_1`} > May</span>
                    <ul className="day__list">
                      <li>Eat</li>
                      <li>Sleep</li>
                      <li>JavaScript</li>
                    </ul>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">25</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">26</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">27</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">28</div>
                </td>
              </tr>
              <tr className="week">
                <td className="calendar__date day">
                  <div className="day__number">29</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">30</div>
                </td>
                <td className="calendar__date day">
                  <div className="day__number">31</div>
                </td>
                <td className="calendar__date calendar__date_other-month">
                  <div className="day__number">1 June</div>
                </td>
                <td className="calendar__date calendar__date_other-month">
                  <div className="day__number">2</div>
                </td>
                <td className="calendar__date calendar__date_other-month">
                  <div className="day__number">3</div>
                </td>
                <td className="calendar__date calendar__date_other-month">
                  <div className="day__number">4</div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }

  toggleTheme() {
    const themes = ['default', 'night'];
    this.setState({ curTheme: themes.find(e => e !== this.state.curTheme) });
  }
}

Chat.propTypes = {
  input: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default Chat;