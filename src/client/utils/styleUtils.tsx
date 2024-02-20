/**
 * Ingests coordinates from a config object and updates styles to the supplied element
 * @param coords - Object from config
 * @param el - Element that you want to adjust styles to
 */
export const applyStylesFromCoords = (coords: object, el: HTMLElement) => {
  Object.keys(coords).forEach(o => {
    if (o.value !== null) {
      el.style.setProperty(o, `${coords[o]}%`);
    }
  })
}

export const getComputedStyle = (el, style, pseudo = '') => {
  const computedStyle = window.getComputedStyle(el, pseudo);
  return parseInt(computedStyle.getPropertyValue(style), 10);
}