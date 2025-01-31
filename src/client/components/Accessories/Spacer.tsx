import { FunctionComponent } from 'preact';
import { SpacerProps } from './SpacerTypes';

const Spacer: FunctionComponent<SpacerProps> = ({
  height = 0,
  x,
  y,
  width,
  rotation,
  theme,
  stemColor
}) => {
  return (
    <rect
      className={`stem-spacer ${theme}`}
      x={x - width / 2}
      y={y}
      width={width}
      height={height}
      fill='transparent'
      stroke={stemColor}
      strokeWidth={1}
      transform={`rotate(${rotation} ${x} ${y})`}
    />
  )
}

export default Spacer;