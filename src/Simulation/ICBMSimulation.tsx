/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import SimulationDisplay from './Components/SimulationDisplay';
import ControlsPanel from './Components/ControlsPanel';
import earthImage from './Images/earth.png';
import {
  EARTH_RADIUS,
  EARTH_MASS,
  G,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  EARTH_CANVAS_RADIUS,
  EARTH_CENTER_X,
  EARTH_CENTER_Y,
  EARTH_IMAGE_SIZE,
  EARTH_IMAGE_OFFSET,
  MISSILE_MASS,
  DT
} from './constants';

interface SimulationState {
  isRunning: boolean;
  time: number;
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

const ICBMSimulation: React.FC = () => {
  const [launchAngle, setLaunchAngle] = useState(17);
  const [initialVelocity, setInitialVelocity] = useState(5600);
  const [timeScale, setTimeScale] = useState(20);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    time: 0,
    positionX: EARTH_RADIUS,
    positionY: 0,
    velocityX: 0,
    velocityY: 0
  });
  const [hasCrashed, setHasCrashed] = useState(false);
  const [trajectory, setTrajectory] = useState<{ x: number; y: number }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const earthImageObj = new Image();
  earthImageObj.src = earthImage;

  useEffect(() => {
    earthImageObj.onload = () => {
      if (canvasRef.current) {
        setupSimulation();
      }
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      setupSimulation();
    }
  }, []);

  const setupSimulation = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the Earth image
    ctx.save();
    ctx.beginPath();
    ctx.arc(EARTH_CENTER_X, EARTH_CENTER_Y, EARTH_CANVAS_RADIUS, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(
      earthImageObj,
      EARTH_CENTER_X - EARTH_IMAGE_SIZE / 2 + EARTH_IMAGE_OFFSET,
      EARTH_CENTER_Y - EARTH_IMAGE_SIZE / 2 + EARTH_IMAGE_OFFSET,
      EARTH_IMAGE_SIZE,
      EARTH_IMAGE_SIZE
    );
    ctx.restore();

    // Redraw the Earth's atmosphere with inner and outer glow
    ctx.beginPath();
    ctx.arc(EARTH_CENTER_X, EARTH_CENTER_Y, EARTH_CANVAS_RADIUS, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(
      EARTH_CENTER_X,
      EARTH_CENTER_Y,
      EARTH_CANVAS_RADIUS - 10,
      EARTH_CENTER_X,
      EARTH_CENTER_Y,
      EARTH_CANVAS_RADIUS + 20
    );
    gradient.addColorStop(0, 'rgba(0, 100, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 100, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const startSimulation = () => {
    if (!simulationState.isRunning) {
      const launchAngleRad = (launchAngle * Math.PI) / 180;
      setSimulationState({
        isRunning: true,
        time: 0,
        positionX: EARTH_RADIUS,
        positionY: 0,
        velocityX: initialVelocity * Math.sin(launchAngleRad),
        velocityY: initialVelocity * Math.cos(launchAngleRad)
      });
    }
  };

  const pauseSimulation = () => {
    setSimulationState((prevState: SimulationState) => ({ ...prevState, isRunning: false }));
  };

  const resetSimulation = () => {
    setSimulationState({
      isRunning: false,
      time: 0,
      positionX: EARTH_RADIUS,
      positionY: 0,
      velocityX: 0,
      velocityY: 0
    });
    setHasCrashed(false);
    setTrajectory([]);
    setupSimulation();
  };

  useEffect(() => {
    if (simulationState.isRunning) {
      const animationId = requestAnimationFrame(updatePosition);
      return () => cancelAnimationFrame(animationId);
    }
  }, [simulationState]);

  const updatePosition = () => {
    if (!simulationState.isRunning && !hasCrashed) return;

    const dt = DT * timeScale;
    const { positionX, positionY, velocityX, velocityY, time } = simulationState;

    const r = Math.sqrt(positionX ** 2 + positionY ** 2);
    const gravAcceleration = (G * EARTH_MASS) / r ** 2;
    const gravAccelerationX = (-gravAcceleration * positionX) / r;
    const gravAccelerationY = (-gravAcceleration * positionY) / r;

    const newVelocityX = velocityX + gravAccelerationX * dt;
    const newVelocityY = velocityY + gravAccelerationY * dt;
    const newPositionX = positionX + newVelocityX * dt;
    const newPositionY = positionY + newVelocityY * dt;

    if (r >= EARTH_RADIUS && !hasCrashed) {
      setSimulationState({
        ...simulationState,
        time: time + dt,
        positionX: newPositionX,
        positionY: newPositionY,
        velocityX: newVelocityX,
        velocityY: newVelocityY
      });
      setTrajectory((prevTrajectory) => [...prevTrajectory, { x: newPositionX, y: newPositionY }].slice(-500));
      updateCanvasPosition(newPositionX, newPositionY);
    } else if (!hasCrashed) {
      setSimulationState({ ...simulationState, isRunning: false });
      setHasCrashed(true);
      animateExplosion(newPositionX, newPositionY);
    }
  };

  const updateCanvasPosition = (x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Redraw the Earth image
    ctx.save();
    ctx.beginPath();
    ctx.arc(EARTH_CENTER_X, EARTH_CENTER_Y, EARTH_CANVAS_RADIUS, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(
      earthImageObj,
      EARTH_CENTER_X - EARTH_IMAGE_SIZE / 2 + EARTH_IMAGE_OFFSET,
      EARTH_CENTER_Y - EARTH_IMAGE_SIZE / 2 + EARTH_IMAGE_OFFSET,
      EARTH_IMAGE_SIZE,
      EARTH_IMAGE_SIZE
    );
    ctx.restore();

    // Redraw the Earth's atmosphere with inner and outer glow
    ctx.beginPath();
    ctx.arc(EARTH_CENTER_X, EARTH_CENTER_Y, EARTH_CANVAS_RADIUS, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(
      EARTH_CENTER_X,
      EARTH_CENTER_Y,
      EARTH_CANVAS_RADIUS - 10,
      EARTH_CENTER_X,
      EARTH_CENTER_Y,
      EARTH_CANVAS_RADIUS + 20
    );
    gradient.addColorStop(0, 'rgba(0, 100, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 100, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw trajectory
    if (trajectory.length > 1) {
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Add glow effect
      ctx.shadowColor = 'rgba(0, 255, 0, 0.5)';
      ctx.shadowBlur = 10;

      for (let i = 1; i < trajectory.length; i++) {
        const start = trajectory[i - 1];
        const end = trajectory[i];
        const startX = EARTH_CENTER_X + (start.x / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;
        const startY = EARTH_CENTER_Y - (start.y / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;
        const endX = EARTH_CENTER_X + (end.x / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;
        const endY = EARTH_CENTER_Y - (end.y / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;

        // Create a gradient for each segment
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        const alpha = Math.min(1, (i / trajectory.length) * 2); // Fade in over the first half
        gradient.addColorStop(0, `rgba(0, 255, 0, ${alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(0, 255, 0, ${alpha})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Reset shadow for other drawings
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    // Draw current position
    const canvasX = EARTH_CENTER_X + (x / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;
    const canvasY = EARTH_CENTER_Y - (y / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;

    // Add a glow effect to the current position
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Add a brighter core to the current position
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawExplosion = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    // Create a radial gradient for a more intense, bright effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // White core
    gradient.addColorStop(0.3, 'rgba(255, 255, 0, 1)'); // Bright yellow
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0.8)'); // Bright orange edge

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    // Apply the gradient
    ctx.fillStyle = gradient;

    // Add an intense glow effect
    ctx.shadowColor = 'rgba(255, 200, 0, 1)';
    ctx.shadowBlur = 30;

    ctx.fill();

    // Bright, strong outline
    ctx.strokeStyle = '#FFFF00'; // Bright yellow
    ctx.lineWidth = 4;
    ctx.stroke();

    // Add an extra outer glow
    ctx.beginPath();
    ctx.arc(x, y, radius + 5, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 200, 0, 0.5)';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };

  const animateExplosion = (x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const canvasX = EARTH_CENTER_X + (x / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;
    const canvasY = EARTH_CENTER_Y - (y / EARTH_RADIUS) * EARTH_CANVAS_RADIUS;
    let radius = 0;
    const maxRadius = 50;
    const animationSpeed = 0.1;

    const animate = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Redraw the Earth image
      ctx.save();
      ctx.beginPath();
      ctx.arc(EARTH_CENTER_X, EARTH_CENTER_Y, EARTH_CANVAS_RADIUS, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(
        earthImageObj,
        EARTH_CENTER_X - EARTH_IMAGE_SIZE / 2 + EARTH_IMAGE_OFFSET,
        EARTH_CENTER_Y - EARTH_IMAGE_SIZE / 2 + EARTH_IMAGE_OFFSET,
        EARTH_IMAGE_SIZE,
        EARTH_IMAGE_SIZE
      );
      ctx.restore();

      // Redraw the Earth's atmosphere
      ctx.beginPath();
      ctx.arc(EARTH_CENTER_X, EARTH_CENTER_Y, EARTH_CANVAS_RADIUS, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 5;
      ctx.stroke();

      drawExplosion(ctx, canvasX, canvasY, radius);
      radius += animationSpeed;

      if (radius < maxRadius) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };
  return (
    <div className="row">
      <div className="col-12 col-md-8 my-3">
        <SimulationDisplay canvasRef={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      </div>
      <div className="col-12 col-md-4 my-3">
        <ControlsPanel
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
    </div>
  );
};

export default ICBMSimulation;
