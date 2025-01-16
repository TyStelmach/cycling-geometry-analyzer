
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
        top: { x: 20, y: 25 },    // percentages from top-left
        bottom: { x: 0, y: 77 }
      }
    },
    collar: {
      path: 'public/diagrams/thomsonElite-back.svg',
      width: 300,  // actual SVG dimensions
      height: 300,
      connections: {
        top: { x: 100, y: 17 },
        bottom: { x: 100, y: 83 }
      }
    }
  }
};
  
  export default Thomson;