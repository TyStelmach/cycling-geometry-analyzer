import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { setCartesianOrigin } from '../utils/drawUtils';
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
  const { debug, backLength, faceLength, reach, stackHeight, exactHeight, angle } = data;
  const stemWrapper = document.querySelector('.stem');
  console.log('newAngle', angle);
  const stemStart = new Stem({
    angle,
    backLength,
    reach,
    faceLength,
    stackHeight,
    exactHeight,
    debug,
    stem: stemWrapper,
  });

  setNewStem(stemStart);
}

const drawStem = () => {
  const line =  document.querySelectorAll('.stem-body-line');
  if (newStem) {
    newStem.clean(line);
    newStem.plotDebug();
    newStem.size();
    newStem.draw();
  }
}

const applyStemFragments = (backDiagram, frontDiagram) => {
  const stem = document.querySelector('.stem');
  stem.style.setProperty('--before-image', `url("${backDiagram}")`);
  stem.style.setProperty('--after-image', `url("${frontDiagram}")`);
}

useEffect(() => {
  const svg = document.querySelector('.stem-coords');
  // setCartesianOrigin(svg, svg?.clientWidth, svg?.clientHeight, 20);
})
  
useEffect(() => {
  initStem(stemData);
}, [stemData]);

useEffect(() => {
  if (newStem) {
    applyStemFragments(stemData.diagrams.back, stemData.diagrams.front);
    drawStem();
  }

  window.addEventListener('resize', drawStem);
  return () => window.removeEventListener('resize', drawStem);
}, [newStem]);

  return (
    <>
      <div class="stem-container">
        <div class="stem">
          <div class="backstem-plots">
            <div class="backstem-top top-point debug-point debug"></div>
            <div class="backstem-center center-point debug-point debug"></div>
            <div class="backstem-bottom bottom-point debug-point  debug"></div>
          </div>
            
          <div class="frontstem-plots">
            <div class="frontstem-top top-point debug-point debug"></div>
            <div class="frontstem-center center-point debug-point debug"></div>
            <div class="frontstem-bottom bottom-point debug-point  debug"></div>
          </div>
        </div>
        <svg class="stem-coords">
        </svg>
      </div>
    </>
  );
}

// {/* X and Y axes will be drawn dynamically */}
{/* <line class="axis-line" x1="0" y1="50%" x2="100%" y2="50%" />
<line class="axis-line" x1="50%" y1="0" x2="50%" y2="100%" /> */}

export default StemComponent;