import { calculateTrueStemReach, findAdjustedStemTotalLength } from '../utils/stem/stemMath';
import { drawLine } from '../utils/stem/stemDrawing';
import { convertLocationsToCoords, plotElByCoords } from '../utils/drawUtils';
import { convertMmToPercentages, convertMmToPixels } from '../utils/mathUtils';
import { getComputedStyle } from '../utils/styleUtils';

export default class Stem {
  constructor({ 
    angle = 0,
    backLength = 0,
    reach = 120,
    faceLength = 0,
    stackHeight = 0,
    exactHeight = 0,
    stem,
    debug,
  }) {
    // Nonadjustables
    this.backLength = backLength;
    this.faceLength = faceLength;
    this.stackHeight = stackHeight;
    this.exactHeight = exactHeight;
    // General Stem Settings
    this.angle = angle;
    this.reach = reach;
  	this.stack = 0;
    // Elements
    this.stem = stem;
    this.wrapper = stem.parentElement;
    this.svg = document.querySelector('svg.stem-coords');
    this.debug = debug;
    this.trueReach = '';
  }

  plotDebug() {
    const backCoords = this.debug.backStem;
    const frontCoords = this.debug.frontStem;


    const plotStemDebug = (stem, coords, className, direction, fragmentLength) => {
      const fragmentLengthPx = convertMmToPixels(fragmentLength) - 3;

      Object.keys(coords).forEach(coord => {
        const el = stem.querySelector(`.${className}-${coord}`);
        const objCoords = coords[coord];
        if (coord === 'center') {
          el.style[direction] = `${objCoords[0]}px`;
          el.style.top = `${objCoords[1]}px`;
        } else {
          el.style[direction] = `${fragmentLengthPx}px`;
          el.style[coord] = `${objCoords[1]}px`;
        }
      })
    }

    plotStemDebug(this.stem, backCoords, 'backstem', 'left', this.backLength);
    plotStemDebug(this.stem, frontCoords, 'frontstem', 'right', this.faceLength);

  }

  size() {
    // Bike stems are measured from the center of the clamp and center of the steerer.
    // This means that 100mm is actually measured from the inner, and the shaft itself
    // Would not be 100mm.
    // this.stem.style.maxWidth = `${totalLength}px`;
    const reachPx = convertMmToPixels(this.reach);
    const faceLengthPx = convertMmToPixels(this.faceLength);
    const backLengthPx = convertMmToPixels(this.backLength);
    const stackHeightPx = convertMmToPixels(this.stackHeight);
    const exactHeightPx = convertMmToPixels(this.exactHeight);
    this.wrapper.style.maxHeight = `${exactHeightPx}px`;
    this.stem.style.setProperty('--before-max-width', `${backLengthPx}px`);
    this.stem.style.setProperty('--before-max-height', `${stackHeightPx}px`);
    this.stem.style.setProperty('--after-max-width', `${faceLengthPx}px`);
    this.stem.style.setProperty('--after-max-height', `${exactHeightPx}px`);
    const trueReachPx = calculateTrueStemReach(this.stem, reachPx);
    this.trueReach = trueReachPx;
    this.wrapper.style.maxWidth  = `${faceLengthPx + backLengthPx + trueReachPx}px`;

    // this.svg.style.maxWidth = `${Math.ceil(totalLength - faceLengthPx - backLengthPx)}px`;
    return;
  }

