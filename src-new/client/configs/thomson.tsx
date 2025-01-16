
// TODO: Replace with Database and REST Calls

/*
  109 mm = 412px
  100 mm = 377px
  */


  const Thomson = {
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
      path: 'public/diagrams/thomsonElite-front.svg',
      width: 400,  // actual SVG dimensions
      height: 400,
      connections: {
        top: { x: -18.5, y: -14.5 },    // percentages from top-left
        bottom: { x: -18.5, y: 14.5 },
        floor: { x: 0, y: 21 }
      }
    },
    collar: {
      path: 'public/diagrams/thomsonElite-back.svg',
      width: 300,  // actual SVG dimensions
      height: 300,
      connections: {
        top: { x: 21.5, y: -17.5 },
        bottom: { x: 21.5, y: 13 },
        floor: { x: 0, y: 14.5 }
      }
    }
  }
};
  
  export default Thomson;