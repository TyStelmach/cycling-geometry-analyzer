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