export interface XYCoordinateProps {
  x: number;
  y: number;
}

export interface TransformationProps {
  angle: number;
  centerX: number;
  centerY: number;
}

/**
 * Updates the state values of current objects on the workspace (Stem / Frame)
 * @param state - Object to update
 * @param setState - State updating function
 * @returns Emits an update to the selected state obejct
 */
export interface HasId {
  id: string | number;
}

export type UpdateFieldFunction<T extends HasId> = <K extends keyof T>(
  id: T['id'],
  field: K,
  value: T[K]
) => void;

export type UpdateObjectFunction<T extends HasId> = (
  newObject: T
) => void;

export type StateUpdater<T extends HasId> = {
  updateField: UpdateFieldFunction<T>;
  updateObject: UpdateObjectFunction<T>;
  removeObject: (id: string | number) => void;
};
