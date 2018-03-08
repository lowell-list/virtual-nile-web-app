import React, {Component} from 'react';
import babas_logo from '.././img/babas_logo.png';

export default class PageLanding extends Component {

  render() {
    return (
      <div className="Page">
        <img src={babas_logo} className="Page__babasLogo" alt="babas_logo" />
        {/*<div className="Page__videoWrapper">*/}
        {/*<iframe title="introVideo" className="Page__video" src="https://www.youtube.com/embed/yFw5KORObxA" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen/>*/}
        {/*</div>*/}
        <p className="Page__header1 Page__header1--blue">Let us help make your dream come true!</p>
        <p className="Page__header1 Page__header1--orange">Hope deferred makes the heart sick, but a dream fulfilled is a tree of life.</p>
        <p className="Page__normalText">According to an ancient Egyptian story, party guests would float a lotus flower with a burning candle placed carefully in the middle.</p>
        <p className="Page__normalText">Each person would share a dream hidden in their heart before releasing the lotus flower down the famous Nile river.</p>
        <p className="Page__normalText">It was believed that if the flame continued to burn for the duration of the meal their dream would eventually come true.</p>
        <p className="Page__normalText">Share your dream with us and cast your lotus into the nile.</p>
        <br/><br/><br/><br/>
        <button className="Page__nextButton AppTheme__largeButton AppTheme__largeButton--blue" onClick={this.props.onStartClick}>Start!</button>
      </div>
    );
  }
}
