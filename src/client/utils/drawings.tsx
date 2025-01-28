import { UpdateObjectFunction, UpdateFieldFunction, StemStateObjProps, XYCoordinateProps, FrameStateObjProps, ElementType } from '../../types';
import { NewStem, NewFrame, StemColors } from '../configs/defaults';
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
  while (totalHeight >= 20) {
    spacers.push(20);
    totalHeight -= 20;
  }

  // Add a large spacer (10mm) if possible
  if (totalHeight >= 10) {
    spacers.push(10);
    totalHeight -= 10;
  }

  // Add medium spacers (5mm)
  while (totalHeight >= 5) {
    spacers.push(5);
    totalHeight -= 5;
  }

  // Add a small spacer (3mm) if possible
  if (totalHeight >= 3) {
    spacers.push(3);
    totalHeight -= 3;
  }

  // Fill remaining stack height with x-small spacers (1mm)
  while (totalHeight > 0) {
    spacers.push(1);
    totalHeight -= 1;
  }

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

/**
 * Function for initializing new elements to the workspace (frames or stems)
 * @param type - String - the type of element to create ('frame' or 'stem')
 * @param items - StemStateObjProps[] | FrameStateObjProps[] - the current elements in the state
 * @param updateObject - UpdaterFunction - Add a new object to the item's array
 */
export const initializeNewElement = <T extends StemStateObjProps | FrameStateObjProps>(
  type: ElementType,
  items: T[],
  updateObject: (item: T) => void,
) => {
  const itemDefault = type === 'frame' ? NewFrame : NewStem;
  const newItem = {
    ...itemDefault,
    id: `${type}-${items.length}`,
  } as T;

  if (type === 'frame') {
    // Only set the first frame to active
    (newItem as FrameStateObjProps).active = items.length === 0;
  }

  if (type === 'stem') {
    (newItem as StemStateObjProps).color = items.length === 0 
      ? StemColors.single 
      : StemColors.multiple[items.length];
  }
 
  updateObject(newItem);
}

export const removeExistingStem = (
  stemId: string,
  removeObject: (id: string | number) => void
) => removeObject(stemId);

/**
 * Updates the perceived line-work color for the drawn stems based on the number
 * of Stems drawn to the workspace
 * 1 stem - black linework
 * 2 stems - 1 red, 1 blue linework
 * 3 stems - 1 red, 1 blue, 1 green linework
 * @param stems - StemStateObjProps[] - the current stems in the State
 * @param updateField - UpdaterFunction - Using the stem's id, update an individual field
 */
export const updateStemColors = (
  stems: StemStateObjProps[],
  updateField: UpdateFieldFunction<StemStateObjProps>,
) => {
  if (!stems.length) return;

  if (stems.length === 1) {
    updateField(stems[0].id, 'color', StemColors.single);
  } else {
    stems.forEach((stem, index) => {
      const predictedColor = StemColors.multiple[index];
      if (stem.color !== predictedColor) updateField(stem.id, 'color', predictedColor);
    });
  }
}

export const getStemTheme = (totalStems: number, index: number): string => {
  const themeMap: Record<number, string> = {
    0: 'theme-red',
    1: 'theme-blue',
    2: 'theme-green'
  };

  return totalStems > 1 ? themeMap[index] : 'theme-default';
};

/**
 * Toggles the 'active' frame on the workspace by setting false to all elements in the array
 */
export const toggleFrameAngles = (
  frames: FrameStateObjProps[],
  clickedFrame: string,
  updateField: UpdateFieldFunction<FrameStateObjProps>,
) => {
  // Deactivate current active frame
  const activeFrame = frames.find(frame => frame.active);
  if (activeFrame) updateField(activeFrame.id, 'active', false);
  
  // Small delay before activating new frame
  setTimeout(() => {
    updateField(clickedFrame, 'active', true);
  }, 0);
}