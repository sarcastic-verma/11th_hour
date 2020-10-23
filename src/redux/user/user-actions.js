import UserTypes from "./user-types";

export const setSomeUserShit = user => ({
    type: UserTypes.SET_SOME_USER_SHIT,
    payload: user
})