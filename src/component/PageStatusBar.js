import React, {Component} from 'react';
import '../style/Page.css';

export default class PageStatusBar extends Component {
  render() {
    if(!this.props.visible) {
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
            onClick={this.props.onPreviousClick}
          >
            ∧
          </button>
          <button
            className="Page__statusBar__buttons__button"
            onClick={this.props.onNextClick}
            disabled={!this.props.nextEnabled}
          >
            ∨
          </button>
        </div>
      </div>
    )
  }
}
