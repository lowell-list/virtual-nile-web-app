import React, {Component} from 'react';
import './TextareaWithButton.css';
import {DREAM_TEXT_MAX_LENGTH} from './App'
const R = require('ramda');

class TextareaWithButton extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      buttonVisible: false,
      textareaValue: props.value,
    };
    this.buttonVisibilityTimeout = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({textareaValue: nextProps.value});
  }

  render() {
    return (
      <div className="TextareaWithButton">
        <textarea className="TextareaWithButton__textarea AppTheme__element--blueBorder"
                  value={this.state.textareaValue}
                  onFocus={() => this.onTextareaFocus()}
                  onBlur={() => this.onTextareaBlur()}
                  onChange={(event) => this.onTextareaChange(event)}
                  onKeyPress={(event) => this.onTextareaKeyPress(event)}
                  maxLength={DREAM_TEXT_MAX_LENGTH}
        />
        <input type="button" className="TextareaWithButton__button AppTheme__button--smallOrange"
               value="OK"
               style={{visibility:(this.state.buttonVisible?'visible':'hidden')}}
        />
      </div>
    )
  }

  componentWillUnmount() {
    clearTimeout(this.buttonVisibilityTimeout);
  }

  onTextareaFocus() {
    this.setButtonVisible(true); // show button
    if(R.is(Function,this.props.onFocus)) { this.props.onFocus(); }
  }

  onTextareaBlur() {
    this.setButtonVisible(false,200); // hide button, after short delay
    if(R.is(Function,this.props.onBlur)) { this.props.onBlur(this.state.textareaValue); }
  }

  onTextareaKeyPress(event) {
    // silently disallow the Enter key
    if(event.key==='Enter') {
      event.preventDefault();
    }
  }

  onTextareaChange(event) {
    this.setState({textareaValue:event.target.value});
  }

  setButtonVisible(value, delayMillis = 0)
  {
    clearTimeout(this.buttonVisibilityTimeout); // clear any previous timeouts
    this.buttonVisibilityTimeout = setTimeout(() => {
      this.setState({buttonVisible: value});
    },delayMillis);
  }
}

export default TextareaWithButton;