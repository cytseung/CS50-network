export const initialState = {
    isLoading: false,
    isError: false,
}


export const registerReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error("unhandled register action");
    }
}