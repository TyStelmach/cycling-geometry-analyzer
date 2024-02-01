import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import StemFragment from './fragments/StemFragment';
import { determineGapInStemComponent } from '../utils/drawUtils';

type DiagramProps = {
  diagrams: {
    front: string;
    back: string;
    coords: object,
  }
}

interface StemProps {
  stemData: DiagramProps; //need to type
}

const StemComponent: FunctionComponent<StemProps> = ({
  stemData
}) => {
  const [mounted, setMounted] = useState(false)

  const { diagrams, coords, length } = stemData;

  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    console.log(mounted)
    if (mounted) {
      determineGapInStemComponent(length);
    }
    // determineGapInStemComponent(grid, length);
  })

  return (
    <div class="stem">
      <div class="stem-fragments">
        <div class="stem-lines" />
        <StemFragment direction="back" diagramFilePath={diagrams.back} coords={coords}/>
        <StemFragment direction="front" diagramFilePath={diagrams.front} coords={coords}/>
      </div>
    </div>
  );
}

export default StemComponent;