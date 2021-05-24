import React, { useState } from 'react';

const ControlPanel = ({ 
  stopAnimation, 
  startMotor, 
  stopMotor, 
  isMotorStarted, 
  fire, 
  resetScene, 
  setSimPower,
  setMaxTorque,
  setMaxSpeed,
}) => {
  const [power, setPower] = useState(50);
  const [motorStarted, setMotorStarted] = useState(false);
  const [torque, setTorque] = useState(2);
  const [speed, setSpeed] = useState(20);

  const handlePowerChange = (e) => {
    setPower(e.target.value);
    setSimPower(e.target.value);
  }

  const handleTorqueChange = (e) => {
    setTorque(e.target.value);
    setMaxTorque(e.target.value);
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

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
    setMaxSpeed(e.target.value);
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
          <label>Power level: {power}%</label>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <input id="powerLevel" type="range" min="1" max="100" value={power} onChange={handlePowerChange}/>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <label style={{ marginRight: 10, width: 100 }}>Max torque</label>
        <input type="text" label="test" value={torque} style={{ width: 50 }} onChange={handleTorqueChange} />
      </div>

      <div style={{display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <label style={{ marginRight: 10, width: 100 }}>Max speed</label>
        <input type="text" label="test" value={speed} style={{ width: 50 }} onChange={handleSpeedChange} />
      </div>

    </div>
  );
}

export default ControlPanel;