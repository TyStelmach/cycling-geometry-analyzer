type ConversionFunction = (mm: number) => number;

/**
 * Converts a mm value into pixels, to help approximate sizes on screen
 * @param mm - Number - the mm number to convert
 * @returns approximate px value
 */
export const convertMmToPixels = (mm: number, ratio: number = 3) => mm * ratio;

/**
 * Calculates the horizontal reach of a stem based on it's length and angle
 * 
 * This function creates a horizontal projection of a stem's reach when at an angle
 * It assumes the stem is extending from the center point, while determining it's
 * reach by the length of the horizontal plane that is created.
 * @param (number) length - Length of the stem in the workspace (in mm)
 * @param (number) angleInDegrees - Angle of the stem in the workspace (in degrees)
 * @returns (number) the horizontal reach length of the stem.
 */
export const calculateStemReach = (length: number, angleInDegrees: number) => {
  const angleInRadius = (angleInDegrees * Math.PI) / 180;
  return Math.cos(angleInRadius) * length;
};

/**
 * Calculates the x,y coordinates of the stem steerer clamp when spacers are added to the workspace
 * @param (number) stackHeight - The height of spacers to add to the workspace (in mm)
 * @param (number) headtubeAngle  - The angle of the frame's headtube (in degrees)
 * @param (number) convertMmToPixels - The conversion funcion for mm to px
 * @returns (Object) {x, y} coordinates of the projected offset to apply in the workspace
 */

export const calculateStackOffset = (
  stackHeight: number, 
  headtubeAngle: number, 
) => {
  const angleInRadius = ((90 - headtubeAngle) * Math.PI / 100);
  const offset = convertMmToPixels(stackHeight);

  return {
    x: -(Math.sin(angleInRadius) * offset),
    y: -(Math.cos(angleInRadius) * offset)
  };
};

/**
 * Calculates he amount of spacers of a specific size is needed to reach projected height
 * @param (number) size - The size of a spacer
 * @param (number) height - the total project stack height
 * @returns number[] - Array of spacers needed to reach stack height
 */
export const getSpacersForSize = (size: number, height: number): number[] => {
  const count = Math.floor(height / size);
  return new Array(count).fill(size);
};

/**
 * Calculates the coordinate positioning for the debug points. These points are used
 * As reference points when creating projected drawings based off the supplied variables
 * @param (Object) stem - the stem state object to draw
 * @param (number) gridCenter - the centerpoint of the cartesian grid
 * @returns (Object) The various coordinates needed to map a stem in the workspace 
 */
export const calculateStemCoords = (
  stem,
  gridCenter: number,
) => {
  const stemReach = calculateStemReach(stem.length, stem.angle);
  const stemAngleInRadius = (stem.angle * Math.PI) / 180;
  const stemStack = Math.sin(stemAngleInRadius) * stem.length;
  const stemHeight = convertMmToPixels(10);

  const stemCollarCenterLine = {
    x: gridCenter - convertMmToPixels(stem.length)/2,
    y: gridCenter
  }

  const stemFaceCenterLine = {
    x: stemCollarCenterLine.x + convertMmToPixels(stemReach),
    y: stemCollarCenterLine.y - convertMmToPixels(stemStack),
  }

  return {
    collar: {
      center: stemCollarCenterLine,
      top: { x: stemCollarCenterLine.x, y: stemCollarCenterLine.y - stemHeight },
      bottom: { x: stemCollarCenterLine.x, y: stemCollarCenterLine.y + stemHeight },
    },
    face: {
      center: stemFaceCenterLine,
      top: { x: stemFaceCenterLine.x, y: stemFaceCenterLine.y - stemHeight },
      bottom: { x: stemFaceCenterLine.x, y: stemFaceCenterLine.y + stemHeight },
    },
    stemReach
  }
}