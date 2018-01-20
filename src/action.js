
export const NumberPlayers = (nump) => {
  return {
    type: 'NUMP',
    amount: nump
  }
};

export const PlayerName = (name, nump) => {
  return {
      type: 'PLAYER_NAME',
      playersName: name,
      nump: nump
  };
};

export const AddCards = (cards, index) => {
  return {
    type: 'ADD_CARDS',
    cards: cards,
    index: index
  };
};

export const AddWinners = (winners) => {
    return {
        type: 'ADD_WINNER',
        winners: winners
    }
};

export const IncreaseCurrentPlayer = (nump) => {
    return {
        type: "INCREASE_CURRENT_PLAYER",
        nump: nump
    };
};

export const Reset = () => {
    return {
        type: "RESET"
    };
};

export const Clear = () => {
    return {
        type: "CLEAR"
    };
};

export const AddCardToTable = (index, card) => {
  return {
    type: 'ADD_CARD_TO_TABLE',
    card: card,
    index: index
  };
};

export const IncreasePoints = (playerIndex, points) => {
    return {
        type: 'INCREASE_POINTS',
        playerIndex: playerIndex,
        points: points
    }
};
