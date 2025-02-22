import { FrameStateObjProps, StemStateObjProps } from "../../types";

export const StemColors = {
  single: '#000000',
  multiple: ['#ff0000', '#0000ff', '#006401'],
};

export const NewStem: StemStateObjProps = {
  angle: 0,
  id: 'stem-0',
  name: '',
  length: 100,
  stackHeight: 0,
  color: '#000000',
}

export const NewFrame: FrameStateObjProps = {
  id: 'frame-0',
  active: false,
  name: '',
  headtubeAngle: 73,
}