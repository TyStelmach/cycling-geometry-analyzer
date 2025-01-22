import { FunctionComponent } from 'preact';
import { calculateStemCoords } from '../../utils/calculations';
import { StemComponentProps } from './StemTypes';
import MergedStemFragments from './MergedStemFragments';

const Stem: FunctionComponent<StemComponentProps> = ({
  key,
  className,
  stem,
  frame,
  config,
  gridSize,
  gridCenter,
  gridRatio,
  theme,
}) => {
  const stemCoords = calculateStemCoords(stem, gridCenter);
  // Stem does not offset vertically with stack change
  const stemStackOffset = {x: 0, y: 0};

  const mainTransformation = `translate(${stemStackOffset.x} ${stemStackOffset.y}) 
    rotate(${frame.headtubeAngle - 90} ${stemCoords.collar.center.x} ${stemCoords.collar.center.y})`;
  const faceTransformation = `rotate(${-stem.angle} ${stemCoords.face.center.x} ${stemCoords.face.center.y})`;

  return (
    <g transform={mainTransformation} key={`newStem-${key}`} className={className}>
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
        className={className}
        config={config}
        stem={stem}
        theme={theme}
        fragment1={{
          position: 'collar',
          x: stemCoords.collar.center.x,
          y: stemCoords.collar.center.y,
          scale: gridRatio,
          rotation: 0,
          connectionPoint1: config.diagrams.collar.connections.top,
          connectionPoint2: config.diagrams.collar.connections.bottom,
          floorPoint1: config.diagrams.collar.connections.floor,
          config: config,
          stem: stem,
          theme: theme,
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
          config: config,
          stem: stem,
          theme: theme,
        }}
      />
    </g>
  );
};

export default Stem;