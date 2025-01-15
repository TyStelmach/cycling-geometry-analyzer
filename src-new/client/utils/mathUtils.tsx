/**
 * Converts a mm value into pixels, to help approximate sizes on screen
 * @param mm - Number - the mm number to convert
 * @returns approximate px value
 */
export const convertMmToPixels = (mm: number, ratio: number) => mm * ratio;