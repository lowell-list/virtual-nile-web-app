import React, {Component} from 'react';
import babas_logo from '.././img/babas_logo.png';

export default class PageFlickFlower extends Component {

  render() {
    return (
      <div className="Page">
        <img src={babas_logo} className="Page__babasLogo" alt="babas_logo" />
        <p className="Page__header1 Page__header1--blue">Let's flick that flower!</p>
      </div>
    );
  }
}
