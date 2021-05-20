const degreesToRad = (d) => d * Math.PI / 180;

const getAngularVelocity = ({ dTheta, dt }) => dTheta / dt;

const getLinearVelocityFromAngularVelocity = ({ w, r }) => r * w;

export {
  degreesToRad,
  getAngularVelocity,
  getLinearVelocityFromAngularVelocity
};