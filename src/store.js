import {reducer} from './reducer.js';
import {createStore} from 'redux';

const getInitialState= ()=>{
  return {
    nump: 2,
    name: '',
    cards: [],
    points: [],
    table: []
  };
};

export const store = createStore(reducer, getInitialState());
