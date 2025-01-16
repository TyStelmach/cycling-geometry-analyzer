import { render } from 'preact'
import App from './app.tsx'
import './index.css'


(async () => {
  const root = document.getElementById('app');
  render(<App />, root)
})();
