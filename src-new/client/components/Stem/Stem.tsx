import { FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
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

      {/* Back collar */}
      <StemFragment
        config={config}
        position="collar"
        scale={gridRatio}
        x={stemCoords.collar.center.x}
        y={stemCoords.collar.center.y}
      />

      {/* Front face */}
      <g transform={faceTransformation}>
        <StemFragment
          config={config}
          position="face"
          scale={gridRatio}
          x={stemCoords.face.center.x}
          y={stemCoords.face.center.y}
        />
      </g>
    </g>
  );
};

export default Stem;