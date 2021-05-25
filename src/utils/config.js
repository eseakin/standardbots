import { degreesToRad } from '../helpers/physicsHelpers';

const config = {
  canvasWidth: 1200,
  canvasHeight: 800,

  defaultPower: 50, // percent
  defaultTorque: 2, // newton meters
  rotationalInertia: 0.00099117285, // kg m²

  motor: {
    defaultPosition: { x: -150, y: 50, z: 0 },
  },

  axle: {
    defaultPosition: { x: 0, y: 50, z: 0 },
  },

  pivot: {
    angularDecel: -500, // radians per second²
    defaultMaxSpeed: 20, // radians per second
    defaultPosition: { x: 0, y: 50, z: 0 }, // mm
    defaultStartingAngle: degreesToRad(75),
    defaultEndingAngle: degreesToRad(120),
  },

  arm: {
    defaultPosition: { x: 10, y: 70, z: 0 }, // mm
  },

  ball: {
    defaultPosition: { x: 15, y: 92.5, z: 0 }, // mm
  },

  target: {
    defaultPosition: { x: 0, y: 200, z: -800 }, // mm
  },

  camera: {
    fov: 40,
    nearClipping: 1,
    farClipping: 10000,
    defaultPosition: { x: 0, y: 600, z: 1200 }, // mm
  },

  gridHelper: {
    size: 5000,
    divisions: 50, 
  }
};

config.camera.aspectRatio = config.canvasWidth / config.canvasHeight;

export default config;
