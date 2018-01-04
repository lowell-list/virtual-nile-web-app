import React, {Component} from 'react';
import './InputWithButton.css';

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
        <input type="text" className="InputWithButton__input" size="10"
               value={this.state.inputValue}
               onFocus={() => this.onInputFocus()}
               onBlur={() => this.onInputBlur()}
               onChange={(event) => this.onInputChange(event)}
        />
        <input type="button" className="InputWithButton__button"
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
    if(typeof this.props.onFocus === "function") { this.props.onFocus(); }
  }

  onInputBlur() {
    this.setButtonVisible(false,200); // hide button, after short delay
    if(typeof this.props.onBlur === "function") { this.props.onBlur(this.state.inputValue); }
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