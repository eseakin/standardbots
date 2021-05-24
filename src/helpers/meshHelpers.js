import * as THREE from 'three';

import Ball from '../meshes/Ball';
import Pivot from '../meshes/Pivot';
import Arm from '../meshes/Arm';

import { degreesToRad } from './physicsHelpers';

import aluminum from '../images/4kAluminum2.jpg';


const createMotor = (loader) => {
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

const createAxle = (loader) => {
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

const createPivot = (params) => new Pivot(params);

const createArm = (params) => new Arm(params);

const createBall = (params) => new Ball(params);

const createTarget = () => {
  const geometry = new THREE.BoxGeometry(150, 150, 1);
  const material = new THREE.MeshBasicMaterial({ 
    color: '#d63e48' 
  });
  const target = new THREE.Mesh( geometry, material );

  target.position.set( 0, 200, -200 );
  
  return target;
}

export {
  createMotor,
  createAxle,
  createPivot,
  createArm,
  createBall,
  createTarget,
};
