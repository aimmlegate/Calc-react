import safeEval from 'safe-eval';
import React, { Component } from 'react';

class App extends Component {
  state = {str:'0', start: true};

  dispatch = {
    numbers: (v) => {
      const { str, start } = this.state;
      if (start) {
        this.setState({str: `${v}`, start: false});
      } else {
        const newStr = `${str}${v}`;
        this.setState({str: newStr});
      }
    },
    operators: (v) => {
      const { str, start } = this.state;
      if (!start) {
        const last = parseInt(str.slice(-1), 10);
        if (!Number.isNaN(last)) {
          const newStr = `${str}${v}`;
          this.setState({str: newStr});
        }
      }
    },
    clear: () => {
      this.setState({ str: '0', start: true });
    },
    backspace: () => {
      const { str } = this.state;
      const newStr = (str.length === 1) ? '0' : str.slice(0, -1);
      this.setState({ str: newStr });
    },
    summ: () => {
      let { str } = this.state;
      const last = parseInt(str.slice(-1), 10);
      if (Number.isNaN(last)) {
        str = str.slice(0, -1);
      }
      const result = safeEval(str);
      this.setState({ str: result.toString() });
    }
  }

  pressHandler = val => () => {
    const parseVal = parseInt(val, 10);
    switch (true) {
      case (val === 'C'):
        this.dispatch.clear();
        break;
      case (val === '<'):
        this.dispatch.backspace();
        break;
      case (val === '='):
        this.dispatch.summ();
        break;
      case (Number.isNaN(parseVal)):
        this.dispatch.operators(val);
        break;
      default:
        this.dispatch.numbers(val);
    }
  }

  render() {
    return (
      <div>
        <div className="alert alert-primary return" role="alert">
          {this.state.str}
        </div>
        <div className="calc-layout">
          <div className="btn btn-danger" onClick={this.pressHandler('C')}>c</div>
          <div className="btn btn-success" onClick={this.pressHandler('/')}>/</div>
          <div className="btn btn-success" onClick={this.pressHandler('*')}>*</div>
          <div className="btn btn-success" onClick={this.pressHandler('<')}>&lt;</div>
          <div className="btn btn-primary" onClick={this.pressHandler('7')}>7</div>
          <div className="btn btn-primary" onClick={this.pressHandler('8')}>8</div>
          <div className="btn btn-primary" onClick={this.pressHandler('9')}>9</div>
          <div className="btn btn-success" onClick={this.pressHandler('-')}>-</div>
          <div className="btn btn-primary" onClick={this.pressHandler('4')}>4</div>
          <div className="btn btn-primary" onClick={this.pressHandler('5')}>5</div>
          <div className="btn btn-primary" onClick={this.pressHandler('6')}>6</div>
          <div className="btn btn-success" onClick={this.pressHandler('+')}>+</div>
          <div className="btn btn-primary" onClick={this.pressHandler('1')}>1</div>
          <div className="btn btn-primary" onClick={this.pressHandler('2')}>2</div>
          <div className="btn btn-primary" onClick={this.pressHandler('3')}>3</div>
          <div className="btn btn-warning answer-btn" onClick={this.pressHandler('=')}>=</div>
          <div className="btn btn-primary" onClick={this.pressHandler('%')}>%</div>
          <div className="btn btn-primary" onClick={this.pressHandler('0')}>0</div>
          <div className="btn btn-primary" onClick={this.pressHandler('.')}>.</div>
        </div>
      </div>
    );
  }
}

export default App;
