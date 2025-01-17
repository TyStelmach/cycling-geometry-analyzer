import { FunctionComponent, JSX } from 'preact';
import { ControlPanelProps } from './WorkspaceTypes';
import TextInput from '../inputs/TextInput';

const ControlPanel: FunctionComponent<ControlPanelProps> = ({
  stem,
  frame,
  updateStem,
  updateFrame,
}) => {
  return (
    <div>
      <div class="stem-metrics">
        <h4>Frame Metrics</h4>
        <TextInput 
          name='Headtube Angle'
          value={frame.headtubeAngle}
          type='number'
          step={0.25}
          min={65}
          max={80}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
            updateFrame(frame.id, 'headtubeAngle', Number(e.currentTarget.value))
          }
        />
      </div>
      <div class="stem-metrics">
        <h4>Stem Metrics</h4>
        <TextInput 
          name='Length (mm)'
          value={stem.length}
          type='number'
          step={5}
          min={20}
          max={300}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
            updateStem(stem.id, 'length', Number(e.currentTarget.value))
          }
        />

        <TextInput 
          name='Angle (degrees)'
          value={stem.angle}
          type='number'
          step={1}
          min={-80}
          max={80}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
            updateStem(stem.id, 'angle', Number(e.currentTarget.value))
          }
        />

        <TextInput 
          name='Stack Height (mm)'
          value={stem.stackHeight}
          type='number'
          step={1}
          min={0}
          max={50}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
            updateStem(stem.id, 'stackHeight', Number(e.currentTarget.value))
          }
        />
      </div>
      
    </div>
  )
}

export default ControlPanel;