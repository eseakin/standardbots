import React, { useState } from 'react';

const ControlPanel = ({ stopAnimation, startMotor, stopMotor, isMotorStarted, fire, resetScene, setSimPower }) => {
  const [power, setPower] = useState(50);
  const [motorStarted, setMotorStarted] = useState(false);

  const handleChange = (e) => {
    setPower(e.target.value);
    setSimPower(e.target.value);
  }

  const handleMotorStart = () => {
    if(motorStarted) {
      setMotorStarted(false);
      stopMotor();
    } else {
      setMotorStarted(true);
      startMotor();
    }
  }

  console.log(power)
  return(
    <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <button style={{ marginRight: 10 }} onClick={stopAnimation}>Stop Animation</button>
        <button style={{ marginRight: 10 }} onClick={handleMotorStart}>
          {motorStarted ? 'Stop motor' : 'Start motor'}
        </button>
        <button style={{ marginRight: 10 }} onClick={fire}>Fire</button>
        <button style={{ marginRight: 10 }} onClick={resetScene}>Reset</button>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 20}}>
          <label>Power level</label>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <label>1</label>
            <input id="powerLevel" type="range" min="1" max="100" value={power} onChange={handleChange}/>
            <label>9000</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;