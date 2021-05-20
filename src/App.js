import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { OrbitControls } from './components/OrbitControls';

import aluminum from './images/4kAluminum2.jpg';
import steel from './images/4kSteel.jpeg';

import './App.css';

const cameraConfig = {
  fov: 40,
  aspectRatio: 1200/800,
  nearClipping: 1,
  farClipping: 10000
}

const App = () => {
  const [scene, setScene] = useState(new THREE.Scene());
  const [camera, setCamera] = useState(
    new THREE.PerspectiveCamera( 
      cameraConfig.fov, 
      cameraConfig.aspectRatio, 
      cameraConfig.nearClipping, 
      cameraConfig.farClipping 
    )
  );
  const [loader, setLoader] = useState(new THREE.TextureLoader());
  const [renderer, setRenderer] = useState();
  const [isAnimated, setIsAnimated] = useState(false);
  const [cameraControl, setCameraControl] = useState();
  
  const degreesToRad = (d) => d * 180 / Math.PI;

  const getMotor = () => {
    const geometry = new THREE.CylinderGeometry( 60, 60, 300, 32 );
    const material = new THREE.MeshBasicMaterial({
      map: loader.load(aluminum),
    });
    
    const motor = new THREE.Mesh( geometry, material );
    
    motor.position.x = -150;

    motor.rotation.x = degreesToRad(90);
    motor.rotation.z = degreesToRad(90);
    
    
    return motor;
  }

  const getArm = () => {
    const geometry = new THREE.CylinderGeometry( 7.5, 7.5, 200, 32 );
    const material = new THREE.MeshBasicMaterial({
      map: loader.load(aluminum),
    });
    
    const arm = new THREE.Mesh( geometry, material );
    

    arm.position.x = 10;
    arm.position.y = 80;

    arm.rotation.y = degreesToRad(90);
    
    return arm;
  }

  const getBall = () => {
    const geometry = new THREE.SphereGeometry( 7.5, 32, 32 );
    const material = new THREE.MeshBasicMaterial({
      map: loader.load(steel),
    });
    const ball = new THREE.Mesh( geometry, material );
    ball.position.x = 10;
    ball.position.y = 170;
    ball.position.z = -15;
    
    return ball;
  }

  const getTarget = () => {
    const geometry = new THREE.BoxGeometry(150, 150, 1);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const target = new THREE.Mesh( geometry, material );
    target.position.x = 0;
    target.position.y = 150;
    target.position.z = -200;

    return target;
  }


  useEffect(() => {
    console.log('set renderer')
    setRenderer(new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true }));
  }, []);

  useEffect(() => {
    const motor = getMotor();
    const arm = getArm();
    const ball = getBall();
    const target = getTarget();

    

    if(!isAnimated && renderer && scene && camera) {
      console.log('building scene')

      // const newCameraControl = new CameraControl(
      //   renderer, 
      //   camera, 
      //   () => window.requestAnimationFrame(() => renderer.render(scene, camera))
      // );
      // setCameraControl(newCameraControl);

      const controls = new OrbitControls( camera, renderer.domElement );
      camera.position.set( 0, 600, 1200 );

      scene.add( motor );
      scene.add( arm );
      scene.add( ball );
      scene.add( target );

      camera.position.z = 1200;
      camera.position.y = 600;
      camera.lookAt(motor)


      console.log(scene)
    
      const animate = () => {
        requestAnimationFrame( animate );

        // put animations here
        controls.update();

        renderer?.render( scene, camera );
        setIsAnimated(false);
      }
      
      setIsAnimated(true);
      animate();
    }

  }, [renderer, scene, camera, isAnimated]);

  const onContextMenu = (e) => {
    e.preventDefault();

  }


  return (
    <div className="app">
      <h1>Introducing: The Chuck Norris</h1>
      <h2>Our latest extension</h2>
      <canvas width={1200} height={800} onContextMenu={onContextMenu} id="canvas" />
    </div>
  );
}

export default App;
