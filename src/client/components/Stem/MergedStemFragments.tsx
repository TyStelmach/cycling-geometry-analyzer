import { FunctionComponent } from 'preact';
import { MergedFragmentsProps } from './StemTypes';
import { getRotatedPoint, parseTransformationCoords, applyTransformationCoords } from '../../utils/cartesianCoords';
import { drawBezierCurveConnection } from '../../utils/drawings';
import StemFragment from './StemFragment';

const MergedStemFragments: FunctionComponent<MergedFragmentsProps> = ({
  config,
  fragment1,
  fragment2,
  stem
}) => {
  const { 
    position: position1, 
    x: x1, 
    y: y1, 
    scale: scale1, 
    rotation: rotation1, 
    connectionPoint1: connection1, 
    connectionPoint2: connection1B,
    floorPoint1: floor1,
  } = fragment1;

  const { 
    position: position2, 
    x: x2, 
    y: y2, 
    scale: scale2, 
    rotation: rotation2, 
    connectionPoint1: connection2, 
    connectionPoint2: connection2B, 
    additionalTransformation,
    floorPoint1: floor2,
  } = fragment2;

  // Calculate transformed points for fragment1
  const pointFloor1 = getRotatedPoint(x1, y1, floor1.x, floor1.y, rotation1, scale1);
  const point1 = getRotatedPoint(x1, y1, connection1.x, connection1.y, rotation1, scale1);
  const point1B = getRotatedPoint(x1, y1, connection1B.x, connection1B.y, rotation1, scale1);

  // Calculate transformed points for fragment2
  const pointFloor2 = getRotatedPoint(x2, y2, floor2.x, floor2.y, rotation2, scale2);
  const point2 = getRotatedPoint(x2, y2, connection2.x, connection2.y, rotation2, scale2);
  const point2B = getRotatedPoint(x2, y2, connection2B.x, connection2B.y, rotation2, scale2);

  let transformedPointFloor = pointFloor2;
  let transformedPoint2 = point2;
  let transformedPoint2B = point2B;

  if (additionalTransformation) {
    const transform = parseTransformationCoords(additionalTransformation);
    if (transform) {
      transformedPointFloor = applyTransformationCoords(pointFloor2, transform);
      transformedPoint2 = applyTransformationCoords(point2, transform);
      transformedPoint2B = applyTransformationCoords(point2B, transform);
    }
  }

  return (
    <g className="stem-fragments">
      {/* Render Stem Collar */}
      <StemFragment
        position={position1}
        x={x1}
        y={y1}
        scale={scale1}
        rotation={rotation1}
        connectionPoint1={connection1}
        connectionPoint2={connection1B}
        floorPoint1={floor1}
        config={config}
        stem={stem}
      />

      {/* Render Stem Face */}
      <StemFragment
        position={position2}
        x={x2}
        y={y2}
        scale={scale2}
        rotation={rotation2}
        connectionPoint1={connection2}
        connectionPoint2={connection2B}
        floorPoint1={floor2}
        additionalTransformation={additionalTransformation}
        config={config}
        stem={stem}
      /> 

      {/* Render Body Lines using transformed coordinates */}
      <path
      d={drawBezierCurveConnection(point1, transformedPoint2, stem.angle)}
      stroke="#FF0000"
      strokeWidth={1 * scale1}
      fill="none"
      className="connection-line"
    />
    <path
      d={drawBezierCurveConnection(point1B, transformedPoint2B, stem.angle)}
      stroke="#FF0000"
      strokeWidth={1 * scale1}
      fill="none"
      className="connection-line"
    />
    <path
      d={drawBezierCurveConnection(pointFloor1, transformedPointFloor, stem.angle)}
      stroke="#FF0000"
      strokeWidth={1 * scale1}
      fill="none"
      className="connection-line debug"
    />
    </g>
  );
};

export default MergedStemFragments;