import React, {Component} from 'react';
import NightLotusFlower from './NightLotusFlower';

export default class PageFlickFlower extends Component {

  render() {
    return (
      <div className="Page">
        <p className="Page__header1 Page__header1--blue">
          {this.props.screenName}, "FLICK" your lotus flower into the Virtual Nile
        </p>
        <NightLotusFlower colors={this.props.colors} />
      </div>
    );
  }
}
