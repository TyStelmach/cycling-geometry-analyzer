import { FunctionComponent } from 'preact';
import { GridProps } from './WorkspaceTypes';
import { convertMmToPixels } from '../../utils/calculations';

const CartesianGrid: FunctionComponent<GridProps> = ({
  gridSize,
  gridCenter,
  gridRatio,
  gridStep = 10
}) => {
  // Set the origin point to be 1/4 of the grid width from the left
  const originX = gridSize / 4;
  const gridElements = [];
  
  // Calculate the number of steps needed on each side of the origin
  const stepsToRight = Math.floor((gridSize - originX) / convertMmToPixels(gridStep, gridRatio));
  const stepsToLeft = Math.floor(originX / convertMmToPixels(gridStep, gridRatio));
  
  // Draw vertical lines
  for (let i = -stepsToLeft; i <= stepsToRight; i++) {
    const x = originX + (i * convertMmToPixels(gridStep, gridRatio));
    gridElements.push(
      <line
        className={i === 0 ? 'grid-center-line' : 'grid-line'}
        key={`vertical-axis-${i}`}
        x1={x}
        y1={0}
        x2={x}
        y2={gridSize}
        stroke="#ccc"
        strokeWidth={i === 0 ? 2 : 1}
      />
    );
  }

  // Draw horizontal lines
  for (let i = -gridCenter; i <= gridCenter; i += convertMmToPixels(gridStep, gridRatio)) {
    gridElements.push(
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