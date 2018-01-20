import {reducer} from './reducers/reducer.js';
import {createStore} from 'redux';

export const store = createStore(reducer);
