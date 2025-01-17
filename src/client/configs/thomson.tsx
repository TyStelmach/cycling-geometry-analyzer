import { StemConfigProps } from "../../types";

const Thomson: StemConfigProps = {
  name: 'Thomson Elite X4',
  exactLength: 165,
  exactHeight: 54,
  faceLength: 38.1,
  collarLength: 50.8,
  faceDepth: 21,
  shaftLength: 120,
  stackHeight: 30.7,
  angle: 0,
  diagrams: {
    face: {
      path: '/diagrams/thomsonElite-front.svg',
      width: 400,  // actual SVG dimensions
      height: 400,
      connections: {
        top: { x: -18.5, y: -14.5 },    // percentages from top-left
        bottom: { x: -18.5, y: 14.5 },
        floor: { x: 0, y: 21 }
      }
    },
    collar: {
      path: '/diagrams/thomsonElite-back.svg',
      width: 300,  // actual SVG dimensions
      height: 300,
      connections: {
        top: { x: 22.5, y: -18.75 },
        bottom: { x: 22.5, y: 14 },
        floor: { x: 0, y: 14.5 }
      }
    }
  }
};
  
export default Thomson;