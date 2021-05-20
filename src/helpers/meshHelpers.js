import * as THREE from 'three';

import { degreesToRad } from './physicsHelpers';

import aluminum from '../images/4kAluminum2.jpg';
import steel from '../images/4kSteel.jpeg';


const getMotor = (loader) => {
  const geometry = new THREE.CylinderGeometry( 30, 30, 300, 32 );
  const material = new THREE.MeshBasicMaterial({
    map: loader.load(aluminum),
    color: '#2f646b'
  });
  
  const motor = new THREE.Mesh( geometry, material );
  

  motor.rotation.x = degreesToRad(90);
  motor.rotation.z = degreesToRad(90);
  
  motor.position.set( -150, 50, 0 );
  
  return motor;
}

const getAxle = (loader) => {
  const geometry = new THREE.CylinderGeometry( 6, 6, 20, 32 );
  const material = new THREE.MeshBasicMaterial({
    map: loader.load(aluminum),
    color: '#7363CC'
  });
  
  const axle = new THREE.Mesh( geometry, material );
  
  axle.position.set( 0, 50, 0 );

  axle.rotation.z = degreesToRad(90);
  
  return axle;
}

const getArm = (loader) => {
  const geometry = new THREE.CylinderGeometry( 7.5, 7.5, 200, 32 );
  const material = new THREE.MeshBasicMaterial({
    map: loader.load(aluminum),
    color: '#736337'
  });
  
  const arm = new THREE.Mesh( geometry, material );
  
  arm.position.set( 10, 70, 0 );

  arm.rotation.y = degreesToRad(90);
  
  return arm;
}

const getBall = (loader) => {
  const geometry = new THREE.SphereGeometry( 7.5, 32, 32 );
  const material = new THREE.MeshBasicMaterial({
    map: loader.load(steel),
    color: '#b9ff21'
  });
  const ball = new THREE.Mesh( geometry, material );

  ball.position.set( 15, 92.5, 0 );
  
  return ball;
}

const getTarget = () => {
  const geometry = new THREE.BoxGeometry(150, 150, 1);
  const material = new THREE.MeshBasicMaterial({ 
    color: '#d63e48' 
  });
  const target = new THREE.Mesh( geometry, material );

  target.position.set( 0, 200, -200 );
  
  return target;
}

export {
  getMotor,
  getAxle,
  getArm,
  getBall,
  getTarget,
};
