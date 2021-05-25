import * as THREE from 'three';

class Pivot {
  constructor(
    { 
      position: { x, y, z },
      angularAccel,
      angularDecel,
      maxSpeed,
      defaultStartingAngle,
      isLiveMode,
    }
  ) {

    this.mesh = new THREE.Group();
    this.mesh.position.set( x, y, z );
    this.angularAccel = angularAccel;
    this.angularDecel = angularDecel;
    this.maxSpeed = maxSpeed;
    this.isLiveMode = isLiveMode;

    this.speed = 0;
    this.endingAngle = null;

    this.setRotation(defaultStartingAngle);
  } 

  add = (obj) => this.mesh.add(obj)

  get = () => this.mesh

  setAngularAccel = (angularAccel) => this.angularAccel = angularAccel

  setMaxSpeed = (maxSpeed) => this.maxSpeed = maxSpeed

  calculateRotation = ({ dt, isMotorStarted, power }) => {
    // all measured in radians
    let dv = 0;

    if(isMotorStarted) {
      // v = .5at^2 + v0
      dv = .5 * this.angularAccel * dt * dt * power / 100;
      this.speed = Math.min(this.speed + dv, this.maxSpeed);
    } else {
      dv = .5 * this.angularDecel * dt * dt;
      this.speed = Math.max(this.speed + dv, 0);
    }

    if(!this.isLiveMode && this.mesh.rotation.x <= this.endingAngle) {
      this.speed = 0;
    }

    this.addRotation( this.speed * dt );
  }

  // negative rotation to go forward
  addRotation = (radians) => {
    this.mesh.rotation.x -= radians
  }

  setRotation = (radians) => this.mesh.rotation.x = .5 * Math.PI - radians

  setEndingAngle = (radians) => this.endingAngle = .5 * Math.PI - radians

  setIsLiveMode = (val) => this.isLiveMode = val
}

export default Pivot;
