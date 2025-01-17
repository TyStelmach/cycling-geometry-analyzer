import { XYCoordinateProps } from './global';

export interface StemConfigProps {
  name: string;
  exactLength: number;
  exactHeight: number;
  faceLength: number;
  collarLength: number;
  faceDepth: number;
  shaftLength: number;
  stackHeight: number;
  angle: number;
  diagrams: StemConfigDiagram
}

export interface StemStateObjProps {
  angle: number;
  id: string;
  length: number;
  stackHeight: number;
}

export interface FrameStateObjProps {
  id: string;
  headtubeAngle: number;
}

interface StemConfigDiagram {
  face: StemConfigDiagramInfo;
  collar: StemConfigDiagramInfo;
}

export interface StemConfigDiagramInfo {
  path: string;
  width: number;
  height: number;
  connections: StemConfigDiagramConnections;
}

interface StemConfigDiagramConnections {
   top: XYCoordinateProps;
   bottom: XYCoordinateProps;
   floor: XYCoordinateProps;
}
