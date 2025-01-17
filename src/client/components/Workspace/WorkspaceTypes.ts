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
  updateStem: UpdateFunction<StemStateObjProps>;
  updateFrame: UpdateFunction<FrameStateObjProps>;
}

export interface ControlPanelProps {
  stem: StemStateObjProps;
  frame: FrameStateObjProps;
  updateStem: UpdateFunction<StemStateObjProps>;
  updateFrame: UpdateFunction<FrameStateObjProps>;
}
