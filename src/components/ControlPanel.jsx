import React from 'react';

const ControlPanel = ({ stopAnimation, startMotor, fire, resetScene }) => {
  return(
    <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
      <button style={{ marginRight: 10 }} onClick={stopAnimation}>Stop Animation</button>
      <button style={{ marginRight: 10 }} onClick={startMotor}>Start motor</button>
      <button style={{ marginRight: 10 }} onClick={fire}>Fire</button>
      <button style={{ marginRight: 10 }} onClick={resetScene}>Reset</button>
    </div>
  );
}

export default ControlPanel;