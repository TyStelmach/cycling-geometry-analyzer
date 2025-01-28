import { FunctionComponent } from 'preact';
import { drawSpacersOnScreen } from '../../utils/drawings';
import Spacer from './Spacer';
import { SpacerProps } from './SpacerTypes';

const SpacerStack: FunctionComponent<SpacerProps> = ({
  totalHeight = 0,
  x,
  y,
  width,
  rotation,
  theme = 'theme-default',
  stemColor,
}) => {
  const spacers = drawSpacersOnScreen(totalHeight);
  let currentYAxis = y;

  return (
    <g>
      {spacers.map((spacerHeight, index) => {
        const spacer = (
          <Spacer
            key={index}
            height={spacerHeight * 3}
            x={x}
            y={currentYAxis}
            width={width}
            rotation={rotation}
            theme={theme}
            stemColor={stemColor}
          />
        );
        currentYAxis += spacerHeight * 3;
        return spacer;
      })}
    </g>
  );
}

export default SpacerStack;