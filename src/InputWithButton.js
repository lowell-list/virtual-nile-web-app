import React, {Component} from 'react';
import './InputWithButton.css';
const R = require('ramda');

class InputWithButton extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      buttonVisible: false,
      inputValue: props.value,
    };
    this.buttonVisibilityTimeout = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({inputValue: nextProps.value});
  }

  render() {
    return (
      <div className="InputWithButton">
        <input type="text" className="InputWithButton__input AppTheme__element--blueBorder" size="10"
               value={this.state.inputValue}
               onFocus={() => this.onInputFocus()}
               onBlur={() => this.onInputBlur()}
               onChange={(event) => this.onInputChange(event)}
        />
        <input type="button" className="InputWithButton__button AppTheme__button--smallOrange"
               value="OK"
               style={{visibility:(this.state.buttonVisible?'visible':'hidden')}}
        />
      </div>
    )
  }

  componentWillUnmount() {
    clearTimeout(this.buttonVisibilityTimeout);
  }

  onInputFocus() {
    this.setButtonVisible(true); // show button
    if(R.is(Function,this.props.onFocus)) { this.props.onFocus(); }
  }

  onInputBlur() {
    this.setButtonVisible(false,200); // hide button, after short delay
    if(R.is(Function,this.props.onBlur)) { this.props.onBlur(this.state.inputValue); }
  }

  onInputChange(event) {
    this.setState({inputValue:event.target.value});
  }

  setButtonVisible(value, delayMillis = 0)
  {
    clearTimeout(this.buttonVisibilityTimeout); // clear any previous timeouts
    this.buttonVisibilityTimeout = setTimeout(() => {
      this.setState({buttonVisible: value});
    },delayMillis);
  }
}

export default InputWithButton;