import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';

import Simulator from './simulator/Simulator';

import config from './utils/config';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => {
  const [simulator, setSimulator] = useState();

  useEffect(() => {
    console.log('set simulator')
    setSimulator(new Simulator(config));
  }, []);

  const onContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app">

      <Header />

      <div style={{ position: 'relative', width: config.canvasWidth, height: config.canvasHeight }}>

        <canvas width={config.canvasWidth} height={config.canvasHeight} onContextMenu={onContextMenu} id="canvas" />
        <ControlPanel 
          stopAnimation={simulator?.stopAnimation}
          startMotor={simulator?.startMotor}
          stopMotor={simulator?.stopMotor}
          isMotorStarted={simulator?.isMotorStarted}
          fire={simulator?.fire}
          resetScene={simulator?.resetScene}
          setSimPower={simulator?.setPower}
          setMaxTorque={simulator?.setMaxTorque}
          setMaxSpeed={simulator?.setMaxSpeed}
          setStartingAngle={simulator?.setStartingAngle}
          setEndingAngle={simulator?.setEndingAngle}
          config={config}
        />

      </div>
    </div>
  );
}

export default App;
