import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import aluminum from '../images/BrushedAluminum.jpg';

const Box = (props) => {
  const mesh = useRef();

  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  // });

  const texture = useMemo(() => new THREE.TextureLoader().load(aluminum), []);
  
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[2, 2, 2]}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
}

export default Box;