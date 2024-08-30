import React, { useState, useEffect, useRef } from 'react';
import SimulationDisplay from './Components/SimulationDisplay';
import ControlsPanel from './Components/ControlsPanel';

const G = 6.67430e-11;
const EARTH_MASS = 5.97e24;
const EARTH_RADIUS = 6371000;
const MISSILE_MASS = 10000.0;
const DT = 0.1;

interface SimulationState {
  isRunning: boolean;
  time: number;
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

const ICBMSimulation: React.FC = () => {
  const [launchAngle, setLaunchAngle] = useState(45);
  const [initialVelocity, setInitialVelocity] = useState(7800);
  const [timeScale, setTimeScale] = useState(1);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    time: 0,
    positionX: EARTH_RADIUS,
    positionY: 0,
    velocityX: 0,
    velocityY: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const miniCanvasRef = useRef<HTMLCanvasElement>(null);

  

  useEffect(() => {
    if (canvasRef.current && miniCanvasRef.current) {
      setupSimulation();
    }
  }, []);

  const setupSimulation = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(400, 400, 200, 0, 2 * Math.PI);
    ctx.fillStyle = '#1d4ed8';
    ctx.fill();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.stroke();

    setupMiniVisualizer();
  };

  const setupMiniVisualizer = () => {
    const miniCanvas = miniCanvasRef.current!;
    const ctx = miniCanvas.getContext('2d')!;

    ctx.clearRect(0, 0, miniCanvas.width, miniCanvas.height);

    const gradient = ctx.createLinearGradient(0, 0, 0, miniCanvas.height);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#bfdbfe');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, miniCanvas.width, miniCanvas.height);

    ctx.fillStyle = '#15803d';
    ctx.fillRect(0, 200, 250, 50);

    ctx.fillStyle = '#6b7280';
    ctx.fillRect(115, 190, 20, 10);

    ctx.fillStyle = 'white';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 250;
      const y = Math.random() * 180;
      const size = Math.random() * 2 + 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const startSimulation = () => {
    if (!simulationState.isRunning) {
      const launchAngleRad = launchAngle * Math.PI / 180;
      setSimulationState({
        isRunning: true,
        time: 0,
        positionX: EARTH_RADIUS,
        positionY: 0,
        velocityX: initialVelocity * Math.sin(launchAngleRad),
        velocityY: initialVelocity * Math.cos(launchAngleRad),
      });
    }
  };

  const pauseSimulation = () => {
    setSimulationState(prevState => ({ ...prevState, isRunning: false }));
  };

  const resetSimulation = () => {
    setSimulationState({
      isRunning: false,
      time: 0,
      positionX: EARTH_RADIUS,
      positionY: 0,
      velocityX: 0,
      velocityY: 0,
    });
    setupSimulation();
  };

  useEffect(() => {
    if (simulationState.isRunning) {
      const animationId = requestAnimationFrame(updatePosition);
      return () => cancelAnimationFrame(animationId);
    }
  }, [simulationState]);

  const updatePosition = () => {
    if (!simulationState.isRunning) return;

    const dt = DT * timeScale;
    const { positionX, positionY, velocityX, velocityY, time } = simulationState;

    const r = Math.sqrt(positionX ** 2 + positionY ** 2);
    const gravAcceleration = G * EARTH_MASS / (r ** 2);
    const gravAccelerationX = -gravAcceleration * positionX / r;
    const gravAccelerationY = -gravAcceleration * positionY / r;

    const newVelocityX = velocityX + gravAccelerationX * dt;
    const newVelocityY = velocityY + gravAccelerationY * dt;
    const newPositionX = positionX + newVelocityX * dt;
    const newPositionY = positionY + newVelocityY * dt;

    if (r >= EARTH_RADIUS) {
      setSimulationState({
        ...simulationState,
        time: time + dt,
        positionX: newPositionX,
        positionY: newPositionY,
        velocityX: newVelocityX,
        velocityY: newVelocityY,
      });

      updateCanvasPosition(newPositionX, newPositionY);
      updateMiniVisualizer(r);
    } else {
      setSimulationState({ ...simulationState, isRunning: false });
    }
  };

  const updateCanvasPosition = (x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setupSimulation();

    const canvasX = 400 + (x / EARTH_RADIUS) * 200;
    const canvasY = 400 - (y / EARTH_RADIUS) * 200;

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  const updateMiniVisualizer = (r: number) => {
    const miniCanvas = miniCanvasRef.current!;
    const ctx = miniCanvas.getContext('2d')!;

    ctx.clearRect(0, 0, 250, 200);
    setupMiniVisualizer();

    const angle = Math.atan2(simulationState.positionY, simulationState.positionX);
    const distance = r - EARTH_RADIUS;
    const maxVisualDistance = 180;
    const visualDistance = Math.min(maxVisualDistance, distance / 50000);

    const rocketLength = 30;
    const rocketWidth = 10;
    const baseX = 125;
    const baseY = 200 - visualDistance;
    const rocketAngle = angle + Math.PI / 2;

    const tipX = baseX + rocketLength * Math.cos(rocketAngle);
    const tipY = baseY - rocketLength * Math.sin(rocketAngle);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(baseX + rocketWidth / 2 * Math.sin(rocketAngle), baseY + rocketWidth / 2 * Math.cos(rocketAngle));
    ctx.lineTo(baseX - rocketWidth / 2 * Math.sin(rocketAngle), baseY - rocketWidth / 2 * Math.cos(rocketAngle));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#bfdbfe';
    ctx.beginPath();
    ctx.arc(baseX + rocketLength / 4 * Math.cos(rocketAngle), baseY - rocketLength / 4 * Math.sin(rocketAngle), 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    const finLength = 10;
    const finWidth = 5;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + finWidth / 2 * Math.cos(rocketAngle), baseY - finWidth / 2 * Math.sin(rocketAngle));
    ctx.lineTo(baseX + finLength * Math.sin(rocketAngle - Math.PI / 6), baseY + finLength * Math.cos(rocketAngle - Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX - finWidth / 2 * Math.cos(rocketAngle), baseY + finWidth / 2 * Math.sin(rocketAngle));
    ctx.lineTo(baseX + finLength * Math.sin(rocketAngle + Math.PI / 6), baseY + finLength * Math.cos(rocketAngle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f97316';
    const flameLength = Math.random() * 10 + 15;
    const flameWidth = 8;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + flameWidth / 2 * Math.sin(rocketAngle), baseY + flameWidth / 2 * Math.cos(rocketAngle));
    ctx.lineTo(baseX - flameLength * Math.cos(rocketAngle), baseY + flameLength * Math.sin(rocketAngle));
    ctx.lineTo(baseX - flameWidth / 2 * Math.sin(rocketAngle), baseY - flameWidth / 2 * Math.cos(rocketAngle));
    ctx.closePath();
    ctx.fill();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <SimulationDisplay canvasRef={canvasRef} />
      <ControlsPanel
        miniCanvasRef={miniCanvasRef}
        launchAngle={launchAngle}
        setLaunchAngle={setLaunchAngle}
        initialVelocity={initialVelocity}
        setInitialVelocity={setInitialVelocity}
        timeScale={timeScale}
        setTimeScale={setTimeScale}
        startSimulation={startSimulation}
        pauseSimulation={pauseSimulation}
        resetSimulation={resetSimulation}
        simulationState={simulationState}
        EARTH_RADIUS={EARTH_RADIUS}
      />
    </div>
  );
};

export default ICBMSimulation;
