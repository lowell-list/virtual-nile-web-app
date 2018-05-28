import React, {Component} from 'react';
import { Draggable } from 'react-touch';
import { Spring } from 'react-spring'
import NightLotusFlower from './NightLotusFlower';

export default class PageFlickFlower extends Component {

  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      springTranslateY: 0,
      flicked: false
    };

    this.pageElement = null;
    this.draggableTranslateY = 0;
  }

  render() {
    return (
      <div
        className="Page"
        ref={(element) => {
          if(element!=null && this.pageElement==null) { // only set the first time
            this.pageElement = element;
            this.pageElement.addEventListener('touchmove', (event) => event.preventDefault());
          }
        }}
      >
        <p className="Page__header1 Page__header1--blue">
          {this.props.screenName}, "FLICK" your lotus flower into the Virtual Nile
        </p>

        <Spring
          from={{ translateY: 0 }}
          to={{ translateY: this.state.springTranslateY }}
          onRest={(current) => this.onSpringRest(current)}
        >
          {styles =>
            <div style={{transform: `translate3d(0, ${styles.translateY}px, 0)`}}>
              <Draggable
                position={{translateY: 0}}
                onDragEnd={() => {
                  let newSpringTranslateY = -this.draggableTranslateY;
                  let deltaSpringTranslateY = newSpringTranslateY - this.state.springTranslateY;
                  let flicked = this.state.flicked;
                  if(deltaSpringTranslateY>0) {
                    newSpringTranslateY -= 600; // send it offscreen!
                    flicked = true;
                  }
                  this.setState({springTranslateY:newSpringTranslateY, flicked:flicked});
                }}
              >
                {({translateY}) => this.renderDraggable(translateY)}
              </Draggable>
            </div>
          }
        </Spring>

      </div>
    );
  }

  renderDraggable(translateY) {
    this.draggableTranslateY = translateY;
    return (
      <div style={{transform: `translate3d(0, ${translateY}px, 0)`}}>
        <NightLotusFlower colors={this.props.colors} />
      </div>
    )
  }

  onSpringRest(current) {
    if(this.state.flicked && current.translateY===this.state.springTranslateY) {
      this.props.onFlicked && this.props.onFlicked();
    }
  }
}
