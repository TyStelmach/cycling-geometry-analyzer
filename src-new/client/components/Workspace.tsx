import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { calculateStemCoords } from '../utils/calculations';
import { drawSpacersOnScreen } from '../utils/drawings';
import ControlPanel from './Controlpanel';
import CartesianGrid from './CartesianGrid';
import Stem from './stem/Stem';
import Thomson from '../configs/thomson';

const Workspace: FunctionComponent = ({
  stem,
  updateStem,
  frame,
  updateFrame,
  gridSize,
  gridCenter,
  gridRatio,

}) => {
  console.log(Thomson)
  return (
  <div>

    <ControlPanel 
      stem={stem}
      frame={frame}
      updateStem={updateStem}
      updateFrame={updateFrame}
      calculateStemCoords={(stem) => calculateStemCoords(stem, gridCenter, gridRatio)}
      calculateSpacer={drawSpacersOnScreen}
    />

    <svg width={gridSize} height={gridSize} className='cartesian-svg'>
      <CartesianGrid 
        gridSize={gridSize}
        gridCenter={gridCenter}
        gridRatio={gridRatio} 
      />
      
      <Stem
        key={stem.id}
        stem={stem}
        frame={frame}
        config={Thomson}
        headtubeAngle={frame.headtubeAngle}
        gridSize={gridSize}
        gridCenter={gridCenter}
        gridRatio={gridRatio}
      />
    </svg>   
  </div>
)
  };

export default Workspace;