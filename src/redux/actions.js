import { SET_USER } from "../utils/constants";

export function setUser(data) {
    return {
        type: SET_USER,
        value: data
    };
};