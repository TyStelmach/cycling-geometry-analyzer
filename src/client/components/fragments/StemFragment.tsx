import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';


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


  return (
    <div data-direction={direction} class={`stem-${direction} stem-half`}>
      <div class="stem-plot">
        <img src={diagramFilePath} type="image/svg+xml" />
        <div class="plot-point top-point stem-body-point"></div>
        <div class="plot-point bottom-point stem-body-point"></div>
        <div class="plot-point center-point"></div>
        <div class="vertical-center"></div>
      </div>
    </div>
  )
}

export default StemFragment;