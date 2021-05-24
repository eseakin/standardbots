import * as THREE from 'three';
import aluminum from '../images/4kAluminum2.jpg';

import { degreesToRad } from '../helpers/physicsHelpers';

class Axle {
  constructor(
    {
      loader, 
      position: { x, y, z }
    }
  ) {
    this.geometry = new THREE.CylinderGeometry( 6, 6, 20, 32 );
    this.material = new THREE.MeshBasicMaterial({
      map: loader.load(aluminum),
      color: '#7363CC'
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.rotation.z = degreesToRad(90);

    this.mesh.position.set( x, y, z );
  }

  get = () => this.mesh
}

export default Axle;
