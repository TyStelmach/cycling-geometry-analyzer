
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