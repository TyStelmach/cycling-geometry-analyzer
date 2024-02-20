// TODO: Replace with Database and REST Calls

/*
  109 mm = 412px
  100 mm = 377px
  */


export default {
  name: 'Thomson Elite X4',
  // Millimeters
  exactLength: 159,
  exactHeight: 56,
  faceLength: 50.1,
  backLength: 51.5,
  faceDepth: 21, //distance from front to center of bars 
  reach: 120, // reach, measured center to center
  stackHeight: 40.6,
  angle: 0,
  diagrams: {
    front: 'public/diagrams/thomsonElite-front.svg',
    back: 'public/diagrams/thomsonElite-back.svg',
  },
  debug: {
    backStem: {
      center: [89, 0],
      top: [0, 34],
      bottom: [0, 34],
    },
    frontStem: {
      center: [81, 0],
      top: [0, 32],
      bottom: [0, 32],
    }
  }

}