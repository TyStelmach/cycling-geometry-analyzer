import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { calculateStackOffset, calculateStemCoords } from '../../utils/calculations';
import StemFragment from './StemFragement';

const Stem: FunctionComponent = ({
  stem,
  frame,
  config,
  gridSize,
  gridCenter,
  gridRatio
}) => {
  console.log('aa', frame)

  const stemCoords = calculateStemCoords(stem, gridCenter);
  const stemStackOffset = calculateStackOffset(stem.stackHeight, frame.headtubeAngle);
  const stemRotationAngle = frame.headtubeAngle - 90;
  const compositeTransformation = `translate(${stemStackOffset.x} ${stemStackOffset.y}) rotate(${stemRotationAngle} ${stemCoords.collar.center.x} ${stemCoords.collar.center.y})`;

  return (
    <g transform={compositeTransformation}>

      <line
        x1={stemCoords.collar.center.x}
        y1={0}
        x2={stemCoords.collar.center.x}
        y2={gridSize}
        stroke="#0066cc"
        strokeWidth={2}
        strokeDasharray="8 4"
      />

      <StemFragment
        config={config}
        position="collar"
        scale={gridRatio}
        x={stemCoords.collar.center.x}
        y={stemCoords.collar.center.y}
      />

      <StemFragment
        config={config}
        position="face"
        scale={gridRatio}
        x={stemCoords.face.center.x}
        y={stemCoords.face.center.y}
      />
    </g>
  )
}

export default Stem;