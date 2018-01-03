import React, { Component } from 'react';
import './App.css';
import './Page.css';
import babas_logo from './img/babas_logo.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPageId: "1.1-landing",
      locationId: "babas_pdx_cascade", // TODO: set this from query string
    };
  }

  render() {
    return (
      <div className="App">
        <CurrentPage
          currentPageId={this.state.currentPageId}
          onPageIdSelected={(pageId) => this.handlePageIdSelected(pageId)}
        />
      </div>
    );
  }

  handlePageIdSelected(pageId) {
    console.log("page selected: " + pageId);
    this.setState({
      currentPageId: pageId
    });
  }
}

/** returns the current Page based on the current page ID */
function CurrentPage(props) {

  const currentPageId = props.currentPageId;
  const onPageIdSelected = props.onPageIdSelected;

  switch(currentPageId) {
    case "3.1-enter-name":
      return <PageEnterName />;
    case "1.1-landing":
    default:
      return <PageLanding
        onStartClick={() => onPageIdSelected("3.1-enter-name") }
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
        <button className="Page-next-button Page-evergreen-button" onClick={this.props.onStartClick}>Start!</button>
      </div>
    );
  }
}

class PageEnterName extends Component {

  constructor(props) {
    super(props);
    console.log("page props: " + props);
  }

  render() {
    return (
      <div className="Page">
        <p className="Page-Header-1">What's your name?</p>
      </div>
    );
  }
}

export default App;
