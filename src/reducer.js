import _ from "lodash";

export const reducer = (state, action) => {
    // let copyState = Object.assign({}, state);
    let copyState = _.cloneDeep(state);

    switch (action.type) {
        case "NUMP":
            return Object.assign(copyState, {nump: action.amount});
        case "PLAYER_NAME":
            return Object.assign(copyState, {name: action.name});
        case "ADD_CARDS":
            copyState.cards[action.index] = action.cards;
            return copyState;
        case "SEND_CARD_FROM_STORE_TO_TABLE":
            let card = copyState.cards[action.playerId].filter((card) => {
                return card.code === action.cardId;
            })[0];

            let newPlayerCards = copyState.cards[action.playerId].filter((card) => {
                return card.code !== action.cardId;
            });

            copyState.tableCards[action.playerId] = card;
            copyState.cards[action.playerId] = newPlayerCards;
            copyState.currentPlayer = (copyState.currentPlayer + 1 ) % copyState.nump

            return copyState;
        case "INCREASE_POINTS":
            if(copyState.points[action.playerIndex]===undefined)
                copyState.points[action.playerIndex] = 0;

            copyState.points[action.playerIndex] += action.points;
            copyState.currentPlayer = 0;
            copyState.tableCards = [];

            // end game
            if(copyState.cards[0] !== undefined && copyState.cards[0].length === 0) {
                let maxNumberOfPoints = copyState.points.reduce((acc, playerPoints)=>{
                    return playerPoints>acc?playerPoints:acc;
                },0);

                let winners = [];

                for(let playerIndex = 0; playerIndex < copyState.nump; playerIndex++)
                    if (copyState.points[playerIndex] === maxNumberOfPoints)
                        winners.push(playerIndex);

                copyState.winners = winners;
            }

            return copyState;

        default:
            return state;
    }
}
