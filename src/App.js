import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';

import Simulator from './simulator/Simulator';

import './App.css';

const App = () => {
  const [simulator, setSimulator] = useState();

  useEffect(() => {
    console.log('set simulator')
    setSimulator(new Simulator());
  }, []);

  const onContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app">

      <Header />

      <div style={{ position: 'relative', width: 1200, height: 800 }}>

        <canvas width={1200} height={800} onContextMenu={onContextMenu} id="canvas" />
      
        <ControlPanel 
          stopAnimation={simulator?.stopAnimation} 
          startMotor={simulator?.startMotor} 
          fire={simulator?.fire} 
        />

      </div>
    </div>
  );
}

export default App;
