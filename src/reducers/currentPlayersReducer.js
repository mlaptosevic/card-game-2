export const currentPlayersReducer = (state = 0, action) => {
    switch(action.type) {
        case "INCREASE_CURRENT_PLAYER":
            let newState = (state + 1) % action.nump;
            return newState;
        case "RESET":
            return 0;
        default:
            return state;
    }
};
