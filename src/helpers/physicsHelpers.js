const degreesToRad = (d) => d * Math.PI / 180;

const radToDegrees = (r) => r * 180 / Math.PI;

const getAngularVelocity = ({ dTheta, dt }) => dTheta / dt;

const getLinearVelocityFromAngularVelocity = ({ w, r }) => r * w;

export {
  degreesToRad,
  radToDegrees,
  getAngularVelocity,
  getLinearVelocityFromAngularVelocity
};