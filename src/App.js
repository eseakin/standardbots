import React, { useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

import { OrbitControls } from './utils/OrbitControls';
import ControlPanel from './components/ControlPanel';

import { degreesToRad } from './helpers/physicsHelpers';
import { 
  getMotor,
  getAxle,
  getArm,
  getBall,
  getTarget,
} from './helpers/meshHelpers';

import './App.css';

const cameraConfig = {
  fov: 40,
  aspectRatio: 1200/800,
  nearClipping: 1,
  farClipping: 10000
}

// class Simulator {
//   constructor(props) {
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera( 
//       cameraConfig.fov, 
//       cameraConfig.aspectRatio, 
//       cameraConfig.nearClipping, 
//       cameraConfig.farClipping 
//     );
//     this.loader = new THREE.TextureLoader();
//     this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true })
//   }


// }

const App = () => {
  const [isSetup, setIsSetup] = useState(false);

  // Three scene setup
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(
    new THREE.PerspectiveCamera( 
      cameraConfig.fov, 
      cameraConfig.aspectRatio, 
      cameraConfig.nearClipping, 
      cameraConfig.farClipping 
    )
  );
  const [loader] = useState(new THREE.TextureLoader());
  const [renderer, setRenderer] = useState();
  const [controls, setControls] = useState();
  
  const [arm, setArm] = useState();
  const [ball, setBall] = useState();
  const [pivot, setPivot] = useState();

  console.log(arm)

  const [isAnimated, setIsAnimated] = useState(false);
  const animate = useCallback(() => {
    console.log('isAnimated', isAnimated)
    if(!isAnimated) return;

    requestAnimationFrame( animate );
    controls.update();
    pivot.rotation.x += degreesToRad(-19);
    // animateArm();
    renderer?.render( scene, camera );
  }, [isAnimated, camera, scene, renderer, controls]);


  useEffect(() => {
    console.log('set renderer')
    setRenderer(new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true }));
  }, []);

  useEffect(() => {
    if(!renderer || !scene || !camera) return;

    const pivot = new THREE.Group();
    pivot.position.set( 0, 50, 0 );

    // build meshes
    const motor = getMotor(loader);
    const axle = getAxle(loader);
    const arm = getArm(loader);
    const ball = getBall(loader);
    const target = getTarget(loader);
    const gridHelper = new THREE.GridHelper( 5000, 100 );

    setPivot(pivot);
    setArm(arm);
    setBall(ball);

    setControls(new OrbitControls( camera, renderer.domElement ));

    camera.position.set( 0, 600, 1200 );

    // add meshes to scene
    scene.add( motor );
    scene.add( axle );
    pivot.add( arm );
    arm.add( ball );
    scene.add( pivot );
    scene.add( target );
    scene.add( gridHelper );

    console.log('building scene')
    console.log(scene)

    if(!isSetup) {
      console.log('setup complete')
      setIsAnimated(true);
      setIsSetup(true);
    }

  }, [isSetup, renderer, scene, camera, loader]);

  useEffect(() => {
    if(!isAnimated) return;

    animate();
  }, [animate, isAnimated, camera, controls, renderer, scene]);

  const onContextMenu = (e) => {
    e.preventDefault();
  };

  const animateArm = () => {

  };

  const startMotor = () => {

  };

  const fire = () => {
    pivot.remove(arm);
    arm.remove(ball);
  };

  const stopAnimation = () => console.log('stop') || setIsAnimated(false);

  return (
    <div className="app">
      <div style={{ margin: 30 }}>
        <h1 style={{ margin: 10 }}>Introducing: The Chuck Norris</h1>
        <h2 style={{ margin: 10 }}>Our latest extension</h2>
      </div>
      <div style={{ position: 'relative', width: 1200, height: 800 }}>
        <canvas width={1200} height={800} onContextMenu={onContextMenu} id="canvas" />
        <ControlPanel stopAnimation={stopAnimation} startMotor={startMotor} fire={fire} />
      </div>
    </div>
  );
}

export default App;
