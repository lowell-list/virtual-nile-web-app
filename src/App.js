import React, {Component} from 'react';
import {PageLanding, PageSimpleQuestionLongAnswer, PageSimpleQuestionShortAnswer} from "./Page";
import Modal from 'simple-react-modal';
import './App.css';
import {randomAlphaNumericString} from './Util';

// page IDs
const PID_1_1_LANDING           = '1.1-landing';
const PID_3_1_ENTER_NAME        = '3.1-enter-name';
const PID_4_1_ENTER_EMAIL       = '4.1-enter-email';
const PID_5_1_ENTER_DREAM       = '5.1-enter-dream';

// local storage keys
const LSK_SCREEN_NAME           = 'screenName';
const LSK_EMAIL                 = 'email';
const LSK_USER_ID               = 'userId';

// session storage keys
const SSK_CURRENT_PAGE_ID       = 'currentPageId';
const SSK_DREAM_TEXT            = 'dreamText';

// valid location IDs
const VALID_LOCATION_IDS        = [ 'babas_pdx_bethany', 'babas_pdx_cascade' ];

class App extends Component {

  constructor(props) {
    super(props);

    let constructorError = null;

    // determine location ID from query string
    let urlParams = new URLSearchParams(window.location.search);
    let queryLocationId = urlParams.get('locationId');
    if(queryLocationId!=null && VALID_LOCATION_IDS.indexOf(queryLocationId)>=0) {
      console.log("valid location ID found in query string: " + queryLocationId);
    }
    else {
      constructorError = {
        message: "no valid location ID found in query string",
        allowCancel: false
      };
    }

    // determine user ID
    let userId = this.getCachedValue(LSK_USER_ID, null, localStorage, 'user ID');
    if(userId==null) {
      // generate a new random user ID and save it for all future use on this device
      userId = randomAlphaNumericString(20,true);
      localStorage.setItem(LSK_USER_ID,userId);
      console.log(`generated and saved new user ID: ${userId}`);
    }

    // determine current page ID
    let currentPageId = this.getCachedValue(
      SSK_CURRENT_PAGE_ID, PID_1_1_LANDING, sessionStorage, 'current page ID');

    // lookup state variables, if they exist
    let screenName = this.getCachedValue(LSK_SCREEN_NAME, '', localStorage, 'screen name');
    let email = this.getCachedValue(LSK_EMAIL, '', localStorage, 'email');
    let dreamText = this.getCachedValue(SSK_DREAM_TEXT, '', sessionStorage, 'dream text');

    // set initial state
    this.state = {
      currentPageId: currentPageId,
      locationId: queryLocationId,
      userId: userId,
      screenName: screenName,
      email: email,
      dreamText: dreamText,
      modalMessage: null,
      error: constructorError
    };

    this.pageChangeTimeout = 0;
  }

  getCachedValue(key, defaultValue, storage, description) {
    let value = defaultValue;
    let cachedValue = storage.getItem(key);
    if(cachedValue!=null) {
      value = cachedValue;
      console.log(`using cached ${description}: ${value}`);
    }
    return value;
  }

  render() {
    return (
      <div className="App">
        {(this.state.error==null) ? this.currentPage() : this.errorModal()}
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
          inputValue={this.state.screenName}
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
          inputValue={this.state.email}
          onPreviousClick={() => this.changePage(PID_3_1_ENTER_NAME)}
          onNextClick={() => this.changePage(PID_5_1_ENTER_DREAM)}
          onUserInput={(value) => {
            this.setState({email:value});
            localStorage.setItem(LSK_EMAIL,value);
            if(value!=null && value.length>0) {
              this.changePage(PID_5_1_ENTER_DREAM, 600);
            }
          }}
        />;
      case PID_5_1_ENTER_DREAM:
        return (
          <PageSimpleQuestionLongAnswer
            questionText={`${this.state.screenName}, tell us about your dream`}
            inputValue={this.state.dreamText}
            onPreviousClick={() => this.changePage(PID_4_1_ENTER_EMAIL)}
            onNextClick={() => console.log("There is no next page yet; coming soon...")}
            onDoneClick={() => console.log("done") }
            onUserInput={(value) => {
              this.setState({dreamText:value});
              sessionStorage.setItem(SSK_DREAM_TEXT,value);
              if(value!=null && value.length>0) {
                // this.setState({modalMessage:"ready for next screen!!"});
                console.log("ready for next screen!!");
              }
            }}
          />
        )
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

  errorModal() {
    return (
      <Modal
        containerStyle={{padding: '20px', width: '90%'}}
        show={(this.state.error!=null)}
        closeOnOuterClick={this.state.error.allowCancel}
        onClose={() => this.onErrorModalClose()}
      >
        <div className="App__errorMessage">{this.state.error.message}</div>
      </Modal>
    )
  }

  onErrorModalClose() {
    if(this.state.error.allowCancel) { this.setState({error: null}); }
  }

}

export default App;
