import React, { RefObject } from 'react';
import './SimulationDisplay.css'; // Make sure to import the CSS file

interface SimulationDisplayProps {
    canvasRef: RefObject<HTMLCanvasElement>;
  }
  
  const SimulationDisplay: React.FC<SimulationDisplayProps> = ({ canvasRef }) => {
    return (
      <div className="controls-panel" style={{ flex: 2, maxWidth: '900px' }}>
        <h2>ICBM Simulation</h2>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600} 
          style={{ backgroundColor: '#000' }}
        />
      </div>
    );
  };
  
  export default SimulationDisplay;