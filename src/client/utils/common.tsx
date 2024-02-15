/**
 * Gets the x,y coordinates of the center of a single element
 * @param el HTML Element, the element to get the center of 
 * @returns x, y  coordinates as an object
 */
export const getElCenter = (el) => {
  const {top, left, width, height} = el.getBoundingClientRect();
	return {
     x: left + width / 2,
     y: top + height / 2
   };
};

/**
 * Calculate the distance between two elements, supplied as an Arr
 * @param el1 HTML Element
 * @param el2 HTML Element
 * @returns the hypoteneuse of the x, y coords from each element
 */
 export const distanceBetweenEls = (el1, el2) => {
  // Array of center coordinates for each element
	const elMatrix = [getElCenter(el1), getElCenter(el2)];
  return Math.hypot(elMatrix[0].x - elMatrix[1].x, elMatrix[0].y - elMatrix[1].y);
}

/**
 * Sets a maximum width by percentage or maximum height by pixels
 * @param el HTML Element
 * @param maxWidth - Int, the maxWidth in percentage
 * @param maxHeight - Int, the maxHeight in percentage
 *  */
export const setMaxWidthForEl = (el, maxWidth) => {
  el.style.maxWidth = `${maxWidth}%`;
  el.style.width = '100%'
}

/**
 * Sets a maximum width by percentage or maximum height by pixels
 * @param el HTML Element
 * @param maxWidth - Int, the maxWidth in percentage
 * @param maxHeight - Int, the maxHeight in percentage
 *  */
 export const setMaxHeightForEl = (el, maxHeight) => {
  el.style.maxHeight = `${maxHeight}px`;
  el.style.height = '100%'
}