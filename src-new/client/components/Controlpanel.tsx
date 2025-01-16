import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import TextInput from './inputs/TextInput';

const ControlPanel: FunctionComponent = ({
  stem,
  frame,
  updateStem,
  updateFrame,
  calculateStemCoords,
  calculateSpacers,
}) => {
  return (
    <div>
      <div class="stem-metrics">
        <h4>Frame Metrics</h4>
        <TextInput 
          name='Headtube Angle'
          value={frame.headtubeAngle}
          type='number'
          step='0.25'
          min='65'
          max='80'
          onChange={(e) => updateFrame(frame.id, 'headtubeAngle', Number(e.target.value))}
        />
      </div>
      <div class="stem-metrics">
        <h4>Stem Metrics</h4>
        <TextInput 
          name='Length (mm)'
          value={stem.length}
          type='number'
          step='5'
          min='20'
          max='300'
          onChange={(e) => updateStem(stem.id, 'length', Number(e.target.value))}
        />

        <TextInput 
          name='Angle (degrees)'
          value={stem.angle}
          type='number'
          step='1'
          min='-80'
          max='80'
          onChange={(e) => updateStem(stem.id, 'angle', Number(e.target.value))}
        />

        <TextInput 
          name='Stack Height (mm)'
          value={stem.stackHeight}
          type='number'
          step='1'
          min='0'
          max='50'
          onChange={(e) => updateStem(stem.id, 'stackHeight', Number(e.target.value))}
        />
      </div>
      
    </div>
  )
}

export default ControlPanel;