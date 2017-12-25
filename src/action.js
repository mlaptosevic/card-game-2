
export const NumberPlayers = (nump) => {
  return {
    type: 'NUMP',
    amount: nump
  }
}

export const PlayerName = (name) => {
  return {
      type: 'PLAYER_NAME',
      name: name
  };
};

export const AddCards = (cards, index) => {
  return {
    type: 'ADD_CARDS',
    cards: cards,
    index: index
  };
};

export const SendCardFromStoreToTable = (cardId, playerId) => {
  return {
    type: 'SEND_CARD_FROM_STORE_TO_TABLE',
    cardId: cardId,
    playerId: playerId
  };
};
