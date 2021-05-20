import * as THREE from 'three';
import { degreesToRad } from '../helpers/physicsHelpers';
import { OrbitControls } from '../utils/OrbitControls';

import { 
  getMotor,
  getAxle,
  getArm,
  getBall,
  getTarget,
} from '../helpers/meshHelpers';

const cameraConfig = {
  fov: 40,
  aspectRatio: 1200/800,
  nearClipping: 1,
  farClipping: 10000
}

class Simulator {
  constructor(props) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 
      cameraConfig.fov, 
      cameraConfig.aspectRatio, 
      cameraConfig.nearClipping, 
      cameraConfig.farClipping 
    );
    this.loader = new THREE.TextureLoader();
    this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true });
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.isAnimated = false;

    this.startScene();
  }

  startScene = () => {
    const pivot = new THREE.Group();
    pivot.position.set( 0, 50, 0 );

    // build meshes
    const motor = getMotor(this.loader);
    const axle = getAxle(this.loader);
    const arm = getArm(this.loader);
    const ball = getBall(this.loader);
    const target = getTarget(this.loader);
    const gridHelper = new THREE.GridHelper( 5000, 100 );

    this.pivot = pivot;
    this.arm = arm;
    this.ball = ball;

    this.camera.position.set( 0, 600, 1200 );

    // add meshes to scene
    this.scene.add( motor );
    this.scene.add( axle );
    pivot.add( arm );
    arm.add( ball );
    this.scene.add( pivot );
    this.scene.add( target );
    this.scene.add( gridHelper );

    console.log('building scene')
    console.log(this.scene)

    console.log('setup complete')
    this.isAnimated = true;
    this.animate();
  }

  animate = () => {
    console.log('isAnimated', this.isAnimated)
    if(!this.isAnimated) return;

    requestAnimationFrame( this.animate );
    this.controls.update();
    this.pivot.rotation.x += degreesToRad(-19);
    // animateArm();
    this.renderer?.render( this.scene, this.camera );
  }

  stopAnimation = () => {
    console.log('stop');
    this.isAnimated = false;
  }
}

export default Simulator;
