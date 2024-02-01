import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'

import stem from './configs/stem.tsx'

console.log(stem)
render(<App stemData={stem} />, document.getElementById('app')!)
