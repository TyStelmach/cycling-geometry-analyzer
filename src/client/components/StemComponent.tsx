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
  const { diagrams, coords, backLength, faceLength, shaftLength, stackHeight, exactHeight, angle } = stemData;
  const [newStem, setNewStem] = useState();

const drawStem = (stem) => {
  const polygon =  document.querySelector('#stem-shaft-drawing');
  const line =  document.querySelector('#stem-shaft-centerline');
  stem.clean(polygon, line);
  stem.size();
  stem.draw();
}
  
const handleResize = () => {
  drawStem(newStem);
};



useEffect(() => {
  const stemWrapper = document.querySelector('.stem');
  const stem = new Stem({
    angle,
    backLength,
    shaftLength: 100,
    faceLength,
    stackHeight,
    exactHeight,
    grid: stemWrapper,
  });

  drawStem(stem);
  setNewStem(stem);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty dependency array ensures effect runs only once after initial render

useEffect(() => {
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [newStem]);

  return (
    <div class="stem">
      <StemFragment direction="back" diagramFilePath={diagrams.back} coords={coords}/>
      <svg class="stem-coords cartesian-svg"></svg>
      <StemFragment direction="front" diagramFilePath={diagrams.front} coords={coords}/>
    </div>
  );
}

// {/* X and Y axes will be drawn dynamically */}
{/* <line class="axis-line" x1="0" y1="50%" x2="100%" y2="50%" />
<line class="axis-line" x1="50%" y1="0" x2="50%" y2="100%" /> */}

export default StemComponent;