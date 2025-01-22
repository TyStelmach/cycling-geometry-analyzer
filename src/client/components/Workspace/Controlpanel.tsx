import { FunctionComponent, JSX } from 'preact';
import { ControlPanelProps } from './WorkspaceTypes';
import TextInput from '../inputs/TextInput';
import { StemStateObjProps } from '../../../types';
import { createNewStem,removeExistingStem, getStemTheme } from '../../utils/drawings';
import Button from '../inputs/Button';

const ControlPanel: FunctionComponent<ControlPanelProps> = ({
  stems,
  frame,
  updateStems,
  updateFrame,
}) => {
  const totalStems = stems.length;

  return (
    <div class="control-panel-wrapper">
      <div class="frame-metrics control-panel">
        <h4>Frame Metrics</h4>
        <TextInput 
          name='Headtube Angle'
          value={frame.headtubeAngle}
          type='number'
          step={0.25}
          min={65}
          max={80}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
            updateFrame.updateField(frame.id, 'headtubeAngle', Number(e.currentTarget.value))
          }
        />

        <Button
          name='New Stem'
          value='New Stem'
          disabled={stems.length >= 3}
          onClick={(e) => {createNewStem(stems, updateStems.updateObject)}}
        />
      </div>
      {stems.map((stem: StemStateObjProps, index: number) => (
        <div class={`stem-metrics multistem-${index} control-panel ${getStemTheme(totalStems, index)}`} key={stem.id}>
          <h3>Stem {index+1} Metrics</h3>
          <TextInput 
            name='Length (mm)'
            value={stem.length}
            type='number'
            step={5}
            min={20}
            max={300}
            onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
              updateStems.updateField(stem.id, 'length', Number(e.currentTarget.value))
            }
          />

          <TextInput 
            name='Angle (degrees)'
            value={stem.angle}
            type='number'
            step={1}
            min={-35}
            max={35}
            onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
              updateStems.updateField(stem.id, 'angle', Number(e.currentTarget.value))
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
              updateStems.updateField(stem.id, 'stackHeight', Number(e.currentTarget.value))
            }
          />

          {totalStems > 1 &&
            <Button
              name='Remove Stem'
              value='Remove Stem'
              disabled={false}
              onClick={() => {removeExistingStem(stems[index].id, updateStems.removeObject)}}
            />
          }
        </div>
      ))}
      
    </div>
  )
}

export default ControlPanel;