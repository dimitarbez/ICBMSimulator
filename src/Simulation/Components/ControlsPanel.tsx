import React, { RefObject } from 'react';
import './ControlsPanel.css'; // Make sure to import the CSS file

interface ControlsPanelProps {
  miniCanvasRef: RefObject<HTMLCanvasElement>;
  launchAngle: number;
  setLaunchAngle: (value: number) => void;
  initialVelocity: number;
  setInitialVelocity: (value: number) => void;
  timeScale: number;
  setTimeScale: (value: number) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  simulationState: {
    isRunning: boolean;
    time: number;
    positionX: number;
    positionY: number;
    velocityX: number;
    velocityY: number;
  };
  EARTH_RADIUS: number;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  miniCanvasRef,
  launchAngle,
  setLaunchAngle,
  initialVelocity,
  setInitialVelocity,
  timeScale,
  setTimeScale,
  startSimulation,
  pauseSimulation,
  resetSimulation,
  simulationState,
  EARTH_RADIUS,
}) => {
  return (
    <div className="controls-panel">
      <h2>Mission Control</h2>
      <canvas ref={miniCanvasRef} width={250} height={250} />
      <div className="control-group">
        <label>Launch Angle: {launchAngle}°</label>
        <input
          type="range"
          min={0}
          max={90}
          value={launchAngle}
          onChange={(e) => setLaunchAngle(Number(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Initial Velocity: {initialVelocity} m/s</label>
        <input
          type="range"
          min={1000}
          max={10000}
          step={100}
          value={initialVelocity}
          onChange={(e) => setInitialVelocity(Number(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Time Scale: {timeScale}x</label>
        <input
          type="range"
          min={0.1}
          max={10}
          step={0.1}
          value={timeScale}
          onChange={(e) => setTimeScale(Number(e.target.value))}
        />
      </div>
      <div className="button-group">
        <button
          onClick={startSimulation}
          disabled={simulationState.isRunning}
          className={`button button-start ${simulationState.isRunning ? 'disabled' : ''}`}
        >
          Start
        </button>
        <button
          onClick={pauseSimulation}
          disabled={!simulationState.isRunning}
          className={`button button-pause ${!simulationState.isRunning ? 'disabled' : ''}`}
        >
          Pause
        </button>
        <button
          onClick={resetSimulation}
          className="button button-reset"
        >
          Reset
        </button>
      </div>
      <div className="simulation-status">
        <p>Time: {simulationState.time.toFixed(2)} s</p>
        <p>Altitude: {(Math.sqrt(simulationState.positionX ** 2 + simulationState.positionY ** 2) - EARTH_RADIUS).toFixed(2)} m</p>
        <p>Velocity: {Math.sqrt(simulationState.velocityX ** 2 + simulationState.velocityY ** 2).toFixed(2)} m/s</p>
        <p>Angle: {(Math.atan2(simulationState.positionY, simulationState.positionX) * 180 / Math.PI).toFixed(2)}°</p>
      </div>
    </div>
  );
};

export default ControlsPanel;