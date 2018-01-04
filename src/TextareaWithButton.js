import React, {Component} from 'react';
import './TextareaWithButton.css';

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
    if(typeof this.props.onFocus === "function") { this.props.onFocus(); }
  }

  onTextareaBlur() {
    this.setButtonVisible(false,200); // hide button, after short delay
    if(typeof this.props.onBlur === "function") { this.props.onBlur(this.state.textareaValue); }
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