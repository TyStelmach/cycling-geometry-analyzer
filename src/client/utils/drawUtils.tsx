import { convertMmToPixels } from './mathUtils';
import { applyStylesFromCoords } from './styleUtils.tsx'

export const createSvgLinesForStem = () => {
  const fragments = document.querySelectorAll('.stem .fragment');
  fragments.forEach(fragment => {
    console.log('hello')
  });
}

/**
 * Calculates where the point is within the grid (el.wrapper)
 * and plots ii's x and y axis values
 * @param point - HTML Element - The plot point on the component
 * @param line - HTML Element - The pre-generated SVG line
 * @param grid - HTML Element - The wrapper element
 */
export const drawFromPoint = (point: HTMLElement, line: HTMLElement, grid: HTMLElement) => {
  const pos = point.getBoundingClientRect();
  line.setAttribute('x1', pos.x + pos.width / 2);
  line.setAttribute('y1', pos.y + pos.height / 2 - grid.y);
}

/**
 * Calculates where the line should end within the grid (el.wrapper)
 * and plots ii's x and y axis values
 * @param point - HTML Element - The plot point on the component
 * @param line - HTML Element - The pre-generated SVG line
 * @param grid - HTML Element - The wrapper element
 */
export const drawToPoint = (point: HTMLElement, line: HTMLElement, grid: HTMLElement) => {
  const pos = point.getBoundingClientRect();
  line.setAttribute('x2', pos.x + pos.width);
  line.setAttribute('y2', pos.y + pos.height / 2 - grid.y);
}

/** Plots impotan point elements on the stem component based on config values
 * @param config - Object - The stem config data
 * @param side - String - The stem fragment you want to affect
 */
export const plotCoordsOnStemComponent = (coords: object, side: string) => {
  const centerEl = document.querySelector(`.stem-${side} .center-point`);
  const topEl = document.querySelector(`.stem-${side} .top-point`);
  const bottomEl = document.querySelector(`.stem-${side} .bottom-point`);

  // // TODO: Make this more reusable
  const centerCoords = coords[`${side}Center`];
  const topCoords = coords[`${side}Top`];
  const bottomCoords = coords[`${side}Bottom`];

  applyStylesFromCoords(centerCoords, centerEl);
  applyStylesFromCoords(topCoords, topEl);
  applyStylesFromCoords(bottomCoords, bottomEl);
};

/**
 * Sets the gap distance between the front and back of the stem component
 * This uses a converted mm to pixels, to approximate a size to real world length
 * Stems are measured ctc, so we are measuring 
 * @param length 
 */
export const setGapInStemComponent = (length: number) => {
  const pixelLength = convertMmToPixels(length);
  const appWidth = document.querySelector('#app')?.clientWidth;
  const gapPercentage = (pixelLength / appWidth) * 100;
  const fragmentContainer = document.querySelector('.stem-fragments');
  fragmentContainer.style.gap = `${gapPercentage}%`;
}

