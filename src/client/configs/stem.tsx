// TODO: Replace with Database and REST Calls

/*
  109 mm = 412px
  100 mm = 377px
  */


export default {
  name: 'Thomson Elite X4',
  // Millimeters
  exactLength: 145,
  exactHeight: 56,
  faceDepth: 21, //distance from front to center of bars 
  reach: 100, // reach, measured center to center
  diagrams: {
    front: 'public/diagrams/thomsonElite-front.svg',
    back: 'public/diagrams/thomsonElite-back.svg',
  },
  coords: {
    // Percentages
    backCenter: {
      top: 0,
      right: null,
      bottom: null,
      left: 47,
    },
    backTop: {
      top: 1,
      right: 0,
      bottom: null,
      left: null,
    },
    backBottom: {
      top: null,
      right: 0,
      bottom: 1,
      left: null,
    },
    frontCenter: {
      top: 0,
      right: 42.5,
      bottom: null,
      left: null,
    },
    frontTop: {
      top: 13,
      right: null,
      bottom: null,
      left: 0,
    },
    frontBottom: {
      top: null,
      right: null,
      bottom: 13,
      left: 0,
    }
  }
}