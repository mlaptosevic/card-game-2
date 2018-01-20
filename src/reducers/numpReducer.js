export const numpReducer = (state = 2, action) => {
    switch (action.type) {
        case "NUMP":
            return action.amount;
        default:
            return state;
    }
};
