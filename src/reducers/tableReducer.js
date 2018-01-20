import _ from "lodash";

export const tableReducer = (state = [], action) => {
    let newState = _.cloneDeep(state);

    switch (action.type) {
        case "ADD_CARD_TO_TABLE":
            newState[action.index] = action.card;
            return newState;
        case "CLEAR":
            return [];
        default:
            return state;
    }
};