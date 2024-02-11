import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

const WorkspaceComponent: FunctionComponent = () => {
  const generateGridLines = (svg, axis, count) => {
    const group = svg.querySelector(`.${axis}-lines`);
    const width = 100;
    const lineCount = width / count;
    // Zero out attributes
    const defaultAttributes = {
      x1: 0, x2: 0, y1: 0, y2: 0,
    }
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      for (const attr in defaultAttributes) {
        line.setAttribute(attr, defaultAttributes[attr]);
      }
      line.setAttribute('class', 'grid-line');
      line.setAttribute(`${axis}2`, `${width}%`);
      if (axis === 'x') {
        line.setAttribute('y1', `${lineCount * i}%`);
        line.setAttribute('y2', `${lineCount * i}%`);
      } else {
        line.setAttribute('x1', `${lineCount * i}%`);
        line.setAttribute('x2', `${lineCount * i}%`);
      }
      group.appendChild(line)
    }
  }

  useEffect(() => {
    const svg = document.querySelector('svg.workspace');
    generateGridLines(svg, 'x', 10);
    generateGridLines(svg, 'y', 10);
  }, []);

  return (
    <svg class="workspace cartesian-svg">
      <line class="axis-line" x1="0" y1="50%" x2="100%" y2="50%" />
      <line class="axis-line" x1="50%" y1="0" x2="50%" y2="100%" />

      <g class="x-lines">
      </g>
      <g class="y-lines">
        <line class="grid-line" x1="20%" y1="0" x2="20%" y2="100%" />
        <line class="grid-line" x1="40%" y1="0" x2="40%" y2="100%" />
        <line class="grid-line" x1="60%" y1="0" x2="60%" y2="100%" />
        <line class="grid-line" x1="80%" y1="0" x2="80%" y2="100%" />
      </g>
    </svg>
  )
};

export default WorkspaceComponent;