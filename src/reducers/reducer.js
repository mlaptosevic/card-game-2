import {combineReducers} from "redux";
import {cardReducer} from "./cardReducer";
import {currentPlayersReducer} from "./currentPlayersReducer";
import {numpReducer} from "./numpReducer";
import {playerNameReducer} from "./playerNameReducer";
import {pointsReducer} from "./pointsReducer";
import {tableReducer} from "./tableReducer";
import {winnersReducer} from "./winnersReducer";

export const reducer = combineReducers({
    cards: cardReducer,
    currentPlayer: currentPlayersReducer,
    nump: numpReducer,
    playersName: playerNameReducer,
    points: pointsReducer,
    tableCards: tableReducer,
    winners: winnersReducer
});
