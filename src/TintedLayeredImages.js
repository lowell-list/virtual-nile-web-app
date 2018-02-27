import React from "react";
const R = require('ramda');

export default class TintedLayeredImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allImagesLoaded: false,
    };
    this.loadImagesFromProps(props);
  }

  /**
   * Load all images defined in props.images; put the result in this.imageProperties
   */
  loadImagesFromProps(props) {

    // cleanup if images already loaded: prevent unwanted onload() calls from disposed elements
    if(R.is(Array,this.imageProperties)) {
      for(let imgprp of this.imageProperties) {
        if(R.is(Image,imgprp.image)) { imgprp.image.onload = null; }
      }
    }

    // array of image property objects, one for each image
    this.imageProperties = [];
    this.loadedImagesCount = 0;

    for(let orgimgprp of props.images) {                          // orgimgprp = original image properties
      let imgobj = new Image();
      let imgprp = Object.assign({image: imgobj},orgimgprp);
      this.imageProperties.push(imgprp);
      imgobj.onload = this.onImageLoaded.bind(this);
      imgobj.src = orgimgprp.src;                                 // assigning src starts image loading
    }
  }

  onImageLoaded() {
    this.loadedImagesCount++;
    if(this.imageProperties.length === this.loadedImagesCount) {
      this.setState({allImagesLoaded: true}); // setting state triggers re-render
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({allImagesLoaded: false});
    this.loadImagesFromProps(nextProps);
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

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    // do not continue if not ready yet
    if(!this.state.allImagesLoaded || this.canvasElement==null) { return; }

    // get canvas context and clear the canvas
    const cvsctx = this.canvasElement.getContext('2d'); // canvas drawing context
    cvsctx.clearRect(0,0,cvsctx.canvas.width,cvsctx.canvas.height);

    // draw all images onto canvas
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

}
