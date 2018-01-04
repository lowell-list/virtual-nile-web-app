import React, {Component} from 'react';
import {PageLanding, PageSimpleQuestionLongAnswer, PageSimpleQuestionShortAnswer} from "./Page";
import './App.css';

// page IDs
const PID_1_1_LANDING             = '1.1-landing';
const PID_3_1_ENTER_NAME          = '3.1-enter-name';
const PID_4_1_ENTER_EMAIL         = '4.1-enter-email';
const PID_5_1_ENTER_DREAM         = '5.1-enter-dream';

// local storage keys
const LSK_SCREEN_NAME             = 'screenName';
const LSK_EMAIL                   = 'email';

// session storage keys
const SSK_CURRENT_PAGE_ID         = 'currentPageId';
const SSK_DREAM_TEXT              = 'dreamText';

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

    this.pageChangeTimeout = 0;
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

  componentWillUnmount() {
    clearTimeout(this.pageChangeTimeout);
  }

  /** returns the current Page based on the current page ID */
  currentPage() {
    switch(this.state.currentPageId) {
      default:
      case PID_1_1_LANDING:
        return <PageLanding
          onStartClick={() => this.changePage(PID_3_1_ENTER_NAME)}
        />;
      case PID_3_1_ENTER_NAME:
        return <PageSimpleQuestionShortAnswer
          questionText={"What's your name?"}
          currentInputValue={this.state.screenName}
          onPreviousClick={() => this.changePage(PID_1_1_LANDING)}
          onNextClick={() => this.changePage(PID_4_1_ENTER_EMAIL)}
          onUserInput={(value) => {
            this.setState({screenName:value});
            localStorage.setItem(LSK_SCREEN_NAME,value);
            if(value!=null && value.length>0) {
              this.changePage(PID_4_1_ENTER_EMAIL, 600);
            }
          }}
        />;
      case PID_4_1_ENTER_EMAIL:
        return <PageSimpleQuestionShortAnswer
          questionText={`${this.state.screenName}, what's your email?`}
          currentInputValue={this.state.email}
          onPreviousClick={() => this.changePage(PID_3_1_ENTER_NAME)}
          onNextClick={() => this.changePage(PID_5_1_ENTER_DREAM)}
          onUserInput={(value) => {
            this.setState({email:value});
            localStorage.setItem(LSK_EMAIL,value);
            if(value!=null && value.length>0) {
              console.log("ready for next screen!!");
            }
          }}
        />;
      case PID_5_1_ENTER_DREAM:
        return <PageSimpleQuestionLongAnswer
          questionText={`${this.state.screenName}, tell us about your dream`}
          currentInputValue={this.state.dreamText}
          onPreviousClick={() => this.changePage(PID_4_1_ENTER_EMAIL)}
          onNextClick={() => console.log("There is no next page yet.")}
          onUserInput={(value) => {
            this.setState({dreamText:value});
            sessionStorage.setItem(SSK_DREAM_TEXT,value);
            if(value!=null && value.length>0) {
              console.log("ready for next screen!!");
            }
          }}
        />;
    }
  }

  changePage(pageId, delayMillis = 0)
  {
    clearTimeout(this.pageChangeTimeout);
    this.pageChangeTimeout = setTimeout(() => {
      console.log("page selected: " + pageId);
      this.setState({ currentPageId: pageId });
      sessionStorage.setItem(SSK_CURRENT_PAGE_ID,pageId);
    },delayMillis);
  }
}

export default App;
