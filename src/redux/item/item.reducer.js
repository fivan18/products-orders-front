import ItemActionTypes from './item.types';
import { defaultItems } from './item.data';

const INITIAL_STATE = {
  items: defaultItems,
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.ADD_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
