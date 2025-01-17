import { XYCoordinateProps, TransformationProps } from "../../types";

/**
 * Calculates the new position of a point after applying a scaling and rotation transformation.
 *
 * @param {number} centerX - The X-coordinate of the center point of rotation axis
 * @param {number} centerY - The Y-coordinate of the center point of rotation axis
 * @param {number} coordX - The X-coordinate of the point to be transformed (before scaling and rotation).
 * @param {number} coordY - The Y-coordinate of the point to be transformed (before scaling and rotation).
 * @param {number} angle - The angle to rotate the point around it's matching center point in degrees.
 * @param {number} scale - The grid ratio at which all calculations will be scaled
 * 
 * @returns {Object} The transformed coordinates of the point.
 * @returns {number} return.x - The new X-coordinate of the point after scaling and rotation.
 * @returns {number} return.y - The new Y-coordinate of the point after scaling and rotation.
 */
export const getRotatedPoint = (
  centerX: number,
  centerY: number,
  coordX: number,
  coordY: number,
  angle: number,
  scale: number
): XYCoordinateProps => {
  const scaledXCoord = coordX * scale;
  const scaledYCoord = coordY * scale;

  const radians = (angle * Math.PI) / 100;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return {
    x: centerX + (scaledXCoord * cos - scaledYCoord * sin),
    y: centerY + (scaledXCoord * sin + scaledYCoord * cos)
  }
};

export const parseTransformationCoords = (
  transform: string
): TransformationProps | null => {
  const match = transform.match(/rotate\(([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\)/);
  if (match) {
    return {
      angle: parseFloat(match[1]),
      centerX: parseFloat(match[2]),
      centerY: parseFloat(match[3])
    };
  }
  
  return null;
}

export const applyTransformationCoords = (
  point: XYCoordinateProps,
  transformations: TransformationProps, 
  ): XYCoordinateProps => {
  const { angle, centerX, centerY } = transformations;
  const dx = point.x - centerX;
  const dy = point.y - centerY;
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return {
    x: centerX + (dx * cos - dy * sin),
    y: centerY + (dx * sin + dy * cos)
  };
};
