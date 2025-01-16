import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { convertMmToPixels } from '../utils/mathUtils';

const Workspace: FunctionComponent = ({
  gridSize,
  pixelsPerMm
}) => {

  console.log(gridSize)
  const drawGridLines = (size: number) => {
    const gridLines: SVGLineElement[] = [];
    const gridStep = 10;
    const gridCenter = gridSize / 2;
    console.log(gridCenter)
    for (let i = -gridCenter; i <= gridCenter; i += convertMmToPixels(gridStep, pixelsPerMm)) {
      
      //Generate a new line element, and push it to gridLines Array
      gridLines.push(
        <line
          className={i === 0 ? 'grid-center-line' : 'grid-line'}
          key={`vertical-axis-${i}`}
          x1={gridCenter + i}
          y1={0}
          x2={gridCenter + i}
          y2={gridSize}
        />,
        <line
          className={i === 0 ? 'grid-center-line' : 'grid-line'}
          key={`horizontal-axis-${i}`}
          x1={0}
          y1={gridCenter + i}
          x2={gridSize}
          y2={gridCenter + i}
        />
      );
    }
    return gridLines;
  };

  return (
    <svg class="workspace cartesian-svg" width={gridSize} height={gridSize}>
      {drawGridLines(gridSize)}
    </svg>
  )
}

export default Workspace;