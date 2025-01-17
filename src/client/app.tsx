import { useEffect, useState, useCallback } from 'preact/hooks'
import './app.css';

import Workspace from './components/Workspace'
import ControlPanel from './components/Controlpanel';


const App = () => {

  // Grid Information
  const PIXELS_PER_MM = 3;
  const GRID_SIZE = 600;
  const GRID_CENTER = GRID_SIZE / 2;

  const [frame, setFrame] = useState({
    id: 'frame-1',
    headtubeAngle: 73,
  });

  const [stem, setStem] = useState({
    id: 'stem-1',
    length: 100,
    angle: 6,
    stackHeight: 0,
  })

  const updateStem = (id, field, value) => {
    setStem(stem.id === id ? { ...stem, [field]: value } : stem);
  }

  const updateFrame = (id, field, value) => {
    setFrame(frame.id === id ? { ...frame, [field]: value } : frame);
  }

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