import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';



const StemFragment: FunctionComponent = ({
  config,
  position,
  scale,
  x,
  y,
  updateStemCoords,
}) => {
  console.log(config)
  const diagramConfig = position === 'collar' ? config.diagrams.collar : config.diagrams.face;
  const svgBaseWidth = position === 'collar' ? config.collarLength : config.faceLength
  const svgBaseHeight = config.exactHeight;

  const width = svgBaseWidth * scale;
  const height = svgBaseHeight * scale;

  const adjustedXAxis = x - (width / 2);
  const adjustedYAxis = y - (height / 2);

  useEffect(() => {
    const stemDebugCoords = {
      top: {
        x: adjustedXAxis + (width * (diagramConfig.connections.top.x / 100)),
        y: adjustedYAxis + (height * (diagramConfig.connections.top.y / 100))
      },
      bottom: {
        x: adjustedXAxis + (width * (diagramConfig.connections.bottom.x / 100)),
        y: adjustedYAxis + (height * (diagramConfig.connections.bottom.y / 100))
      }
    };
    updateStemCoords(stemDebugCoords);
  }, [adjustedXAxis, adjustedYAxis, width, height])

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