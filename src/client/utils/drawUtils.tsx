/**
 * Calculates where the point is within the grid (el wrapper)
 * and plots ii's x and y axis values
 * @param point - HTML Element - The plot point on the component
 * @param line - HTML Element - The pre-generated SVG line
 * @param grid - HTML Element - The wrapper element
 */
const drawFromPoint = (point: HTMLElement, line: HTMLElement, grid: HTMLElement) => {
  const pos = point.getBoundingClientRect();
  line.setAttribute('x1', pos.x + pos.width / 2);
  line.setAttribute('y1', pos.y + pos.height / 2 - grid.y);
}

const drawToPoint = (point: HTMLElement, line: HTMLElement, grid: HTMLElement) => {
  const pos = point.getBoundingClientRect();
  line.setAttribute('x2', pos.x + pos.width);
  line.setAttribute('y2', pos.y + pos.height / 2 - grid.y);
}

module.exports = {
  drawFromPoint,
  drawToPoint,
}