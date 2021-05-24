import * as THREE from 'three';
import aluminum from '../images/4kAluminum2.jpg';

import { degreesToRad } from '../helpers/physicsHelpers';

class Arm {
  constructor(
    {
      loader, 
      position: { x, y, z },
    }
  ) {
    this.geometry = new THREE.CylinderGeometry( 7.5, 7.5, 200, 32 );
    this.material = new THREE.MeshBasicMaterial({
      map: loader.load(aluminum),
      color: '#736337'
    });
    
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    
    this.mesh.position.set( x, y, z );

    this.mesh.rotation.y = degreesToRad(90);
  }

  get = () => this.mesh
  
  add = (obj) => this.mesh.add(obj)
}

export default Arm;
