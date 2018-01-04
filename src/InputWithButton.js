import React, {Component} from 'react';

class InputWithButton extends Component
{
  constructor(props) {
    console.log("running constructor...");
    super(props);
    this.state = {
      buttonVisible: false,
      inputValue: props.value,
    };
    this.mTimeout = 0;

    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.setButtonVisible = this.setButtonVisible.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("setting " + this.state.inputValue + " to " + nextProps.value);
    this.setState({inputValue: nextProps.value});
  }

  render() {
    return (
      <div className="InputWithButton">
        <input type="text" className="InputWithButton-Input" size="10"
               value={this.state.inputValue}
               onFocus={() => this.onInputFocus()}
               onBlur={() => this.onInputBlur()}
               onChange={(event) => this.onInputChange(event)}
        />
        <input type="button" className="InputWithButton-Button"
               value="OK"
               style={{visibility:(this.state.buttonVisible?'visible':'hidden')}}
        />
      </div>
    )
  }

  componentWillUnmount() {
    clearTimeout(this.mTimeout);
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