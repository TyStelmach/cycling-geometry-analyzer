
/** Function that takes an array of eleemnts, and converts them
 * into a seperate array of their X, Y coordinates
 * @param grid - HTML Element, the stem container
 * @param points Array, the points you want to sort and convert
 * @returns Array, the sorted coordinates array by angle of appearance in doc
 */
export const convertLocationsToCoords = (grid, points) => {
  const container = grid.getBoundingClientRect();
  const center = { x: container.width / 2, y: container.height / 2 };
  const coords = points.map(point => {
    const { x, y, width, height } = point.getBoundingClientRect();
    const centerX = x + width / 2 - container.x;
    const centerY = y + height / 2 - container.y;
    const angle = Math.atan2(centerY - center.y, centerX - center.x);
    const distance = Math.sqrt(Math.pow(centerX - center.x, 2) + Math.pow(centerY - center.y, 2));
    return { x: centerX, y: centerY, angle, distance };
  });
 
  return coords.sort((a, b) => a.angle - b.angle);
}

export const setCartesianOrigin = (svg, width, height, interval) => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  // Draw horizontal lines
  for (let y = -halfHeight; y <= halfHeight; y += interval) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", y);
    line.setAttribute("x2", width);
    line.setAttribute("y2", y);
    line.classList.add("grid-line");
    svg.appendChild(line);
  }

  // Draw vertical line at x=0
  const verticalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  verticalLine.setAttribute("x1", 0);
  verticalLine.setAttribute("y1", -halfHeight);
  verticalLine.setAttribute("x2", 0);
  verticalLine.setAttribute("y2", halfHeight);
  verticalLine.classList.add("grid-line");
  svg.appendChild(verticalLine);
};

export const plotElByCoords = (element, x, y) => {
  const svg = document.querySelector('.stem-coords');
  const width = svg.clientWidth;
  const height = svg.clientHeight;
  
  // Calculate the adjusted coordinates
  const centerX = 0;
  const centerY = height / 2;
  const adjustedX = x + centerX;
  const adjustedY = centerY - y - (element.offsetHeight / 2);

  element.style.top = `${adjustedY}px`
  element.style.left = `${adjustedX}px`
}