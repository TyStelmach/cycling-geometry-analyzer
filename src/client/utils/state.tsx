import { HasId, StateUpdater, UpdateObjectFunction } from '../../types';

export const createStateUpdater = <T extends HasId>(
  state: T | T[],
  setState: (value: T[]) => void
): StateUpdater<T> => {
  return {
    updateField: (id, field, value) => {
      const updateFn = (prevState: T[]) => 
        prevState.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        );
      
      setState(Array.isArray(state) ? updateFn(state) : [updateFn([state])[0]]);
    },
    updateObject: (newObject) => {
      const updateFn = (prevState: T[]) => {
        const existingIndex = prevState.findIndex(item => item.id === newObject.id);
        
        if (existingIndex !== -1) {
          // Replace existing item
          const updatedState = [...prevState];
          updatedState[existingIndex] = newObject;
          return updatedState;
        } else {
          // Add new item
          return [...prevState, newObject];
        }
      };

      setState(Array.isArray(state) ? updateFn(state) : [newObject]);
    },
    removeObject: (id) => {
      const updateFn = (prevState: T[]) => {
        const filteredItems = prevState.filter(item => item.id !== id);        
        return filteredItems.map((item, index) => ({
          ...item,
          id: `${typeof item === 'object' && 'type' in item ? item.type : 'item'}-${index}`
        }));
      };

      setState(Array.isArray(state) ? updateFn(state) : []);
    }
  };
};

export const toggleActiveState = <T extends { id: string; active: boolean }>(
  items: T[],
  clickedElementId: string,
  setState: (items: T[]) => void
) => {
  const updatedItems = items.map(item => ({
    ...item,
    active: item.id === clickedElementId
  }));

  setState(updatedItems);
};