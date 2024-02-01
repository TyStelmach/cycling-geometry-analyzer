// TODO: Replace with Database and REST Calls

export default {
  name: 'Thomson Elite',
  length: 100,
  diagrams: {
    front: 'public/diagrams/thomsonElite-front.svg',
    back: 'public/diagrams/thomsonElite-back.svg',
  },
  coords: {
    backCenter: {
      top: 0,
      right: null,
      bottom: null,
      left: 38,
    },
    backTop: {
      top: 20,
      right: 0,
      bottom: null,
      left: null,
    },
    backBottom: {
      top: null,
      right: 0,
      bottom: 17.5,
      left: null,
    },
    frontCenter: {
      top: 0,
      right: 41,
      bottom: null,
      left: null,
    },
    frontTop: {
      top: 16,
      right: null,
      bottom: null,
      left: 0,
    },
    frontBottom: {
      top: null,
      right: null,
      bottom: 16,
      left: 0,
    }
  }
}