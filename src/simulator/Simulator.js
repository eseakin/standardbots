import * as THREE from 'three';
import { OrbitControls } from '../utils/OrbitControls';

import Motor from '../meshes/Motor';
import Axle from '../meshes/Axle';
import Pivot from '../meshes/Pivot';
import Arm from '../meshes/Arm';
import Ball from '../meshes/Ball';
import Target from '../meshes/Target';
import GridHelper from '../meshes/GridHelper';


class Simulator {
  constructor(config) {
    this.config = config;

    this.init();
  }

  init = () => {
    this.isAnimated = true;
    this.isLaunched = false;
    this.power = this.config.defaultPower; // percent
    this.torque = this.config.defaultTorque;
    this.isMotorStarted = false;

    // set up scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 
      this.config.camera.fov, 
      this.config.camera.aspectRatio, 
      this.config.camera.nearClipping, 
      this.config.camera.farClipping 
    );
    this.loader = new THREE.TextureLoader();
    this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true });
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    // build meshes
    this.pivot = new Pivot({ 
      position: this.config.pivot.defaultPosition,
      angularAccel: this.torque / this.config.rotationalInertia,
      angularDecel: this.config.pivot.angularDecel,
      maxSpeed: this.config.pivot.defaultMaxSpeed,
      defaultStartingAngle: this.config.pivot.defaultStartingAngle,
    });
    this.motor = new Motor({
      loader: this.loader, 
      position: this.config.motor.defaultPosition,
    });
    this.axle = new Axle({
      loader: this.loader, 
      position: this.config.axle.defaultPosition,
    });
    this.arm = new Arm({
      loader: this.loader, 
      position: this.config.arm.defaultPosition,
    });
    this.ball = new Ball({
      loader: this.loader, 
      position: this.config.ball.defaultPosition,
    });
    this.target = new Target({
      loader: this.loader,
      position: this.config.target.defaultPosition,
    });
    this.gridHelper = new GridHelper({ 
      size: this.config.gridHelper.size,
      divisions: this.config.gridHelper.divisions,
    });

    const { x, y, z } = this.config.camera.defaultPosition;
    this.camera.position.set( x, y, z );

    // add meshes to scene
    this.scene.add( this.motor.get() );
    this.scene.add( this.axle.get() );
    this.pivot.add( this.arm.get() );
    this.arm.add( this.ball.get() );
    this.scene.add( this.pivot.get() );
    this.scene.add( this.target.get() );
    this.scene.add( this.gridHelper.get() );

    console.log('scene', this.scene)

    this.animate();
    console.log('setup complete')
  }

  animate = () => {
    if(!this.isAnimated) return;

    const dt = this.clock?.getDelta() ?? 0;

    this.pivot.calculateRotation({
      dt,
      isMotorStarted: this.isMotorStarted,
      power: this.power,
    });

    if(this.isLaunched) {
      // calculate angular velocity -> linear velocity
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

  setStartingAngle = (radians) => this.pivot?.setRotation(radians)

  setEndingAngle = (radians) => this.pivot?.setEndingAngle(radians)

  setPower = (power) => this.power = power;

  setMaxTorque = (torque) => {
    this.torque = torque;
    this.pivot?.setAngularAccel(torque / this.config.rotationalInertia);
  }

  setMaxSpeed = (maxSpeed) => this.pivot?.setMaxSpeed(maxSpeed)
}

export default Simulator;
