import React, {Component} from 'react';
import InputWithButton from './InputWithButton.js';
import TextareaWithButton from './TextareaWithButton.js';
import './Page.css';
import babas_logo from './img/babas_logo.png';
import babas_logo_small from './img/babas_logo_small.png';
import icon_checkmark from './img/icon_checkmark.png';
import nc_00_water_glow from './img/night_candle/nc_00_water_glow.png';
import nc_10_shadow_lit from './img/night_candle/nc_10_shadow_lit.png';
import nc_21_outer_flower_lit from './img/night_candle/nc_21_outer_flower_lit.png';
import nc_31_inner_flower_lit from './img/night_candle/nc_31_inner_flower_lit.png';
import nc_41_candle_lit from './img/night_candle/nc_41_candle_lit.png';
import nc_45_candle_flame from './img/night_candle/nc_45_candle_flame.png';
import nc_46_candle_glow from './img/night_candle/nc_46_candle_glow.png';
import nc_50_glow from './img/night_candle/nc_50_glow.png';
import nc_61_outer_flower_front_lit from './img/night_candle/nc_61_outer_flower_front_lit.png';

export class PageLanding extends Component {

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

/** abstract base class */
class PageWithStatusBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPageStatusBarVisible: true,
    };
    this.statusBarVisibilityTimeout = 0;
  }

  componentWillUnmount() {
    clearTimeout(this.statusBarVisibilityTimeout);
  }

  setPageStatusBarVisible(value, delayMillis = 0)
  {
    clearTimeout(this.statusBarVisibilityTimeout);
    this.statusBarVisibilityTimeout = setTimeout(() => {
      this.setState({isPageStatusBarVisible: value});
    },delayMillis);
  }
}

class TintedLayeredImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allImagesLoaded: false,
    };

    // load all Image objects
    this.imageProperties = [];                                // array of image property objects, one for each image
    this.loadedImagesCount = 0;
    for(let orgimgprp of props.images) {                      // orgimgprp = original image properties
      let imgobj = new Image();
      let imgprp = Object.assign({image: imgobj},orgimgprp);
      this.imageProperties.push(imgprp);
      imgobj.onload = this.onImageLoaded.bind(this);
      imgobj.src = orgimgprp.src;
    }
  }

  onImageLoaded() {
    this.loadedImagesCount++;
    if(this.props.images.length === this.loadedImagesCount) { this.onAllImagesLoaded(); }
  }

  onAllImagesLoaded() {
    this.setState({allImagesLoaded: true});
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    // do not continue if not ready yet
    if(!this.state.allImagesLoaded || this.canvasElement==null) { return; }

    // draw all images onto canvas
    const cvsctx = this.canvasElement.getContext('2d'); // canvas drawing context
    for(let imgprp of this.imageProperties) {
      this.drawImageOnCanvas(cvsctx, imgprp);
    }
  }

  drawImageOnCanvas(context, imageProps)
  {
    let ovlbfr = null;    // overlay buffer
    let ovlalp = 0.5;     // overlay alpha

    // get canvas dimensions
    let cvswth = context.canvas.width;
    let cvshgt = context.canvas.height;

    // generate overlay buffer if necessary
    if(imageProps.hasOwnProperty('tint'))
    {
      // tint magic here!

      // 1) create an off-screen buffer canvas that is the same size as the real canvas
      ovlbfr = document.createElement('canvas');
      ovlbfr.width = cvswth;
      ovlbfr.height = cvshgt;
      let bfrctx = ovlbfr.getContext('2d');
      // 2) using the reference image, draw the tint-color in every non-transparent pixel position
      //    Do this using the 'destination-atop' composite operation:
      //      The existing canvas is only kept where it overlaps the new shape.
      //      The new shape is drawn behind the canvas content.
      bfrctx.fillStyle = imageProps.tint;
      bfrctx.fillRect(0,0,ovlbfr.width,ovlbfr.height);                      // fill off-screen buffer with tint color
      bfrctx.globalCompositeOperation = "destination-atop";                 // set composite operation
      bfrctx.drawImage(imageProps.image,0,0,ovlbfr.width,ovlbfr.height);    // draw image w/ defined composite operation
    }

    // draw the image on the canvas context
    context.globalAlpha = 1.0;
    context.drawImage(imageProps.image,0,0,cvswth,cvshgt);

    // optionally superimpose the overlay buffer with the given alpha, which in effect "tints" the original image
    if(ovlbfr != null) {
      context.globalAlpha = ovlalp;
      context.drawImage(ovlbfr,0,0);
    }
  }

  render() {
    return (
      <canvas
        style={this.props.canvasStyle}
        ref={(element) => { this.canvasElement = element; }}
        width={this.props.canvasWidth} height={this.props.canvasHeight}
      />
    );
  }
}

export class PageCustomizeLotusFlower extends PageWithStatusBar {

  constructor(props) {
    super(props);

    this.state = {
      primaryTint: '#FF0000',
      secondaryTint: '#00FF00',
    };
  }

