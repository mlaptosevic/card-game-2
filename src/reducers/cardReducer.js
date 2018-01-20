import _ from "lodash";

export const cardReducer = (state = [], action) => {
    let copyState = _.cloneDeep(state);

    switch (action.type) {
        case "ADD_CARDS":
            copyState[action.index] = action.cards;
            return copyState;
        default:
            return state;
    }
};