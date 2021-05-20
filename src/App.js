import React, { useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

import { OrbitControls } from './components/OrbitControls';
import ControlPanel from './components/ControlPanel';

// import { degreesToRad, getLinearVelocityFromAngularVelocity } from './helpers/physicsHelpers';
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

const App = () => {
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

  const [isAnimated, setIsAnimated] = useState(false);
  const animate = useCallback(() => {
    if(!isAnimated) return;

    requestAnimationFrame( animate );
    controls.update();
    // animateArm();
    renderer?.render( scene, camera );
  }, [isAnimated, camera, scene, renderer, controls])

  const [arm, setArm] = useState();
  const [ball, setBall] = useState();
  
  useEffect(() => {
    console.log('set renderer')
    setRenderer(new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true }));
  }, []);

  useEffect(() => {
    if(!renderer || !scene || !camera) return;

    // build meshes
    const motor = getMotor(loader);
    const axle = getAxle(loader);
    const arm = getArm(loader);
    const ball = getBall(loader);
    const target = getTarget(loader);
    const gridHelper = new THREE.GridHelper( 5000, 100 );

    setArm(arm);
    setBall(ball);

    setControls(new OrbitControls( camera, renderer.domElement ));

    camera.position.set( 0, 600, 1200 );

    // add meshes to scene
    scene.add( motor );
    scene.add( axle );
    arm.add( ball );
    scene.add( arm );
    scene.add( target );
    scene.add( gridHelper );

    console.log('building scene')
    console.log(scene)

    setIsAnimated(true);

  }, [renderer, scene, camera, loader]);

  useEffect(() => {
    animate();
  }, [animate, isAnimated, camera, controls, renderer, scene])

  const onContextMenu = (e) => {
    e.preventDefault();
  };

  const animateArm = () => {

  };

  const startMotor = () => {

  };

  const fire = () => {

  };

  const stopAnimation = () => setIsAnimated(false);

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
