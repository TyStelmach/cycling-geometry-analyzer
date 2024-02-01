import { render } from 'preact'
import App from './app.tsx'
import './index.css'

import stem from './configs/stem.tsx'

(async () => {
  const root = document.getElementById('app');
  render(<App stemData={stem} />, root)
})();
