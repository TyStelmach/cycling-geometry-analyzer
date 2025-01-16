import { FunctionComponent } from 'preact';
import { drawSpacersOnScreen } from '../../utils/drawings';
import Spacer from './Spacer';
const SpacerStack: FunctionComponent = ({
  totalHeight,
  x,
  y,
  width,
  rotation,
}) => {
  const spacers = drawSpacersOnScreen(totalHeight);
  let currentYAxis = y;

  return (
    <g>
      {spacers.map((spacerHeight, index) => {
        const spacer = (
          <Spacer
            key={index}
            height={spacerHeight}
            x={x}
            y={currentYAxis}
            width={width}
            rotation={rotation}
          />
        );
        currentYAxis += spacerHeight;
        return spacer;
      })}
    </g>
  );
}

export default SpacerStack;