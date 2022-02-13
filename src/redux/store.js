import { createStore } from "redux";
import { SET_USER } from "../utils/constants";

const userState = {};

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.value
            }
        default:
            return state;
    }
};

export default createStore(userReducer);

