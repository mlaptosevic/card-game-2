import {reducer} from './reducer.js';
import {createStore} from 'redux';

const getInitialState = () => {
    return {
        nump: 2,
        playersName: [],
        cards: [],
        points: [],
        tableCards: [],
        currentPlayer: 0,
        winners: [-1]
    };
};

export const store = createStore(reducer, getInitialState());
