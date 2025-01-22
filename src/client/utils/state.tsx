import { HasId, StateUpdater } from '../../types';

export const createStateUpdater = <T extends HasId>(
  state: T | T[],
  setState: (value: T | T[]) => void
): StateUpdater<T> => {
  return {
    updateField: (id, field, value) => {
      if (Array.isArray(state)) {
        setState(
          state.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
        );
      } else {
        setState(state.id === id ? { ...state, [field]: value } : state);
      }
    },
    updateObject: (newObject) => {
      if (Array.isArray(state)) {
        setState([...state, newObject]);
      } else {
        setState(state.id === newObject.id ? newObject : state);
      }
    },
    removeObject: (id) => {
      if (Array.isArray(state)) {
        const filteredStems = state.filter(item => item.id !== id);        
        const reindexedStems = filteredStems.map((stem, index) => ({
          ...stem,
          id: `stem-${index}`
        }));

        setState(reindexedStems);
      }
    }
  };
};