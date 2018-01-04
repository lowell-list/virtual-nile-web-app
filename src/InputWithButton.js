import React, {Component} from 'react';

class InputWithButton extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      buttonVisible: false,
      inputValue: "",
    };
    this.mTimeout = 0;
  }

  render() {
    return (
      <div className="InputWithButton">
        <input type="text" className="InputWithButton-Input" size="10"
               onFocus={() => this.onInputFocus()}
               onBlur={() => this.onInputBlur()}
               onChange={(event) => this.onInputChange(event)}
        />
        <input type="button" className="InputWithButton-Button"
               value="OK"
               style={{visibility:(this.state.buttonVisible?'visible':'hidden')}}
               // onFocus={() => this.onButtonClick() }
        />
      </div>
    )
  }

  onInputFocus() {
    this.setButtonVisible(true,0);
    if(typeof this.props.onFocus === "function") { this.props.onFocus(); }
  }

  onInputBlur() {
    this.setButtonVisible(false,200);
    if(typeof this.props.onBlur === "function") { this.props.onBlur(); }
    if(typeof this.props.onUserInput === "function") {
      this.props.onUserInput(this.state.inputValue);
    }
  }

  onInputChange(event) {
    this.setState({inputValue:event.target.value});
  }

  onButtonClick() {
    console.log("harrro peeps!");
    console.log("button clicked! value is " + this.state.inputValue);
  }

  setButtonVisible(value, delayMillis)
  {
    clearTimeout(this.mTimeout);
    if(delayMillis===0) {
      this.setState({buttonVisible: value});
    }
    else {
      this.mTimeout = setTimeout(() => {
        this.setState({buttonVisible: value});
      },delayMillis);
    }
  }

}

export default InputWithButton;