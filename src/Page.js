import React, {Component} from 'react';
import InputWithButton from './InputWithButton.js';
import './Page.css';
import babas_logo from './img/babas_logo.png';

export class PageLanding extends Component {

  render() {
    return (
      <div className="Page">
        <img src={babas_logo} className="App-babas-logo" alt="babas_logo" />
        <div className="Page-video-wrapper">
          <iframe title="introVideo" className="Page-video" src="https://www.youtube.com/embed/yFw5KORObxA" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen/>
        </div>
        <p className="Page-Header-1">Let us help make your dream come true!</p>
        <p className="Page-normal-text">Lorem ipsum dolor sit amet, ea vim viris detraxit instructior. Vim liber iudico cetero an, ex vidit noluisse cum, ei nam nibh invidunt. Cum id erat regione integre. Per ei luptatum atomorum, an brute constituto conclusionemque sed.</p>
        <p className="Page-normal-text">Causae delectus gubergren an vis. Moderatius consequuntur vel ex. Ut mel nisl aliquando, an usu probo lorem graeco, sit ex denique argumentum. Eu simul veritus percipit nam. Qui ut mutat iusto. Sit utinam aliquip fuisset id, utroque verterem ius ad.</p>
        <p className="Page-normal-text">Eos populo delenit repudiandae id, in eripuit imperdiet mel, iuvaret dolores vis id. Menandri scripserit sed in, eam in mollis expetenda repudiandae. Ne eros error hendrerit mea. Ut usu libris virtute. At enim falli accommodare vis.</p>
        <p className="Page-normal-text">Ut modo aeterno concludaturque pri, eu voluptua ullamcorper sit. Eu sea elitr constituto, vel cibo alterum inermis te. Omnium nostrum ne mea. Ut vis summo choro animal, pri cu ullum cetero eripuit.</p>
        <p className="Page-normal-text">Mea eu augue omnium timeam, eu salutatus disputationi vel, id wisi saepe delicata has. An eum odio inermis. Quo nibh intellegat interesset an. Soluta prompta cu per, ut quidam bonorum epicurei sit.</p>
        <button className="Page-large-next-button Page-evergreen-button" onClick={this.props.onStartClick}>Start!</button>
      </div>
    );
  }
}

export class PageSimpleQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPageStatusBarVisible: false,
    };
    this.statusBarVisibilityTimeout = 0;
  }

  render() {
    return (
      <div className="Page">

        <div className="Page-Simple-Question">
          <div className="Page-Simple-Question-Header">{this.props.questionText}</div>
          <InputWithButton
            value={this.props.currentInputValue}
            onFocus={() => this.onInputFocus() }
            onBlur={(value) => this.onInputBlur(value) }
          />
        </div>
        <PageStatusBar
          hide={this.state.isPageStatusBarVisible}
          onPreviousClick={this.props.onPreviousClick}
          onNextClick={this.props.onNextClick}
        />
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.statusBarVisibilityTimeout);
  }

  onInputFocus() {
    this.setPageStatusBarVisible(true);
  }

  onInputBlur(value) {
    this.props.onUserInput(value);
    this.setPageStatusBarVisible(false,500);
  }

  setPageStatusBarVisible(value, delayMillis = 0)
  {
    clearTimeout(this.statusBarVisibilityTimeout);
    this.statusBarVisibilityTimeout = setTimeout(() => {
      this.setState({isPageStatusBarVisible: value});
    },delayMillis);
  }
}

function PageStatusBar(props) {
  if(props.hide) {
    return null;
  }
  return (
    <div className="Page-StatusBar">
      <div className="Page-StatusBar-progressbar">
        {/* TODO: add progressbar here */}
      </div>
      <div className="Page-StatusBar-buttons">
        <button className="Page-StatusBar-button" onClick={props.onPreviousClick}>∧</button>
        <button className="Page-StatusBar-button" onClick={props.onNextClick}>∨</button>
      </div>
    </div>
  )
}
