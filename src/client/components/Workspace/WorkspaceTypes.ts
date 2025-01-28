import { UpdateFunction, FrameStateObjProps, StemStateObjProps } from "../../../types";

export interface GridProps {
  gridSize: number;
  gridCenter: number;
  gridRatio: number;
  gridStep?: number;
}

export interface WorkspaceProps {
  stems: StemStateObjProps[];
  frames: FrameStateObjProps[];
  gridSize: number;
  gridCenter: number;
  gridRatio: number;
  updateStems: UpdateFunction<StemStateObjProps>;
  updateFrames: UpdateFunction<FrameStateObjProps>;
  setClickedElementId: (id: string | null) => void;
}

export interface ControlPanelProps {
  stems: StemStateObjProps[];
  frames: FrameStateObjProps[];
  updateStems: UpdateFunction<StemStateObjProps>;
  updateFrames: UpdateFunction<FrameStateObjProps>;
  setClickedElementId: (id: string | null) => void;
}
