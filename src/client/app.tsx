import { useEffect, useState, useCallback } from 'preact/hooks'
import './app.css'

import StemComponent from './components/StemComponent'
import WorkspaceComponent from './components/WorkspaceComponent'
import SliderInput from './components/inputs/SliderInput'


const App: FunctionComponent<AppPropls> = ({
  stemData,
}) => {

  const [stemFormValues, setStemFormValues] = useState({angle: 0});

  const handleSliderChange = (name, value) => {
    setStemFormValues({ ...stemFormValues, [name]: value})
  };

  useEffect(() => {
    console.log(stemFormValues)
  }, [stemFormValues]);

  return (
    <div class="app-wrapper">
      <div class="workspace-wrapper">
        <WorkspaceComponent />
        <StemComponent stemData={{...stemData, ...stemFormValues}} /> 
      </div>

      <div class="form">
        <SliderInput 
          name="angle"
          min="-64"
          max="64"
          value={stemFormValues?.angle || 0}
          onChange={handleSliderChange}
        />  
      </div>  
    </div>
  )
}

export default App;