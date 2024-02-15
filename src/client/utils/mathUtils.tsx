/**
 * Converts a mm value into pixels, to help approximate sizes on the web
 * 2.54cm * 10 (10mm in 1cm) = 25.4mm (1in)
 * 96 px in 1in
 * 1mm = (96px / 25.4)
 * @param value - Number - mm you want to convert
 * @returns rounded approximate px value
 */
export const convertMmToPixels = (value: number) => {
  const pixelsPerInch = 96;
  return Math.floor(value * (pixelsPerInch / 25.4));
};

export const convertMmToPercentages = (container, value: number) => {
  const pixels = convertMmToPixels(value);
  const containerWidth = container.clientWidth;
  console.log('cont', containerWidth)
  return (pixels / containerWidth) * 100;
}

/**
 * Calculates the angle of a line, based on 2 points
 * @param points - Array, the HTML elements where the line meets
 * @returns Int - The degree/angle that the line is drawn
 */
export const calculateAngleOfLine = (points) => {
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
