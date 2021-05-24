import * as THREE from 'three';
import aluminum from '../images/4kAluminum2.jpg';

import { degreesToRad } from '../helpers/physicsHelpers';

class Motor {
  constructor(
    {
      loader, 
      position: { x, y, z }
    }
  ) {
    this.geometry = new THREE.CylinderGeometry( 30, 30, 300, 32 );
    this.material = new THREE.MeshBasicMaterial({
      map: loader.load(aluminum),
      color: '#2f646b'
    });
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.rotation.x = degreesToRad(90);
    this.mesh.rotation.z = degreesToRad(90);

    this.mesh.position.set( x, y, z );
  }

  get = () => this.mesh
}

export default Motor;
