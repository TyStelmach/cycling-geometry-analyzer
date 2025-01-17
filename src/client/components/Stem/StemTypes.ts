import { FrameStateObjProps, StemConfigProps, StemStateObjProps } from '../../../types/index';
interface StemCoord {
  x: number;
  y: number;
}

export interface StemFragmentProps {
  position: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  connectionPoint1: StemCoord;
  connectionPoint2: StemCoord;
  floorPoint1: StemCoord;
  additionalTransformation?: string;
  config: StemConfigProps;
  stem: StemStateObjProps;
}

export interface MergedFragmentsProps {
  config: StemConfigProps;
  stem: StemStateObjProps;
  fragment1: StemFragmentProps;
  fragment2: StemFragmentProps;
}

export interface StemComponentProps {
  stem: StemStateObjProps;
  frame: FrameStateObjProps;
  config: StemConfigProps;
  gridSize: number;
  gridCenter: number;
  gridRatio: number;
}