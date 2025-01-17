import { FunctionComponent } from 'preact';
import { WorkspaceProps } from './WorkspaceTypes'
import ControlPanel from './Controlpanel';
import CartesianGrid from './CartesianGrid';
import Stem from '../Stem/Stem';
import Thomson from '../../configs/thomson';

const Workspace: FunctionComponent<WorkspaceProps> = ({
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
        gridSize={gridSize}
        gridCenter={gridCenter}
        gridRatio={gridRatio}
      />
    </svg>   
  </div>
)
  };

export default Workspace;