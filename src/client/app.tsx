import { useEffect, useState } from 'preact/hooks'
import './app.css'

import StemComponent from './components/StemComponent'



const App: FunctionComponent<AppPropls> = ({
  stemData,
}) => {
  return (
    <>
      <StemComponent stemData={stemData} />       
    </>
  )
}

export default App;