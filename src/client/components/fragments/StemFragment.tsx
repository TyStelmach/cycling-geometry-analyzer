import { FunctionComponent } from 'preact';

interface StemFragmentProps {
  direction: string;
  diagramFilePath: string;
}

const StemFragment: FunctionComponent<StemFragmentProps> = ({
  direction,
  diagramFilePath,
}) => {

  return (
    <div class={`stem-${direction}`}>
      <object data={diagramFilePath} type="image/svg+xml"></object>
      <div class="top-point debug"></div>
      <div class="bottom-point debug"></div>
      <div class="center-point debug"></div>
    </div>
  )
}

export default StemFragment;