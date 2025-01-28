import { FunctionComponent, JSX } from 'preact';
import { ControlPanelProps } from './WorkspaceTypes';
import NumberInput from '../inputs/NumberInput';
import TextInput from '../inputs/TextInput';
import { StemStateObjProps, FrameStateObjProps } from '../../../types';
import { initializeNewElement,removeExistingStem, getStemTheme, toggleFrameAngles } from '../../utils/drawings';
import Button from '../inputs/Button';

const ControlPanel: FunctionComponent<ControlPanelProps> = ({
  stems,
  frames,
  updateStems,
  updateFrames,
  setClickedElementId,
}) => {
  const totalStems = stems.length;

  return (
    <div class="control-panel-wrapper">
        <p>Use the following controls to add new elements to the workspace. The workspace grid will update live as you adjust the angles and specs of your Stems and Frames.</p>
        <p>Compare up to (3) stems, across (2) different framesets</p>

        <div class="control-panel">
          <div class="frame-metrics">
            {frames.map((frame: FrameStateObjProps, index: number) => (
              <div class="multiframe multiframe-${index}">
                <h3>{frame.name ? frame.name : `Frameset ${index+1}`}</h3>
                <TextInput 
                  name='Frame Name'
                  value={frame.name}
                  type='string'
                  onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
                    updateFrames.updateField(frame.id, 'name', e.currentTarget.value)
                  }
                />

                <NumberInput 
                  name='Headtube Angle'
                  value={frame.headtubeAngle}
                  type='number'
                  step={0.25}
                  min={65}
                  max={80}
                  onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
                    updateFrames.updateField(frame.id, 'headtubeAngle', Number(e.currentTarget.value))
                  }
                />
              </div>
            ))}
          </div>
          
          <div class="stem-metrics">
            {stems.map((stem: StemStateObjProps, index: number) => (
              <div class={`multistem multistem-${index} ${getStemTheme(totalStems, index)}`} key={stem.id}>
                <h3>{stem.name ? stem.name : `Stem ${index+1}`}</h3>
                <TextInput 
                  name='Stem Name'
                  value={stem.name}
                  type='string'
                  onChange={(e: JSX.TargetedEvent<HTMLInputElement>) => 
                    updateStems.updateField(stem.id, 'name', e.currentTarget.value)
                  }
                />

                <NumberInput 
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

                <NumberInput
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

                <NumberInput 
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
                    name='Remove this stem'
                    value='Remove this stem'
                    disabled={false}
                    onClick={() => {removeExistingStem(stems[index].id, updateStems.removeObject)}}
                  />
                }
              </div>
            ))}
          </div>
        </div>
        {frames.length > 1 &&
          <div class="control-panel frame-buttons">
            {frames.map((frame, index) => (
              <Button
                key={frame.id}
                name={frame.id}
                value={frame.name ? frame.name : `Frame ${frame.id.split('-')[1]}`}
                disabled={frame.active}
                onClick={() => setClickedElementId(frame.id)}
              />
            ))}
          </div>
        }

        <div class="control-panel control-buttons">
          <Button
            name='New Frame'
            value='New Frame'
            disabled={frames.length >= 2}
            onClick={(e) => {initializeNewElement('frame', frames, updateFrames.updateObject)}}
          />

          <Button
            name='New Stem'
            value='New Stem'
            disabled={stems.length >= 3}
            onClick={(e) => {initializeNewElement('stem', stems, updateStems.updateObject)}}
          />
        </div>
    </div>
  )
}

export default ControlPanel;