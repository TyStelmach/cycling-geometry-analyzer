import { FunctionComponent } from 'preact';
import { getRotatedPoint, parseTransformationCoords, applyTransformationCoords } from '../../utils/cartesianCoords';
import { StemFragmentProps } from './StemTypes';
import SpacerStack from '../Accessories/SpacerStack';

const StemFragment: FunctionComponent<StemFragmentProps> = ({
  theme,
  position,
  x,
  y,
  scale,
  rotation = 0,
  connectionPoint1,
  connectionPoint2,
  floorPoint1,
  additionalTransformation = '',
  config,
  stem,
}) => {
  const svgWidth = position === 'collar' ? config.collarLength : config.faceLength;
  const svgHeight = config.exactHeight;
  const width = svgWidth * scale;
  const height = svgHeight * scale;
  const headtubeAngleTransformation = `translate(${x - width / 2}, ${y - height / 2}) rotate(${rotation}, ${width / 2}, ${height / 2})`;

  const initialPoint1 = getRotatedPoint(x, y, connectionPoint1.x, connectionPoint1.y, rotation, scale);
  const initialPoint2 = getRotatedPoint(x, y, connectionPoint2.x, connectionPoint2.y, rotation, scale);

  if (additionalTransformation) {
    const transform = parseTransformationCoords(additionalTransformation);
    if (transform) {
      // Transformed Point 1 & 2
      applyTransformationCoords(initialPoint1, transform);
      applyTransformationCoords(initialPoint2, transform);
    }
  }

  // Calculate spacer dimensions for collar only
  const spacerWidth = width * 0.7; // 80% of collar width
  const bottomPoint = Math.max(floorPoint1.y * scale);
  
  return (
    <g transform={additionalTransformation}>
      <g transform={headtubeAngleTransformation}>
        <image
          href={position === 'collar' ? config.diagrams.collar.path : config.diagrams.face.path}
          width={width}
          height={height}
          className={`fragment-image ${theme}`}
        />

        {/* Add spacers only for collar fragment */}
        {position === 'collar' && stem && stem.stackHeight > 0 && (
          <SpacerStack
            totalHeight={stem.stackHeight}
            x={width / 2}
            y={height / 2 + bottomPoint}
            width={spacerWidth}
            rotation={0}
            theme={theme}
          />
        )}
      </g>
    </g>
  );
};

export default StemFragment;