import { UpdateFunction, FrameStateObjProps, StemStateObjProps } from "../../../types";

export interface GridProps {
  gridSize: number;
  gridCenter: number;
  gridRatio: number;
  gridStep?: number;
}

export interface WorkspaceProps {
  stem: StemStateObjProps;
  frame: FrameStateObjProps;
  gridSize: number;
  gridCenter: number;
  gridRatio: number;
  updateStems: UpdateFunction<StemStateObjProps>;
  updateFrame: UpdateFunction<FrameStateObjProps>;
}

export interface ControlPanelProps {
  stems: StemStateObjProps[];
  frame: FrameStateObjProps;
  updateStems: UpdateFunction<StemStateObjProps>;
  updateFrame: UpdateFunction<FrameStateObjProps>;
}
