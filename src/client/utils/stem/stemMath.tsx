import { convertMmToPercentages } from '../mathUtils'

/** Calculates and appliesthe y-axis value the stem half will need to 
 * reposition in order to create a centerline at the designerd angle (deg)
 * @param stemHalf - HTML Element, the half of the stem to affect
 * @param angle - Int, the angle to move the stem body to
 */
export const calcNewYAxisPosition = (stemHalf, angle) => {
  const plot = stemHalf.querySelector('.stem-plot');
  const height = stemHalf.offsetHeight;
  const newYAxisVal = Math.abs(height / 2 * Math.tan(angle * Math.PI / 180));
  plot.style.top = angle > 0 ? `-${newYAxisVal}px` : `${newYAxisVal}px`;
  return angle > 0 ? `-${newYAxisVal}` : newYAxisVal;
}

export const calcNewRotation = (svg, diagram, yAxis) => {
  const distance = svg.clientWidth;
  const rotation = Math.atan2(yAxis, distance) * (180 / Math.PI);
  diagram.style.transform = (`rotate(${rotation}deg)`)
}

/** Calculates the current angle of the stem based on it's 2 center points
 * @param grid - HTML Element, the stem container
 * @returns angle - the Angle of the line drawn between 2 centerpoints
 */
export const calcAngleOfStem = (grid) => {
  const points = grid.querySelectorAll('.center-point');
  const pointCoords = [...points].map(point => {
  	const position = point.getBoundingClientRect();
    return {
    	x: position.left + position.width / 2,
    	y: (-position.top) + (-position.height) / 2
    }
  });

  const dx = pointCoords[1].x - pointCoords[0].x;
  const dy = pointCoords[1].y - pointCoords[0].y;
  let angleRad = Math.atan2(dy, dx);
  let angleDeg = angleRad * 180 / Math.PI;
  
  return (Math.sign(angleDeg) * Math.ceil(Math.abs(angleDeg)));
}

export const adjustForCTCMeasuring = (shaftLength, faceLength, backLength) => {
  const faceCenter = faceLength / 2;
  const backCenter = backLength / 2;
  const shaftCenter = shaftLength - faceCenter - backCenter;
  return shaftCenter;
}

export const calcStemHalfSize = (grid, stemHalf, length) => {
  const percentage = convertMmToPercentages(length, grid);
}

export const findAdjustedStemTotalLength = (faceLength, backLength, shaftLength) => {
  const faceCenter = faceLength / 2;
  const backCenter = backLength / 2;
  const shaftCenter = shaftLength - faceCenter - backCenter;
  // console.log(Math.floor(faceLength + backLength + shaftCenter))
  return (faceLength + backLength + shaftCenter);
}