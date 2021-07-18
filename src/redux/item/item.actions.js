import ItemActionTypes from './item.types';

export const addItems = (items) => ({
  type: ItemActionTypes.ADD_ITEMS,
  payload: items,
});

export const setInProgress = (inProgress) => ({
  type: ItemActionTypes.SET_IN_PROGRESS,
  payload: inProgress,
});

export const ivancito = 'ivancito';
