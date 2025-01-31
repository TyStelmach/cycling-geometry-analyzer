import { useEffect, useState } from 'preact/hooks'
import './app.css';

import { createStateUpdater, toggleActiveState } from './utils/state';
import Workspace from './components/Workspace/Workspace'
import { FrameStateObjProps, StemStateObjProps } from '../types';
import { initializeNewElement, updateStemColors } from './utils/drawings';

const App = () => {
  // Grid Information
  const PIXELS_PER_MM = 3;
  const GRID_SIZE = 600;
  const GRID_CENTER = GRID_SIZE / 2;

  const [frames, setFrames] = useState<FrameStateObjProps[]>([]);
  const [stems, setStems] = useState<StemStateObjProps[]>([]);
  const [clickedElementId, setClickedElementId] = useState<string | null>(null);

  const updateStems = createStateUpdater(stems, setStems);
  const updateFrames = createStateUpdater(frames, setFrames);

  useEffect(() => {
    console.log(clickedElementId, frames)

  }, [stems, frames]);

  useEffect(() => {
    if (stems.length === 0) {
      initializeNewElement('frame', frames, updateFrames.updateObject)
      initializeNewElement('stem', stems, updateStems.updateObject);

    } else {
      updateStemColors(stems, updateStems.updateField);
    }
  }, [stems.length])

  useEffect(() => {
    if (clickedElementId) {
      toggleActiveState(frames, clickedElementId, setFrames);
    }

  }, [clickedElementId]);
  
  

  return (
    <div class="app-wrapper">
      <Workspace
        stems={stems}
        frames={frames}
        updateStems={updateStems}
        updateFrames={updateFrames}
        setClickedElementId={setClickedElementId}
        gridSize={GRID_SIZE}
        gridCenter={GRID_CENTER}
        gridRatio={PIXELS_PER_MM}
      />
    </div>
  )
}

export default App;