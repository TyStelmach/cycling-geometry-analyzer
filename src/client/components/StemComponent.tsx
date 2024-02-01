import { FunctionComponent } from 'preact';
import StemFragment from './fragments/StemFragment';

type DiagramProps = {
  diagrams: {
    front: string;
    back: string;
  }
}

interface StemProps {
  stemData: DiagramProps; //need to type
}

const StemComponent: FunctionComponent<StemProps> = ({
  stemData
}) => {
  const { diagrams } = stemData;

  return (
    <div class="stem">
      <div class="stem-fragments">
        <div class="stem-lines" />
        <StemFragment direction="back" diagramFilePath={diagrams.back} />
        <StemFragment direction="front" diagramFilePath={diagrams.front} />
      </div>
    </div>
  );
}

export default StemComponent;