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

export type ElementType = 'frame' | 'stem';

export interface StemStateObjProps {
  angle: number;
  id: string;
  name?: string,
  length: number;
  stackHeight: number;
  color: string;
  active?: boolean
}

export interface FrameStateObjProps {
  id: string;
  active: boolean;
  name?: string;
  color?: string;
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
