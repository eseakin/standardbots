import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';

import Simulator from './simulator/Simulator';

import './App.css';

const App = () => {
  const [simulator, setSimulator] = useState();

  // can put these in an import to prevent from redeclaring every render
  const canvasWidth = 1200;
  const canvasHeight = 800;

  useEffect(() => {
    console.log('set simulator')
    const aspectRatio = canvasWidth / canvasHeight;
    setSimulator(new Simulator(aspectRatio));
  }, []);

  const onContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app">

      <Header />

      <div style={{ position: 'relative', width: 1200, height: 800 }}>

        <canvas width={canvasWidth} height={canvasHeight} onContextMenu={onContextMenu} id="canvas" />
        <ControlPanel 
          stopAnimation={simulator?.stopAnimation}
          startMotor={simulator?.startMotor}
          stopMotor={simulator?.stopMotor}
          isMotorStarted={simulator?.isMotorStarted}
          fire={simulator?.fire}
          resetScene={simulator?.resetScene}
          setSimPower={simulator?.setPower}
        />

      </div>
    </div>
  );
}

export default App;
