import { calcNewYAxisPosition, calcNewRotation, findAdjustedStemTotalLength } from '../utils/stem/stemMath';
import { drawStemCenterLine, drawStemPolygon, } from '../utils/stem/stemDrawing';
import { convertLocationsToCoords } from '../utils/drawUtils';
import { convertMmToPercentages, convertMmToPixels } from '../utils/mathUtils';
import { setMaxWidthForEl, setMaxHeightForEl } from '../utils/common';

export default class Stem {
  constructor({ 
    angle = 0,
    backLength = 0,
    shaftLength = 120,
    faceLength = 0,
    stackHeight = 0,
    exactHeight = 0,
    grid,
  }) {
    // Nonadjustables
    this.backLength = backLength;
    this.faceLength = faceLength;
    this.stackHeight = stackHeight;
    this.exactHeight = exactHeight;
    // General Stem Settings
    this.angle = angle;
    this.shaftLength = shaftLength;
  	this.stack = 0;
    // Elements
    this.grid = grid;
  	this.svg = this.grid.querySelector('svg.stem-coords');
    this.stemBack = this.grid.querySelector('.stem-back');
    this.backDiagram = this.stemBack.querySelector('img');
    this.stemFront = this.grid.querySelector('.stem-front');
    this.frontDiagram = this.stemFront.querySelector('img');
    this.stemTopPoints = [...this.grid.querySelectorAll('.plot-point.top-point')];
    this.stemCenterPoints = [...this.grid.querySelectorAll('.plot-point.center-point')];
    this.stemBottomPoints = [...this.grid.querySelectorAll('.plot-point.bottom-point')];
  }

  size() {
    // Bike stems are measured from the center of the clamp and center of the steerer.
    // This means that 100mm is actually measured from the inner, and the shaft itself
    // Would not be 100mm.
    const totalLength = convertMmToPixels(findAdjustedStemTotalLength(this.faceLength, this.backLength, this.shaftLength));

    this.grid.style.maxWidth = `${totalLength}px`;
    const faceLengthPx = convertMmToPixels(this.faceLength);
    const backLengthPx = convertMmToPixels(this.backLength);
    const stackHeightPx = convertMmToPixels(this.stackHeight);
    const exactHeightPx = convertMmToPixels(this.exactHeight);
    const shaftLengthPx = convertMmToPixels(this.shaftLength);
    this.stemBack.style.maxWidth = `${backLengthPx}px`;
    this.backDiagram.style.maxHeight = `${stackHeightPx}px`;
    this.frontDiagram.style.maxHeight = `${exactHeightPx}px`;
    this.stemFront.style.maxWidth = `${faceLengthPx}px`;
    this.svg.style.maxWidth = `${totalLength - faceLengthPx - backLengthPx}px`;
    return;
  }

  plot() {

  }

  draw() {
    // console.log(this.angle)
    const newYAxis = calcNewYAxisPosition(this.stemFront, this.angle);
    // calcNewRotation(this.svg, this.frontDiagram, newYAxis);
    drawStemCenterLine(this.grid, this.svg, this.stemCenterPoints);
    drawStemPolygon(this.grid, this.svg, [...this.stemTopPoints, ...this.stemBottomPoints]);
  }

  clean(polygon, line) {
    if (polygon) polygon.remove();
    if (line) line.remove();
  }

}