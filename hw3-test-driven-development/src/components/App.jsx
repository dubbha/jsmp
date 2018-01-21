import React from 'react';
import PropTypes from 'prop-types';
import calc from '../utils/calc';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.input ? props.input : '',
      result: calc(props.input)
    };

    this.calculate = this.calculate.bind(this);
    this.digit = this.digit.bind(this);
    this.oper = this.oper.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          <form className="calc__form" onSubmit={this.submit} autoComplete="off">
            <input
              className="calc__input"
              type="text"
              id="input"
              value={this.state.input}
              onChange={e => this.setState({ input: e.target.value })} />
            <button
              id="equal"
              className="calc__button calc__button-equal"
              onClick={this.calculate}> = </button>
          </form>
          <span id="result" className="calc__result"> {this.state.result} </span>
        </div>
        <div>
          <button className="calc__button" id="d7" onClick={() => this.digit(7)}> 7 </button>
          <button className="calc__button" id="d8" onClick={() => this.digit(8)}> 8 </button>
          <button className="calc__button" id="d9" onClick={() => this.digit(9)}> 9 </button>
          <button className="calc__button" id="div" onClick={() => this.oper('/')}> &#247; </button>
        </div>
        <div>
          <button className="calc__button" id="d4" onClick={() => this.digit(4)}> 4 </button>
          <button className="calc__button" id="d5" onClick={() => this.digit(5)}> 5 </button>
          <button className="calc__button" id="d6" onClick={() => this.digit(6)}> 6 </button>
          <button className="calc__button" id="mult" onClick={() => this.oper('*')}> &#215; </button>
        </div>
        <div>
          <button className="calc__button" id="d1" onClick={() => this.digit(1)}> 1 </button>
          <button className="calc__button" id="d2" onClick={() => this.digit(2)}> 2 </button>
          <button className="calc__button" id="d3" onClick={() => this.digit(3)}> 3 </button>
          <button className="calc__button" id="add" onClick={() => this.oper('+')}> &#43; </button>
        </div>
        <div>
          <button className="calc__button" id="d0" onClick={() => this.digit(0)}> 0 </button>
          <button
            className="calc__button calc__button-clear"
            id="clear"
            onClick={this.clear}> C </button>
          <button className="calc__button" id="pow" onClick={() => this.oper('**')}> ^ </button>
          <button className="calc__button" id="sub" onClick={() => this.oper('-')}> &#8722; </button>
        </div>
      </div>
    );
  }

  calculate() {
    this.setState(() => ({ result: calc(this.state.input) }));
  }

  digit(num) {
    this.setState({ input: this.state.input + num.toString() });
  }

  oper(str) {
    this.setState({ input: this.state.input + str });
  }

  clear() {
    this.setState({
      input: '',
      result: '',
    });
  }

  submit(e) {
    this.calculate();
    e.preventDefault();
  }
}

App.propTypes = {
  input: PropTypes.string
};

export default App;