  draw() {
    const backStemVerticalCenter = this.stem.querySelector('.vert-center.back-stem');
    plotElByCoords(this.stem, 0, 0);

    const getBoundingBoxCoords = (wrapper, el, angle) => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const centerX = elRect.left + elRect.width / 2 - wrapperRect.left;
      const centerY = elRect.top + elRect.height / 2 - wrapperRect.top;
      const angleRad = angle * Math.PI / 180;
      const cosAngle = Math.cos(angleRad);
      const sinAngle = Math.sin(angleRad);

      // Calculate the coordinates of the four corners of the bounding box relative to the wrapper container
      const x1 = centerX + (cosAngle * (elRect.left - wrapperRect.left - centerX)) - (sinAngle * (elRect.top - wrapperRect.top - centerY));
      const y1 = centerY + (sinAngle * (elRect.left - wrapperRect.left - centerX)) + (cosAngle * (elRect.top - wrapperRect.top - centerY));
      const x2 = centerX + (cosAngle * (elRect.right - wrapperRect.left - centerX)) - (sinAngle * (elRect.bottom - wrapperRect.top - centerY));
      const y2 = centerY + (sinAngle * (elRect.right - wrapperRect.left - centerX)) + (cosAngle * (elRect.bottom - wrapperRect.top - centerY));
      
      return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
    }

    const drawStemBodyLine = (wrapper, startCoords, endCoords) => {
      const svg = wrapper.querySelector('svg.stem-coords');
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", startCoords.x);
      line.setAttribute("y1", startCoords.y);
      line.setAttribute("x2", endCoords.x);
      line.setAttribute("y2", endCoords.y);
      line.setAttribute('class', 'stem-body-line');
      line.setAttribute("stroke", '#000');
      line.setAttribute("stroke-width", '2px');
      svg.appendChild(line);
    }

    const topPoints = [...this.stem.querySelectorAll('.top-point')];
    const bottomPoints = [...this.stem.querySelectorAll('.bottom-point')];
    const centerPoints = [...this.stem.querySelectorAll('.center-point')];


    if (this.angle !== 0) {
      const rotateStemByAngle = (stem, backStemPlots, angle) => {
        const inverseAngle = 360 - angle;
        stem.style.transformOrigin = 'left center';
        stem.style.transform = `translate(0, 0) rotate(${inverseAngle}deg)`;
        //rerotate stemback
        stem.style.setProperty('--before-transform', `rotate(${angle}deg)`);
        backStemPlots.style.transform = `translate(0, 0) rotate(${angle}deg)`;
      }
      const backStemPlots = this.stem.querySelector('.backstem-plots');
      rotateStemByAngle(this.stem, backStemPlots, this.angle)
    }

    const topPointStart = getBoundingBoxCoords(this.stem.parentElement, topPoints[0], this.angle);
    const topPointEnd = getBoundingBoxCoords(this.stem.parentElement, topPoints[1], this.angle);
    const bottomPointStart = getBoundingBoxCoords(this.stem.parentElement, bottomPoints[0], this.angle);
    const bottomPointEnd = getBoundingBoxCoords(this.stem.parentElement, bottomPoints[1], this.angle);
    const centerPointStart = getBoundingBoxCoords(this.stem.parentElement, centerPoints[0], this.angle);
    const centerPointEnd = getBoundingBoxCoords(this.stem.parentElement, centerPoints[1], this.angle);

    drawStemBodyLine(this.stem.parentElement, topPointStart, topPointEnd);
    drawStemBodyLine(this.stem.parentElement, bottomPointStart, bottomPointEnd);
    drawStemBodyLine(this.stem.parentElement, centerPointStart, centerPointEnd);




    // const sbOffset = this.stemBack.querySelector('.vertical-center').offsetLeft;
    // const centerLine = drawLine(this.stem, (this.reach), true);
    // console.log(centerLine)
    // plotElByCoords(centerLine, sbOffset, 0);


    // console.log(vert[0].getBoundingClientRect())
    // console.log(vert[1].getBoundingClientRect())

    // console.log(this.angle)
  //   const newYAxis = calcNewYAxisPosition(this.stemFront, this.angle);
  //   calcNewRotation(this.svg, this.stemFront, newYAxis);
    
  //   //center line
    // drawStemLine(this.svg, verticalCenters);

  //   //body lines
  //   drawStemLine(this.svg, this.stemTopPoints);
  //   drawStemLine(this.svg, this.stemBottomPoints);
  // }
  }

  clean() {
    const lines = [...this.svg.querySelectorAll('line')];
    lines.forEach(line => line.remove());
  }

}