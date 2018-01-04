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
const LSK_SCREEN_NAME             = 'screenName';
const LSK_EMAIL                   = 'email';

// session storage keys
const SSK_CURRENT_PAGE_ID         = 'currentPageId';

class App extends Component {

  constructor(props) {
    super(props);

    // determine current page ID
    let currentPageId = this.getCachedValue(
      SSK_CURRENT_PAGE_ID, PID_1_1_LANDING, sessionStorage, 'current page ID');

    // determine location ID from query string
    let locationId = 'babas_pdx_cascade';
    let urlParams = new URLSearchParams(window.location.search);
    let queryLocationId = urlParams.get('locationId');
    if(queryLocationId!=null) {
      locationId = queryLocationId;
      console.log("using location ID from query string: " + queryLocationId);
    }

    // lookup email and screen name, if they exist
    let screenName = this.getCachedValue(LSK_SCREEN_NAME, '', localStorage, 'screen name');
    let email = this.getCachedValue(LSK_EMAIL, '', localStorage, 'email');

    this.state = {
      currentPageId: currentPageId,
      locationId: locationId,
      userId: '0123456789',             // TODO: randomly generate this and store
      screenName: screenName,
      email: email,
      dreamText: '',
    };
  }

  getCachedValue(key, defaultValue, storage, description) {
    let value = defaultValue;
    let cachedValue = storage.getItem(key);
    if(cachedValue!=null) {
      value = cachedValue;
      console.log(`using cached ${description}: ${cachedValue}`);
    }
    return value;
  }

  render() {
    return (
      <div className="App">
        {this.currentPage()}
      </div>
    );
  }

  /** returns the current Page based on the current page ID */
  currentPage() {
    switch(this.state.currentPageId) {
      default:
      case PID_1_1_LANDING:
        return <PageLanding
          onStartClick={() => this.onPageIdSelected(PID_3_1_ENTER_NAME)}
        />;
      case PID_3_1_ENTER_NAME:
        return <PageSimpleQuestion
          questionText={"What's your name?"}
          currentInputValue={this.state.screenName}
          onPreviousClick={() => this.onPageIdSelected(PID_1_1_LANDING)}
          onNextClick={() => this.onPageIdSelected(PID_4_1_ENTER_EMAIL)}
          onUserInput={(value) => {
            this.setState({screenName:value});
            localStorage.setItem(LSK_SCREEN_NAME,value);
            // if(value!=null && value.length>0) {
            //   this.onPageIdSelected(PID_4_1_ENTER_EMAIL);
            // }
          }}
        />;
      case PID_4_1_ENTER_EMAIL:
        return <PageSimpleQuestion
          questionText={`${this.state.screenName}, what's your email?`}
          currentInputValue={this.state.email}
          onPreviousClick={() => this.onPageIdSelected(PID_3_1_ENTER_NAME)}
          onNextClick={() => console.log("There is no next page yet.")}
          onUserInput={(value) => {
            this.setState({email:value});
            localStorage.setItem(LSK_EMAIL,value);
            if(value!=null && value.length>0) {
              console.log("ready for next screen!!");
            }
          }}
        />;
    }
  }

  onPageIdSelected(pageId) {
    console.log("page selected: " + pageId);
    this.setState({
      currentPageId: pageId
    });
    sessionStorage.setItem(SSK_CURRENT_PAGE_ID,pageId);
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
      isPageStatusBarVisible: false,
    };
    this.mTimeout = 0;
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
    clearTimeout(this.mTimeout);
  }

  onInputFocus() {
    this.setPageStatusBarVisibility(true,0);
  }

  onInputBlur(value) {
    this.props.onUserInput(value);
    this.setPageStatusBarVisibility(false,500);
  }

  setPageStatusBarVisibility(value, delayMillis)
  {
    clearTimeout(this.mTimeout);
    if(delayMillis===0) {
      this.setState({isPageStatusBarVisible: value});
    }
    else {
      this.mTimeout = setTimeout(() => {
        this.setState({isPageStatusBarVisible: value});
      },delayMillis);
    }
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
