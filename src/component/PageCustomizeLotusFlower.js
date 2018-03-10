import React from 'react';
import PageWithStatusBar from './PageWithStatusBar';
import PageStatusBar from './PageStatusBar';
import NightLotusFlower from './NightLotusFlower';
import InputWithButton from './InputWithButton';
import {randomElement} from '../util/Util';
import randomizer_icon from '.././img/randomizer_icon.png';
const R = require('ramda');

export default class PageCustomizeLotusFlower extends PageWithStatusBar {

  render() {
    return (
      <div className="Page">
        <p className="Page__header1 Page__header1--blue">Create your very own Lotus Flower</p>

        <NightLotusFlower colors={this.props.colors} />

        <div className="Page__fullWidthFlexContainer">
          <button className="Page__colorSelectButton" onClick={() => this.onPrimaryColorButtonClick()}>
            <div className="Page__colorSelectButton__title">Color</div>
            <div className="Page__colorSelectButton__content">1</div>
          </button>
          <button className="Page__colorSelectButton" onClick={() => this.onSecondaryColorButtonClick()}>
            <div className="Page__colorSelectButton__title">Color</div>
            <div className="Page__colorSelectButton__content">2</div>
          </button>
          <button className="Page__colorSelectButton" onClick={() => this.onRandomizerButtonClick()}>
            <div className="Page__colorSelectButton__title">Randomizer</div>
            <div className="Page__colorSelectButton__content">
              <img src={randomizer_icon} style={{maxHeight: "30px", display: 'flex'}} alt="randomizer icon" />
            </div>
          </button>
        </div>

        <InputWithButton
          value={this.props.colors.primary}
          onFocus={() => this.onInputFocus() }
          onBlur={(value) => { this.onInputBlur(); this.onInputPrimaryColor(value); } }
        />
        <InputWithButton
          value={this.props.colors.secondary}
          onFocus={() => this.onInputFocus() }
          onBlur={(value) => { this.onInputBlur(); this.onInputSecondaryColor(value); } }
        />

        <br/>
        <br/>
        <br/>

        <PageStatusBar
          visible={this.state.isPageStatusBarVisible}
          nextEnabled={this.props.nextEnabled}
          onPreviousClick={this.props.onPreviousClick}
          onNextClick={this.props.onNextClick}
        />
      </div>
    );
  }

  onPrimaryColorButtonClick() {
    this.changeColors({primary: randomElement(this.props.primaryColors)});
  }

  onSecondaryColorButtonClick() {
    this.changeColors({secondary: randomElement(this.props.secondaryColors)});
  }

  onRandomizerButtonClick() {
    this.changeColors({
      primary: randomElement(this.props.primaryColors),
      secondary: randomElement(this.props.secondaryColors),
    });
  }

  onInputFocus() {
    this.setPageStatusBarVisible(false);
  }

  onInputBlur() {
    this.setPageStatusBarVisible(true,500);
  }

  onInputPrimaryColor(value) {
    if(this.isValidColorString(value)) { this.changeColors({primary: value}) }
  }

  onInputSecondaryColor(value) {
    if(this.isValidColorString(value)) { this.changeColors({secondary: value}) }
  }

  /**
   * Trigger a color change, using any new color values defined in newColors.
   */
  changeColors(newColors) {
    this.props.onChangeColors(Object.assign({},this.props.colors,newColors));
  }

  /**
   * @return true if color string is valid, i.e. '#FF0031'
   */
  isValidColorString(value) {
    return (R.is(String,value) && !R.isEmpty(value) && /^#[0-9a-fA-F]{6}$/.test(value));
  }
}