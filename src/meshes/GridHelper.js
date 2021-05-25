import * as THREE from 'three';

class GridHelper {
  constructor(
    {
      size, 
      divisions
    }
  ) {
    this.mesh = new THREE.GridHelper( size, divisions );
  }

  get = () => this.mesh

}

export default GridHelper;
