export const initialState = {
    isFollowing: false,
    followButtonText: "Follow",

}


export const followReducer = (state, action) => {
    switch (action.type) {
        case 'FOLLOWED':
            return {
                isFollowing: true,
                followButtonText:"Unfollow"
            };
        case 'UNFOLLOWED':
            return {
                isFollowing: false,
                followButtonText:"Follow"
            }
        default:
            throw new Error("unhandled  action");
    }
}