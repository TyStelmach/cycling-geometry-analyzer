import { useEffect, useState } from 'preact/hooks'
import './app.css';

import { createStateUpdater } from './utils/state';
import Workspace from './components/Workspace/Workspace'
import { FrameStateObjProps, StemStateObjProps } from '../types';
import { createNewStem, updateStemColors } from './utils/drawings';

const App = () => {
  // Grid Information
  const PIXELS_PER_MM = 3;
  const GRID_SIZE = 600;
  const GRID_CENTER = GRID_SIZE / 2;

  const [frame, setFrame] = useState<FrameStateObjProps>({
    id: 'frame-1',
    headtubeAngle: 73,
  });

  const [stems, setStems] = useState<StemStateObjProps[]>([]);

  const updateStems = createStateUpdater(stems, setStems);
  const updateFrame = createStateUpdater(frame, setFrame);

  useEffect(() => {
    console.log(stems, stems.length);  // This will log the updated state after it changes.
  }, [stems, frame]);

  useEffect(() => {
    console.log('hello')
    if (stems.length === 0) {
      createNewStem(stems, updateStems.updateObject);
    } else {
      updateStemColors(stems, updateStems.updateField);
    }
  }, [stems.length])
  return (
    <div class="app-wrapper">
      <Workspace
        stems={stems}
        frame={frame}
        updateStems={updateStems}
        updateFrame={updateFrame}
        gridSize={GRID_SIZE}
        gridCenter={GRID_CENTER}
        gridRatio={PIXELS_PER_MM}
      />
    </div>
  )
}

export default App;