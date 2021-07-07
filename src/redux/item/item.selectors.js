import { createSelector } from 'reselect';

const selectItem = (state) => state.item;

export const selectItems = createSelector(
  [selectItem],
  (item) => item.items,
);

export const ivancito = 'ivancito';
