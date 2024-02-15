import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import StemFragment from './fragments/StemFragment';
import Stem from '../segments/Stem';

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
const [newStem, setNewStem] = useState();

const initStem = (data) => {
  const { backLength, faceLength, shaftLength, stackHeight, exactHeight, angle } = data;
  const stemWrapper = document.querySelector('.stem');
  console.log('newAngle', angle);
  const stem = new Stem({
    angle,
    backLength,
    shaftLength,
    faceLength,
    stackHeight,
    exactHeight,
    grid: stemWrapper,
  });

  setNewStem(stem);
}

const drawStem = () => {
  const polygon =  document.querySelector('#stem-shaft-drawing');
  const line =  document.querySelector('#stem-shaft-centerline');
  if (newStem) {
    newStem.clean(polygon, line);
    newStem.size();
    newStem.draw();
  }
}
  
useEffect(() => {
  initStem(stemData);
}, [stemData]);

useEffect(() => {
  if (newStem) {
    drawStem();
  }

  window.addEventListener('resize', drawStem);
  return () => window.removeEventListener('resize', drawStem);
}, [newStem]);

  return (
    <div class="stem">
      <StemFragment direction="back" diagramFilePath={stemData.diagrams.back} coords={stemData.coords}/>
      <svg class="stem-coords cartesian-svg"></svg>
      <StemFragment direction="front" diagramFilePath={stemData.diagrams.front} coords={stemData.coords}/>
    </div>
  );
}

// {/* X and Y axes will be drawn dynamically */}
{/* <line class="axis-line" x1="0" y1="50%" x2="100%" y2="50%" />
<line class="axis-line" x1="50%" y1="0" x2="50%" y2="100%" /> */}

export default StemComponent;