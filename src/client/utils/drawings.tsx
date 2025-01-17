import { XYCoordinateProps } from '../../types';
import { getSpacersForSize } from './calculations';

/**
 * Draw spacers on to the workspace stem based on the available stack height
 * 
 * Incrementally looks at the totalHeight and determines the lease amount of spacers
 * needed to reach, starting with the max X-Large 20mm. This ensure the workspace
 * does not get cluttered with 15x 1mm spacers, and provides a much cleaner understanding
 * of stackheight and offset.
 * @param (number) totalHeight - The stackheight in the workspace (in mm)
 * @returns number[] - Spacers required sorted in descending order
 */
export const drawSpacersOnScreen = (totalHeight: number): number[] => {
  const spacers: number[] = [];

  // Add as many x-large (max) spacers to the stack (20mm)
  if (totalHeight >=  20) {
    const count = Math.floor(totalHeight / 20);
    spacers.push(...new Array(count).fill(20));
    totalHeight -= count * 20;
  }

  // Determine if any large spacers can be added (10mm)
  if (totalHeight === 10) {
    spacers.push(10);
    totalHeight -= 10;
  }

  // Determine if any medium spacers can be added (5mm)
  spacers.push(...getSpacersForSize(5, totalHeight));
  totalHeight %= 5;

  // Determine if any small spacers can be added (3mm)
  if (totalHeight >= 3 && !spacers.includes(3)) {
    spacers.push(3);
    totalHeight -= 3;
  }

  // Fill remaining stack height with x-small spacers (1mm)
  spacers.push(...new Array(totalHeight).fill(1));

  return spacers.sort((a, b) => a - b);
};

/**
 * Applies a slight Bézier curve to the conneciton points of the stem body when the angle
 * becomes extreme. This smooths out the connection point on the stem collar.
 * 
 * Applies slight different curve intensities based on stem angle
 * 
 * @param start - Object({x,y}) - The Start coordinates of the body line
 * @param end - Object({x,y}) - The End coordinates of the body line
 * @param angle - Number - The angle of the stem
 * @returns String - the SVG coordinate string for the Bézier curve
 */
export const drawBezierCurveConnection = (start: XYCoordinateProps, end: XYCoordinateProps, angle: number) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angleOfLine = Math.atan2(dy, dx);
  let controlDistance = 0;
  let cp1 = {
    x: start.x + Math.cos(angleOfLine) * controlDistance * 0.75, // Half distance for start control point
    y: start.y + Math.sin(angleOfLine) * controlDistance * -0.25
  };

  if (angle > -7 && angle < 7) {
    return `M ${start.x},${start.y} L ${end.x},${end.y}`;
  }

  if (angle < -7 || angle > 7) {
    controlDistance = Math.abs(dx) * 0.25; // Try 15% instead of 25%
    cp1.x = start.x + Math.cos(angleOfLine) * controlDistance * 0.5;
    cp1.y = start.y + Math.sin(angleOfLine) * controlDistance * -0.25
  };

  if (angle < -30 || angle > 30) {
    controlDistance = Math.abs(dx) * 0.25;
    cp1.x = start.x + Math.cos(angleOfLine) * controlDistance * 0.85;
    cp1.y = start.y + Math.sin(angleOfLine) * controlDistance * -0.25
  };
  
  const cp2 = {
    x: end.x - Math.cos(angleOfLine) * controlDistance,
    y: end.y - Math.sin(angleOfLine) * controlDistance
  };
  
  return `M ${start.x},${start.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${end.x},${end.y}`;
};