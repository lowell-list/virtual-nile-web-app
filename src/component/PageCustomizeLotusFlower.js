import React from 'react';
import PageWithStatusBar from './PageWithStatusBar';
import PageStatusBar from './PageStatusBar';
import TintedLayeredImages from './TintedLayeredImages';
import InputWithButton from './InputWithButton';
import {randomElement} from '../util/Util';
import randomizer_icon from '.././img/randomizer_icon.png';
import nc_00_water_glow from '.././img/night_candle/nc_00_water_glow.png';
import nc_10_shadow_lit from '.././img/night_candle/nc_10_shadow_lit.png';
import nc_21_outer_flower_lit from '.././img/night_candle/nc_21_outer_flower_lit.png';
import nc_31_inner_flower_lit from '.././img/night_candle/nc_31_inner_flower_lit.png';
import nc_41_candle_lit from '.././img/night_candle/nc_41_candle_lit.png';
import nc_45_candle_flame from '.././img/night_candle/nc_45_candle_flame.png';
import nc_46_candle_glow from '.././img/night_candle/nc_46_candle_glow.png';
import nc_50_glow from '.././img/night_candle/nc_50_glow.png';
import nc_61_outer_flower_front_lit from '.././img/night_candle/nc_61_outer_flower_front_lit.png';
const R = require('ramda');

export default class PageCustomizeLotusFlower extends PageWithStatusBar {

  render() {
    return (
      <div className="Page">
        <p className="Page__header1 Page__header1--blue">Create your very own Lotus Flower</p>

        <TintedLayeredImages
          canvasStyle={{width: '100%'}}
          canvasWidth={750} canvasHeight={450}
          images={
            [
              {src: nc_50_glow},
              {src: nc_00_water_glow},
              {src: nc_10_shadow_lit},
              {src: nc_21_outer_flower_lit, tint: this.props.colors.secondary},
              {src: nc_31_inner_flower_lit, tint: this.props.colors.primary},
              {src: nc_41_candle_lit},
              {src: nc_45_candle_flame},
              {src: nc_46_candle_glow},
              {src: nc_61_outer_flower_front_lit},
            ]
          }
        />

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