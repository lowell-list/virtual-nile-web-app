import React, {Component} from 'react';

class InputWithButton extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      inputFocused: false
    };
  }

  render() {
    return (
      <div className="InputWithButton">
        <input type="text" className="InputWithButton-Input" size="10"
               onFocus={() => this.onInputFocus()}
               onBlur={() => this.onInputBlur()}
               onInput={() => this.onInputInput()}
        />
        <input type="button" className="InputWithButton-Button"
               value="OK"
               style={{visibility:(this.state.inputFocused?'visible':'hidden')}}
        />
      </div>
    )
  }

  onInputFocus() {
    this.setState({inputFocused:true});
    if(typeof this.props.onFocus === "function") { this.props.onFocus(); }
  }

  onInputBlur() {
    this.setState({inputFocused:false});
    if(typeof this.props.onBlur === "function") { this.props.onBlur(); }
  }

  onInputInput() {
    console.log("thanks for the input");
  }
}

export default InputWithButton;