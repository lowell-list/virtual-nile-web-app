import React, {Component} from 'react';
import InputWithButton from './InputWithButton.js';
import './App.css';
import './Page.css';
import './InputWithButton.css';
import babas_logo from './img/babas_logo.png';

// page IDs
const PID_1_1_LANDING             = '1.1-landing';
const PID_3_1_ENTER_NAME          = '3.1-enter-name';
const PID_4_1_ENTER_EMAIL         = '4.1-enter-email';

// local storage keys

// session storage keys
const SSK_CURRENT_PAGE_ID         = 'currentPageId';

class App extends Component {

  constructor(props) {
    super(props);

    // determine current page ID
    let currentPageId = PID_1_1_LANDING;
      let cachedCurrentPageId = sessionStorage.getItem(SSK_CURRENT_PAGE_ID);
    if(cachedCurrentPageId!=null) {
      currentPageId = cachedCurrentPageId;
      console.log("using cached current page ID: " + currentPageId);
    }

    // determine location ID from query string
    let locationId = 'babas_pdx_cascade';
    let urlParams = new URLSearchParams(window.location.search);
    let queryLocationId = urlParams.get('locationId');
    if(queryLocationId!=null) {
      locationId = queryLocationId;
      console.log("using location ID from query string: " + queryLocationId);
    }

    this.state = {
      currentPageId: currentPageId,
      locationId: locationId,
      userId: '0123456789',             // TODO: randomly generate this and store
      email: '',
      screenName: '',
      dreamText: '',
    };
  }

  render() {
    return (
      <div className="App">
        <CurrentPage
          currentPageId={this.state.currentPageId}
          onPageIdSelected={(pageId) => this.onPageIdSelected(pageId)}
          onUserInput={(inputObject) => this.onUserInput(inputObject)}
        />
      </div>
    );
  }

  onPageIdSelected(pageId) {
    console.log("page selected: " + pageId);
    this.setState({
      currentPageId: pageId
    });
    sessionStorage.setItem(SSK_CURRENT_PAGE_ID,pageId);
  }

  onUserInput(inputObject) {
    console.log("user input: " + JSON.stringify(inputObject));

  }
}

/** returns the current Page based on the current page ID */
function CurrentPage(props) {

  const currentPageId = props.currentPageId;
  const onPageIdSelected = props.onPageIdSelected;
  const onUserInput = props.onUserInput;

  switch(currentPageId) {
    case PID_3_1_ENTER_NAME:
      return <PageSimpleQuestion
        onPreviousClick={() => onPageIdSelected(PID_1_1_LANDING)}
        onNextClick={() => onPageIdSelected(PID_4_1_ENTER_EMAIL)}
        onUserInput={(value) => onUserInput({screen_name:value})}
      />;
    case PID_4_1_ENTER_EMAIL:
      return <PageEnterEmail
        onPreviousClick={() => onPageIdSelected(PID_3_1_ENTER_NAME)}
        onNextClick={() => console.log("There is no next page yet.")}
      />;
    case PID_1_1_LANDING:
    default:
      return <PageLanding
        onStartClick={() => onPageIdSelected(PID_3_1_ENTER_NAME)}
      />;
  }
}

class PageLanding extends Component {

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

class PageSimpleQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputHasFocus: false
    };
    this.mTimeout = 0;
    this.mInputValue = "";
  }

  render() {
    return (
      <div className="Page">

        <div className="Page-Simple-Question">
          <div className="Page-Simple-Question-Header">What's your name?</div>
          <InputWithButton
            onFocus={() => this.setInputHasFocus(true,0) }
            onBlur={() => this.setInputHasFocus(false,500) }
            onUserInput={(value) => this.onUserInput(value)}
          />
        </div>
        <PageStatusBar
          hide={this.state.inputHasFocus}
          onPreviousClick={this.props.onPreviousClick}
          onNextClick={this.props.onNextClick}
        />
      </div>
    );
  }

  onUserInput(value) {
    console.log("received value from user: " + value);
  }

  setInputHasFocus(newValue, delayMillis)
  {
    clearTimeout(this.mTimeout);
    if(delayMillis===0) {
      this.setState({inputHasFocus: newValue});
    }
    else {
      this.mTimeout = setTimeout(() => {
        this.setState({inputHasFocus: newValue});
      },delayMillis);
    }
  }
}

class PageEnterEmail extends Component {

  render() {
    return (
      <div className="Page">
        <p className="Page-Header-1">What's your email?</p>
        <PageStatusBar
          onPreviousClick={this.props.onPreviousClick}
          onNextClick={this.props.onNextClick}
        />
      </div>
    );
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

export default App;
