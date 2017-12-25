
export const reducer=(state,action) => {
  let copyState = Object.assign({}, state);

  switch (action.type){
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

        let newCards = copyState.cards[action.playerId].filter((card) => {
          return card.code !== action.cardId;
        });

        copyState.table[action.playerId] = card;
        copyState.cards[action.playerId] = newCards;

        console.log(copyState);
        
        return copyState;

      default:
        return state;
  }
}
