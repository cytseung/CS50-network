
let user = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "";

let token = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).token
    : "";

export const initialState = {
    userDetail: "" || user,
    token: "" || token,
    loading: false,
    errorMessages: [],
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true,
                errorMessages: [],
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.payload,
                token: action.payload.token,
                loading: false,
                errorMessages: [],
            }
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: "",
                errorMessages: [],
            };
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessages: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}.`)
    }
}