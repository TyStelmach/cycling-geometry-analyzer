import { useEffect, useState, useCallback } from 'preact/hooks'
import './app.css'

import { setGapInStemComponent, drawLinesOnStem } from './utils/drawUtils';
import StemComponent from './components/StemComponent'


/* Handles all the calculations to render a stem to screen */
const initialStemBoxSetup = (data: object) => {
  const grid = document.querySelector('.stem');
  const stemFragments = document.querySelectorAll('.stem-fragments .fragment');

  setGapInStemComponent(data.reach, data.exactLength);
  drawLinesOnStem(grid);

  stemFragments.forEach(fragment => {
    const direction = fragment.getAttribute('data-direction');
    // setMaxHeightForImage(direction, data.exactHeight);

    console.log('dir', direction);


  })
}

const App: FunctionComponent<AppPropls> = ({
  stemData,
}) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleWindowResize = useCallback(event => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    const grid = document.querySelector('.stem');

    window.addEventListener('resize', handleWindowResize);
    drawLinesOnStem(grid);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
}, [windowSize]);

  useEffect(() => {
    initialStemBoxSetup(stemData)
  }, [])





  return (
    <>
      <StemComponent stemData={stemData} />       
    </>
  )
}

export default App;