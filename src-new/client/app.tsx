import { useEffect, useState, useCallback } from 'preact/hooks'
import './app.css';

import Workspace from './components/Workspace'


const App = () => {

  // Grid Information
  const PIXELS_PER_MM = 3;
  const GRID_SIZE = 600;
  const GRID_CENTER = GRID_SIZE / 2;

  return (
    <div class="app-wrapper">
      <div class="workspace-wrapper">
        <Workspace gridSize={GRID_SIZE} pixelsPerMm={3} />

      </div>
    </div>
  )
}

export default App;