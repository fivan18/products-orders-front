import { createSelector } from 'reselect';

const selectItem = (state) => state.item;

export const selectItems = createSelector(
  [selectItem],
  (item) => item.items,
);

export const selectInProgress = createSelector(
  [selectItem],
  (item) => item.inProgress,
);

export const ivancito = 'ivancito';
