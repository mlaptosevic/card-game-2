import _ from "lodash";

export const pointsReducer = (state = [], action) => {
    let copyState = _.cloneDeep(state);

    switch(action.type) {
        case "INCREASE_POINTS":
            if (copyState[action.playerIndex] === undefined)
                copyState[action.playerIndex] = 0;

            copyState[action.playerIndex] += action.points;

            return copyState;
        default:
            return state;
    }
};

