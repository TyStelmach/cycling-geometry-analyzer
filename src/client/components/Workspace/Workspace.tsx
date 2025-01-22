import { FunctionComponent } from 'preact';
import { WorkspaceProps } from './WorkspaceTypes'
import ControlPanel from './Controlpanel';
import CartesianGrid from './CartesianGrid';
import Stem from '../Stem/Stem';
import Thomson from '../../configs/thomson';
import { StemStateObjProps } from '../../../types';
import { getStemTheme } from '../../utils/drawings';

const Workspace: FunctionComponent<WorkspaceProps> = ({
  stems,
  updateStems,
  frame,
  updateFrame,
  gridSize,
  gridCenter,
  gridRatio,
}) => {
  const totalStems = stems.length;

  return (
  <div>
      <ControlPanel
        stems={stems}
        frame={frame}
        updateStems={updateStems}
        updateFrame={updateFrame}
      />

    <svg width={gridSize} height={gridSize} className='cartesian-svg'>
      <CartesianGrid 
        gridSize={gridSize}
        gridCenter={gridCenter}
        gridRatio={gridRatio} 
      />
      
      {stems.map((stem: StemStateObjProps, index: number) => (
        <Stem
          className={stems.length > 1 ? 'multi-stem' : ''}
          key={index}
          stem={stem}
          theme={getStemTheme(totalStems, index)}
          frame={frame}
          config={Thomson}
          gridSize={gridSize}
          gridCenter={gridCenter}
          gridRatio={gridRatio}
        />
      ))}

    </svg>   
  </div>
)
  };

export default Workspace;