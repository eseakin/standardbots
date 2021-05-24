import * as THREE from 'three';
import steel from '../images/4kSteel.jpeg';

class Ball {
  constructor(
    {
      loader, 
      position: { x, y, z }
    }
  ) {
    this.geometry = new THREE.SphereGeometry( 7.5, 32, 32 );
    this.material = new THREE.MeshBasicMaterial({
      map: loader.load(steel),
      color: '#b9ff21'
    });
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.position.set( x, y, z );
  }

  get = () => this.mesh

  calculateSpeed = () => {}

  calculatePosition = () => {}
}

export default Ball;
