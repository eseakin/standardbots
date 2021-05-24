import * as THREE from 'three';
import { OrbitControls } from '../utils/OrbitControls';

import { 
  createMotor,
  createAxle,
  createArm,
  createBall,
  createTarget,
  createPivot,
} from '../helpers/meshHelpers';


class Simulator {
  constructor(aspectRatio) {
    // controls
    this.settings = {
      pivotSpeed: 0,
      pivotAngularAccel: 2018, // radians per second squared
      pivotAngularDecel: -500, // radians per second squared
      pivotMaxSpeed: 20, // radians/second
      pivotPosition: { x: 0, y: 50, z: 0 },

      armPosition: { x: 10, y: 70, z: 0 },

      ballPosition: { x: 15, y: 92.5, z: 0 },

      cameraFov: 40,
      cameraAspectRatio: aspectRatio,
      cameraNearClipping: 1,
      cameraFarClipping: 10000
    };

    this.init();
  }

  init = () => {
    this.isAnimated = true;
    this.isLaunched = false;
    this.power = 50; // percent
    this.isMotorStarted = false;

    // set up scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 
      this.settings.cameraFov, 
      this.settings.cameraAspectRatio, 
      this.settings.cameraNearClipping, 
      this.settings.cameraFarClipping 
    );
    this.loader = new THREE.TextureLoader();
    this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true });
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    // build meshes
    this.pivot = createPivot({ 
      position: this.settings.pivotPosition,
      angularAccel: this.settings.pivotAngularAccel,
      angularDecel: this.settings.pivotAngularDecel,
      maxSpeed: this.settings.pivotMaxSpeed,
    });
    this.motor = createMotor(this.loader);
    this.axle = createAxle(this.loader);
    this.arm = createArm({ 
      loader: this.loader, 
      position: this.settings.armPosition,
    });
    this.ball = createBall({
      loader: this.loader, 
      position: this.settings.ballPosition,
    });
    this.target = createTarget(this.loader);
    this.gridHelper = new THREE.GridHelper( 5000, 50 );

    this.camera.position.set( 0, 600, 1200 );

    // add meshes to scene
    this.scene.add( this.motor );
    this.scene.add( this.axle );
    this.pivot.add( this.arm.get() );
    this.arm.add( this.ball.get() );
    this.scene.add( this.pivot.get() );
    this.scene.add( this.target );
    this.scene.add( this.gridHelper );

    console.log('scene', this.scene)

    this.animate();
    console.log('setup complete')
  }

  animate = () => {
    if(!this.isAnimated) return;

    const dt = this.clock?.getDelta() ?? 0;
    console.log('dt', dt)

    this.pivot.calculateRotation({
      dt,
      isMotorStarted: this.isMotorStarted,
      power: this.power,
    });

    if(this.isLaunched) {
      this.ball.get().position.x += 1 * this.power / 100;
      this.ball.get().position.y -= 1; // HOW TO ADD GRAVITY?
    }

    this.controls.update();
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame( this.animate );
  }

  startMotor = () => {
    this.clock = new THREE.Clock();
    this.isMotorStarted = true;
  }

  stopMotor = () => {
    this.clock = new THREE.Clock();
    this.isMotorStarted = false;
  }

  fire = () => {
    this.isMotorStarted = false;
    this.isLaunched = true;
  }

  stopAnimation = () => {
    this.isAnimated = false;
  }

  resetScene = () => {
    this.init();
  }

  setPower = (power) => this.power = power;
}

export default Simulator;
