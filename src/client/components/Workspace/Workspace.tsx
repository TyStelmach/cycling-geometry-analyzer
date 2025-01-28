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
  frames,
  updateFrames,
  gridSize,
  gridCenter,
  gridRatio,
  setClickedElementId,
}) => {
  const totalStems = stems.length;
  const activeFrame = frames.length > 1 ? frames.find(frame=> frame.active) : frames[0];
  return (
  <div className="workspace-panel">
      <ControlPanel
        stems={stems}
        frames={frames}
        updateStems={updateStems}
        updateFrames={updateFrames}
        setClickedElementId={setClickedElementId}
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
          frame={activeFrame}
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