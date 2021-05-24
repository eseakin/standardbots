import * as THREE from 'three';

class Target {
  constructor(
    {
      loader, 
      position: { x, y, z }
    }
  ) {
    this.geometry = new THREE.BoxGeometry(150, 150, 1);
    this.material = new THREE.MeshBasicMaterial({ 
      color: '#d63e48' 
    });
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.position.set( x, y, z );
  }

  get = () => this.mesh
}

export default Target;
