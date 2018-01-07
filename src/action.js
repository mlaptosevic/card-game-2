
export const NumberPlayers = (nump) => {
  return {
    type: 'NUMP',
    amount: nump
  }
}

export const PlayerName = (name) => {
  return {
      type: 'PLAYER_NAME',
      playersName: name
  };
};

export const AddCards = (cards, index) => {
  return {
    type: 'ADD_CARDS',
    cards: cards,
    index: index
  };
};

export const RemoveCards = (playerIndex, cardCode) => {
    return {
        type: 'REMOVE_CARDS',
        playerIndex: playerIndex,
        cardCode: cardCode
    };
};

export const SendCardFromStoreToTable = (playerId, cardId) => {
  return {
    type: 'SEND_CARD_FROM_STORE_TO_TABLE',
    cardId: cardId,
    playerId: playerId
  };
};

export const IncreasePoints = (playerIndex, points) => {
    return {
        type: 'INCREASE_POINTS',
        playerIndex: playerIndex,
        points: points
    }
};
