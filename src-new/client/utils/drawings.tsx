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
export const drawSpacersOnScreen = (totalHeight: number) => {
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

  return spacers.sort((a, b) => b - a);
}