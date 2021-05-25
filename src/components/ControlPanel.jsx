import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import { degreesToRad, radToDegrees } from '../helpers/physicsHelpers';

import './ControlPanel.css';

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
  setStartingAngle,
  setEndingAngle,
  config,
}) => {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [power, setPower] = useState(config.defaultPower);
  const [prevPower, setPrevPower] = useState(config.defaultPower);
  const [motorStarted, setMotorStarted] = useState(false);
  const [torque, setTorque] = useState(config.defaultTorque);
  const [speed, setSpeed] = useState(config.pivot.defaultMaxSpeed);
  const [startAngle, setStartAngle] = useState(radToDegrees(config.pivot.defaultStartingAngle));
  const [endAngle, setEndAngle] = useState(radToDegrees(config.pivot.defaultEndingAngle));

  const handleMotorStart = () => {
    if(motorStarted) {
      setMotorStarted(false);
      stopMotor();
    } else {
      setMotorStarted(true);
      startMotor();
    }
  }

  const handleSetLiveMode = () => {
    if(isLiveMode) {
      // save power setting so we can come back to it
      setPrevPower(power);
      // set to max power for non live mode
      setPower(100);

    } else {
      // set power back to previous level
      setPower(prevPower);
    }

    setIsLiveMode(prevVal => !prevVal);
  }

  const handlePowerChange = (e) => {
    setPower(e.target.value);
    setSimPower(e.target.value);
  }

  const handleTorqueChange = (e) => {
    setTorque(e.target.value);
    setMaxTorque(e.target.value);
  }

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
    setMaxSpeed(e.target.value);
  }

  const handleStartAngleChange = (e) => {
    const { value } = e.target;

    setStartAngle(value);
    setStartingAngle(degreesToRad(value));
  }

  const handleEndAngleChange = (e) => {
    const { value } = e.target;

    setEndAngle(value);
    setEndingAngle(degreesToRad(value));
  }

  const handleRunSimulation = () => {} // FIX ME

  return(
    <div className="control-panel">

      {isLiveMode && 
        <div className="live-mode-panel">
          <div className="live-mode-container">

            <Button className="margin-right" onClick={handleMotorStart}>
              {motorStarted ? 'Stop motor' : 'Start motor'}
            </Button>

            <Button className="margin-right" onClick={fire}>Fire</Button>

            <Button className="margin-right" onClick={resetScene}>Reset</Button>

            <div className="power-level-panel">
              <label>Power level: {power}%</label>
              <div className="power-level-slider">
                <input id="powerLevel" type="range" min="1" max="100" value={power} onChange={handlePowerChange}/>
              </div>
            </div>

          </div>
        </div>
      }

      {!isLiveMode &&
        <div className="off-air-mode-panel">
          <div className="off-air-mode-input">
            <label className="off-air-mode-label">Max torque</label>
            <input type="number" label="test" value={torque} onChange={handleTorqueChange} />
          </div>

          <div className="off-air-mode-input">
            <label className="off-air-mode-label">Max speed</label>
            <input type="number" label="test" value={speed} onChange={handleSpeedChange} />
          </div>

          <div className="off-air-mode-input">
            <label className="off-air-mode-label">Starting Angle</label>
            <input type="number" label="test" value={startAngle} onChange={handleStartAngleChange} />
          </div>

          <div className="off-air-mode-input">
            <label className="off-air-mode-label">Release Angle</label>
            <input type="number" label="test" value={endAngle} onChange={handleEndAngleChange} />
          </div>
          
          <div className="off-air-mode-run-button">
            <Button color="teal" onClick={handleRunSimulation}>Run</Button>
          </div>
        </div>

      }

      <div className="live-mode-button">
        <Button
          onClick={handleSetLiveMode} 
          color={isLiveMode ? 'red' : 'green'}
        >
            {isLiveMode ? 'Go off-air' : 'Do it live!'}
        </Button>
      </div>

      <Button className="stop-animation-button" onClick={stopAnimation} color="red">Stop animation</Button>

    </div>
  );
}

export default ControlPanel;