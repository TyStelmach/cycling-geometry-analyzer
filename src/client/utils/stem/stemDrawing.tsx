import { convertLocationsToCoords } from '../drawUtils';

/** Creates an SVG line and appends it to the grid's svg. 
 * The line is created with coords that will draw it directly from 
 * a start point, to and end points ('.center-point')
 * @param grid - HTML Element, the stem container
 */
export const drawStemCenterLine = (svg, centerPoints) => {
  const {x, y} = svg.getBoundingClientRect();
  const centerLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  centerLine.setAttribute('id', 'stem-shaft-centerline')
  svg.appendChild(centerLine);
	
  // Set the x1, x2, y1, y2 of an SVG Line
  for (let i = 0; i < centerPoints.length; i++) {
  	const position = centerPoints[i].getBoundingClientRect();
    console.log('pos', position, x, y)
 		centerLine.setAttribute(`x${i+1}`, position.x + position.width/2 - x); //SVG X
  	centerLine.setAttribute(`y${i+1}`, position.y + position.height/2 - y); // SVG Y
  }
}

/** Creates an SVG polygon and appends it to the grid's svg. 
 * The polgygon is drawn with the coordinates gathered from the 
 * 'top-point' and 'bottom-point' elements graphed to the stem drawings
 * @param grid - HTML Element, the stem container
 */
export const drawStemPolygon = (grid, svg, bodyPoints) => {
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  const coords = convertLocationsToCoords(svg, bodyPoints);
  polygon.setAttribute('viewbox', '0 0 100% 100%');
  polygon.setAttribute('id', 'stem-shaft-drawing')
  svg.appendChild(polygon);

  coords.forEach(point => {
  	const svgPoint = svg.createSVGPoint();
    svgPoint.x = point.x;
    svgPoint.y = point.y;
  	polygon.points.appendItem(svgPoint);
  });
}