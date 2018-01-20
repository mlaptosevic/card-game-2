export const playerNameReducer = (state = [], action) => {
    switch (action.type) {
        case "PLAYER_NAME":
            let playerNames = [];
            playerNames[0] = action.playersName;
            for (let botIndex = 1; botIndex < action.nump; botIndex++)
                playerNames[botIndex] = 'Player' + botIndex;

            return playerNames;
        default:
            return state;
    }
};