    render() {
    return (
      <div className="Page">
        <br/>
        <br/>
        <br/>
        <p className="Page__header1 Page__header1--blue">Create your very own Lotus Flower</p>

        <TintedLayeredImages
          canvasStyle={{width: '100%'}}
          canvasWidth={750} canvasHeight={450}
          images={
            [
              {src: nc_50_glow},
              {src: nc_00_water_glow},
              {src: nc_10_shadow_lit},
              {src: nc_21_outer_flower_lit, tint: this.state.secondaryTint},
              {src: nc_31_inner_flower_lit, tint: this.state.primaryTint},
              {src: nc_41_candle_lit},
              {src: nc_45_candle_flame},
              {src: nc_46_candle_glow},
              {src: nc_61_outer_flower_front_lit},
            ]
          }
        />

        <button className="Page__colorSelectButton" onClick={() => console.log('click') }>Color 1</button>
        <button className="Page__colorSelectButton" onClick={() => console.log('click') }>Color 2</button>
        <button className="Page__colorSelectButton" onClick={() => console.log('click') }>Randomizer</button>

        <PageStatusBar
          visible={this.state.isPageStatusBarVisible}
          nextEnabled={this.props.nextEnabled}
          onPreviousClick={this.props.onPreviousClick}
          onNextClick={this.props.onNextClick}
        />
      </div>
    );
  }
}

export class PageSimpleQuestionShortAnswer extends PageWithStatusBar {

  render() {
    return (
      <div className="Page">

        <div className="Page__simpleQuestionShortAnswer">
          <div className="Page__simpleQuestionHeader Page__simpleQuestionHeader--mid">{this.props.questionText}</div>
          <InputWithButton
            value={this.props.inputValue}
            onFocus={() => this.onInputFocus() }
            onBlur={(value) => this.onInputBlur(value) }
          />
        </div>
        <PageStatusBar
          visible={this.state.isPageStatusBarVisible}
          nextEnabled={this.props.nextEnabled}
          onPreviousClick={this.props.onPreviousClick}
          onNextClick={this.props.onNextClick}
        />
      </div>
    );
  }

  onInputFocus() {
    this.setPageStatusBarVisible(false);
  }

  onInputBlur(value) {
    this.props.onUserInput(value);
    this.setPageStatusBarVisible(true,500);
  }
}

export class PageSimpleQuestionLongAnswer extends PageWithStatusBar {

  render() {
    return (
      <div className="Page">

        <div className="Page__simpleQuestionLongAnswer">
          <div className="Page__simpleQuestionHeader Page__simpleQuestionHeader--upper">{this.props.questionText}</div>
          <TextareaWithButton
            value={this.props.inputValue}
            onFocus={() => this.onInputFocus()}
            onBlur={(value) => this.onInputBlur(value)}
          />
        </div>
        <button className="Page__buttonOverStatusBar AppTheme__largeButton AppTheme__largeButton--blue"
                style={{visibility:(this.state.isPageStatusBarVisible?'visible':'hidden')}}
                onClick={this.props.onNextClick}
                disabled={!this.props.nextEnabled}
                >
          {this.props.doneButtonLabel}
        </button>
        <PageStatusBar
          visible={this.state.isPageStatusBarVisible}
          nextEnabled={false}
          onPreviousClick={this.props.onPreviousClick}
          onNextClick={this.props.onNextClick}
        />
      </div>
    );
  }

  onInputFocus() {
    this.setPageStatusBarVisible(false);
  }

  onInputBlur(value) {
    this.props.onUserInput(value);
    this.setPageStatusBarVisible(true,500);
  }
}

function PageStatusBar(props) {
  if(!props.visible) {
    return null;
  }
  return (
    <div className="Page__statusBar">
      <div className="Page__statusBar__progressbar">
        {/* TODO: add progressbar here */}
      </div>
      <div className="Page__statusBar__buttons">
        <button
          className="Page__statusBar__buttons__button"
          onClick={props.onPreviousClick}
        >
          ∧
        </button>
        <button
          className="Page__statusBar__buttons__button"
          onClick={props.onNextClick}
          disabled={!props.nextEnabled}
        >
          ∨
        </button>
      </div>
    </div>
  )
}

export class PageDreamConfirmed extends Component {

  render() {
    return (
      <div className="Page Page__dreamConfirmed">
        <div className="Page__fullBlueBackground"/>
        <img src={babas_logo_small} className="Page__babasLogoSmall" alt="babas_logo_small" />
        <p className="Page__header1 Page__header1--light">{this.props.confirmationText}</p>
        <img src={icon_checkmark} className="Page__iconCheckmark" alt="icon_checkmark" />
        {/*<p className="Page__normalText Page__normalText--white">Lorem ipsum dolor sit amet, ea vim viris detraxit instructior. Vim liber iudico cetero an, ex vidit noluisse cum, ei nam nibh invidunt. Cum id erat regione integre. Per ei luptatum atomorum, an brute constituto conclusionemque sed.</p>*/}
        <br/><br/><br/>
        <button className="Page__nextButton AppTheme__largeButton AppTheme__largeButton--orange" onClick={this.props.onNextClick}>Return to babasmg.com</button>
      </div>
    );
  }
}

