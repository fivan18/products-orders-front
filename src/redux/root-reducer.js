import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import fooReducer from './foo/foo.reducer';
import itemReducer from './item/item.reducer';

const rootReducer = combineReducers({
  foo: fooReducer,
  session: sessionReducer,
  item: itemReducer,
});

export default rootReducer;
