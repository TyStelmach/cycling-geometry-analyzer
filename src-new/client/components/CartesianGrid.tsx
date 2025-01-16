import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { convertMmToPixels } from '../utils/calculations';

const CartesianGrid = ({
  gridSize,
  gridCenter,
  gridRatio,
  gridStep = 10
}) => {
  const gridElements = [];
  const convertMmToPixels = (mm, ratio) => mm * ratio;
  
  for (let i = -gridCenter; i <= gridCenter; i += convertMmToPixels(gridStep, gridRatio)) {
    // Grid lines
    gridElements.push(
      <line
        className={i === 0 ? 'grid-center-line' : 'grid-line'}
        key={`vertical-axis-${i}`}
        x1={gridCenter + i}
        y1={0}
        x2={gridCenter + i}
        y2={gridSize}
        stroke="#ccc"
        strokeWidth={i === 0 ? 2 : 1}
      />,
      <line
        className={i === 0 ? 'grid-center-line' : 'grid-line'}
        key={`horizontal-axis-${i}`}
        x1={0}
        y1={gridCenter + i}
        x2={gridSize}
        y2={gridCenter + i}
        stroke="#ccc"
        strokeWidth={i === 0 ? 2 : 1}
      />
    );
  }
  return (
    <svg 
      width={gridSize} 
      height={gridSize}
      className="bg-white"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <g>{gridElements}</g>
    </svg>
  );
};

export default CartesianGrid