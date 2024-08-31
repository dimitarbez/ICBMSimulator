import React, { RefObject } from 'react';
import './SimulationDisplay.css'; // Make sure to import the CSS file

interface SimulationDisplayProps {
    canvasRef: RefObject<HTMLCanvasElement>;
  }
  
  const SimulationDisplay: React.FC<SimulationDisplayProps> = ({ canvasRef }) => {
    return (
      <div className="simulation-display" style={{ flex: 2, maxWidth: '100%' }}>
        <h2>ICBM Simulation</h2>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={800} 
          style={{ backgroundColor: '#000' }}
        />
      </div>
    );
  };
  
  export default SimulationDisplay;