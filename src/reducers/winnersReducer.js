export const winnersReducer = (state = [-1], action) => {
    switch(action.type) {
        case "ADD_WINNER":
            return action.winners;
        default:
            return state;
    }
};

