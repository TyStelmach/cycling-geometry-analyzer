import { FunctionComponent } from 'preact';
import { SpacerProps } from './SpacerTypes';

const Spacer: FunctionComponent<SpacerProps> = ({
  height = 0,
  x,
  y,
  width,
  rotation,
}) => {
  return (
    <rect
      className='stem-spacer'
      x={x - width / 2}
      y={y}
      width={width}
      height={height}
      fill='#cccccc'
      stroke='#999999'
      strokeWidth={1}
      transform={`rotate(${rotation} ${x} ${y})`}
    />
  )
}

export default Spacer;