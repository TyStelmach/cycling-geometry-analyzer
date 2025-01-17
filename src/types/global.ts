export type HasId = { id: string | number };

export interface XYCoordinateProps {
  x: number;
  y: number;
}

export interface TransformationProps {
  angle: number;
  centerX: number;
  centerY: number;
}

export type UpdateFunction <T extends { id: string | number }> = <K extends keyof T>(
  id: string,
  field: K,
  value: T[K]
) => void;