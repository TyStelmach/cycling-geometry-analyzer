import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import { plotCoordsOnStemComponent } from '../../utils/drawUtils'


interface StemFragmentProps {
  direction: string;
  diagramFilePath: string;
  coords: object;
}

const StemFragment: FunctionComponent<StemFragmentProps> = ({
  direction,
  diagramFilePath,
  coords,
}) => {

  useEffect(() => {
    plotCoordsOnStemComponent(coords, direction);

  });


  return (
    <div class={`stem-${direction} fragment`}>
      <img src={diagramFilePath} type="image/svg+xml" />
      <div class="top-point debug"></div>
      <div class="bottom-point debug"></div>
      <div class="center-point debug"></div>
    </div>
  )
}

export default StemFragment;