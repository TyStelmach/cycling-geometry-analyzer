import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

const StemFragment: FunctionComponent = ({
  config,
  position,
  scale,
  x,
  y,
}) => {
  console.log(config)
  const diagramConfig = position === 'collar' ? config.diagrams.collar : config.diagrams.face;
  const svgBaseWidth = position === 'collar' ? config.collarLength : config.faceLength
  const svgBaseHeight = config.exactHeight;

  const width = svgBaseWidth * scale;
  const height = svgBaseHeight * scale;

  const adjustedXAxis = x - (width / 2);
  const adjustedYAxis = y - (height / 2);


  return (
    <g transform={`translate(${adjustedXAxis},${adjustedYAxis})`}>
      <image
        href={diagramConfig.path}
        width={width}
        height={height}
      />
    </g>
  )
}

export default StemFragment;