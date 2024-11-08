/* eslint-disable */

import { useRef, useCallback } from 'react';

const EARTH_RADIUS = 6371000;
const CANVAS_CENTER = 400;
const CANVAS_SCALE = 200;

interface SimulationState {
  isRunning: boolean;
  time: number;
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

const useCanvasSetup = (simulationState: SimulationState) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const miniCanvasRef = useRef<HTMLCanvasElement>(null);

  const setupSimulation = useCallback(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(CANVAS_CENTER, CANVAS_CENTER, CANVAS_SCALE, 0, 2 * Math.PI);
    ctx.fillStyle = '#1d4ed8';
    ctx.fill();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.stroke();

    setupMiniVisualizer();
  }, []);

  const setupMiniVisualizer = useCallback(() => {
    const miniCanvas = miniCanvasRef.current!;
    const ctx = miniCanvas.getContext('2d')!;
    const width = miniCanvas.width;
    const height = miniCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#001a00';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, i * 50, 0, 2 * Math.PI);
      ctx.stroke();
    }

    for (let angle = 0; angle < 360; angle += 30) {
      const radian = (angle * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(radian) * 200, centerY + Math.sin(radian) * 200);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((Date.now() / 1000) % (2 * Math.PI));
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(0, 255, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 200, 0, Math.PI / 8);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#00ff00';
    for (let i = 0; i < 5; i++) {
      const distance = Math.random() * 200;
      const angle = Math.random() * 2 * Math.PI;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const size = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.strokeStyle = '#336633';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, width, height);
  }, []);

  const updateCanvasPosition = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setupSimulation();

      const canvasX = CANVAS_CENTER + (x / EARTH_RADIUS) * CANVAS_SCALE;
      const canvasY = CANVAS_CENTER - (y / EARTH_RADIUS) * CANVAS_SCALE;

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
      ctx.fill();
    },
    [setupSimulation]
  );

  const updateMiniVisualizer = useCallback(
    (r: number) => {
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
      ctx.lineTo(baseX + (rocketWidth / 2) * Math.sin(rocketAngle), baseY + (rocketWidth / 2) * Math.cos(rocketAngle));
      ctx.lineTo(baseX - (rocketWidth / 2) * Math.sin(rocketAngle), baseY - (rocketWidth / 2) * Math.cos(rocketAngle));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#bfdbfe';
      ctx.beginPath();
      ctx.arc(
        baseX + (rocketLength / 4) * Math.cos(rocketAngle),
        baseY - (rocketLength / 4) * Math.sin(rocketAngle),
        3,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      const finLength = 10;
      const finWidth = 5;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(baseX + (finWidth / 2) * Math.cos(rocketAngle), baseY - (finWidth / 2) * Math.sin(rocketAngle));
      ctx.lineTo(
        baseX + finLength * Math.sin(rocketAngle - Math.PI / 6),
        baseY + finLength * Math.cos(rocketAngle - Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(baseX - (finWidth / 2) * Math.cos(rocketAngle), baseY + (finWidth / 2) * Math.sin(rocketAngle));
      ctx.lineTo(
        baseX + finLength * Math.sin(rocketAngle + Math.PI / 6),
        baseY + finLength * Math.cos(rocketAngle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f97316';
      const flameLength = Math.random() * 10 + 15;
      const flameWidth = 8;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(baseX + (flameWidth / 2) * Math.sin(rocketAngle), baseY + (flameWidth / 2) * Math.cos(rocketAngle));
      ctx.lineTo(baseX - flameLength * Math.cos(rocketAngle), baseY + flameLength * Math.sin(rocketAngle));
      ctx.lineTo(baseX - (flameWidth / 2) * Math.sin(rocketAngle), baseY - (flameWidth / 2) * Math.cos(rocketAngle));
      ctx.closePath();
      ctx.fill();
    },
    [simulationState, setupMiniVisualizer]
  );

  const animateExplosion = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      const canvasX = 400 + (x / EARTH_RADIUS) * 200;
      const canvasY = 400 - (y / EARTH_RADIUS) * 200;
      let radius = 0;
      const maxRadius = 50;
      const animationSpeed = 2;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setupSimulation();
        drawExplosion(ctx, canvasX, canvasY, radius);
        radius += animationSpeed;

        if (radius < maxRadius) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    },
    [setupSimulation]
  );

  const drawExplosion = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0.8)');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.fillStyle = gradient;

    ctx.shadowColor = 'rgba(255, 200, 0, 1)';
    ctx.shadowBlur = 30;

    ctx.fill();

    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius + 5, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 200, 0, 0.5)';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };

  return {
    canvasRef,
    miniCanvasRef,
    setupSimulation,
    updateCanvasPosition,
    updateMiniVisualizer,
    animateExplosion
  };
};

export default useCanvasSetup;
