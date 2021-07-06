export const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    nextPage: null,
    previousPage: null,
}


export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'POSTS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'POSTS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.posts,
                nextPage: action.payload.nextPage,
                previousPage: action.payload.previousPage,
            };
        case 'POSTS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error("unhandled post fetch action");
    }
}