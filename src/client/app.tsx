import { useState } from 'preact/hooks'
import './app.css'

import StemComponent from './components/StemComponent'



export function App({
  stemData,
}) {

  return (
    <>
      <StemComponent stemData={stemData} />       
    </>
  )
}
