import { HasId } from '../../types';

/**
 * Updates the state values of current objects on the workspace (Stem / Frame)
 * @param state - Object to update
 * @param setState - State updating function
 * @returns Emits an update to the selected state obejct
 */
export const createStateUpdater = <T extends HasId>(
  state: T,
  setState: (value: T) => void
) => (id: T['id'], field: keyof T, value: T[keyof T]) =>
  setState(state.id === id ? { ...state, [field]: value } : state);