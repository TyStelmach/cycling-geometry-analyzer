import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import StemFragment from './fragments/StemFragment';
import { setGapInStemComponent } from '../utils/drawUtils';

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
  const { diagrams, coords, length } = stemData;

  return (
    <div class="stem">
      
      <div class="stem-fragments">
        <div class="stem-lines">
          <svg width="100%" height="100%">
            <line class="stem-top-line" stroke="black" stroke-width="2"/>
          </svg>
          <svg width="100%" height="100%">
            <line class="stem-bottom-line" stroke="black" stroke-width="2"/>
          </svg>
        </div>  
        <StemFragment direction="back" diagramFilePath={diagrams.back} coords={coords}/>
        <StemFragment direction="front" diagramFilePath={diagrams.front} coords={coords}/>
      </div>
    </div>
  );
}

export default StemComponent;