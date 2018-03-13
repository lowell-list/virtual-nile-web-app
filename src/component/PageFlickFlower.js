import React, {Component} from 'react';
import { Draggable } from 'react-touch';
import NightLotusFlower from './NightLotusFlower';

export default class PageFlickFlower extends Component {

  render() {
    return (
      <div className="Page"
           ref={(element) => {
             element.addEventListener('touchmove', function(e) {
               e.preventDefault();
             }, false);
           }}
      >
        <p className="Page__header1 Page__header1--blue">
          {this.props.screenName}, "FLICK" your lotus flower into the Virtual Nile
        </p>

        <Draggable position={{translateX: 0, translateY: 0}}>
          {({translateX, translateY}) => {
            console.log('translation: ' + translateX + ',' + translateY);
            return (
              <div style={{transform: `translate3d(0, ${translateY}px, 0)`}}>
                <NightLotusFlower colors={this.props.colors} />
              </div>
            );
          }}
        </Draggable>

      </div>
    );
  }
}
