import ItemActionTypes from './item.types';
import { defaultItems } from './item.data';

const INITIAL_STATE = {
  items: defaultItems,
  inProgress: false,
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.ADD_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case ItemActionTypes.SET_IN_PROGRESS:
      return {
        ...state,
        inProgress: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
