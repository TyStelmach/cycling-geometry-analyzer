import { useEffect, useState } from 'preact/hooks'
import './app.css';

import { createStateUpdater } from './utils/state';
import Workspace from './components/Workspace/Workspace'
import { FrameStateObjProps, StemStateObjProps } from '../types';

const App = () => {
  // Grid Information
  const PIXELS_PER_MM = 3;
  const GRID_SIZE = 600;
  const GRID_CENTER = GRID_SIZE / 2;

  const [frame, setFrame] = useState<FrameStateObjProps>({
    id: 'frame-1',
    headtubeAngle: 73,
  });

  const [stem, setStem] = useState<StemStateObjProps>({
    id: 'stem-1',
    length: 100,
    angle: 6,
    stackHeight: 0,
  });

  const updateStem = createStateUpdater(stem, setStem);
  const updateFrame = createStateUpdater(frame, setFrame);

  useEffect(() => {
    console.log(stem);  // This will log the updated state after it changes.
    console.log(frame)
  }, [stem, frame]);
  return (
    <div class="app-wrapper">
      <Workspace
        stem={stem}
        frame={frame}
        updateStem={updateStem}
        updateFrame={updateFrame}
        gridSize={GRID_SIZE}
        gridCenter={GRID_CENTER}
        gridRatio={PIXELS_PER_MM}
      />
    </div>
  )
}

export default App;