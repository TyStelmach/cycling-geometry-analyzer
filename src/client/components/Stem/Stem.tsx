import { FunctionComponent } from 'preact';
import { calculateStackOffset, calculateStemCoords } from '../../utils/calculations';
import MergedStemFragments from './MergedStemFragments';

const Stem: FunctionComponent = ({
  stem,
  frame,
  config,
  gridSize,
  gridCenter,
  gridRatio
}) => {
  const stemCoords = calculateStemCoords(stem, gridCenter);
  const stemStackOffset = calculateStackOffset(stem.stackHeight, frame.headtubeAngle);

  const mainTransformation = `translate(${stemStackOffset.x} ${stemStackOffset.y}) 
    rotate(${frame.headtubeAngle - 90} ${stemCoords.collar.center.x} ${stemCoords.collar.center.y})`;
  const faceTransformation = `rotate(${-stem.angle} ${stemCoords.face.center.x} ${stemCoords.face.center.y})`;

  return (
    <g transform={mainTransformation}>
      {/* Reference line */}
      <line
        x1={stemCoords.collar.center.x}
        y1={0}
        x2={stemCoords.collar.center.x}
        y2={gridSize}
        stroke="#0066cc"
        strokeWidth={2}
        strokeDasharray="8 4"
      />

      <MergedStemFragments
        config={config}
        stem={stem}
        fragment1={{
          position: 'collar',
          x: stemCoords.collar.center.x,
          y: stemCoords.collar.center.y,
          scale: gridRatio,
          rotation: 0,
          connectionPoint1: config.diagrams.collar.connections.top,
          connectionPoint2: config.diagrams.collar.connections.bottom,
          floorPoint1: config.diagrams.collar.connections.floor,
        }}
        fragment2={{
          position: 'face',
          x: stemCoords.face.center.x,
          y: stemCoords.face.center.y,
          scale: gridRatio,
          rotation: 0,
          connectionPoint1: config.diagrams.face.connections.top,
          connectionPoint2: config.diagrams.face.connections.bottom,
          additionalTransformation: faceTransformation,
          floorPoint1: config.diagrams.face.connections.floor,
        }}
      />
    </g>
  );
};

export default Stem;