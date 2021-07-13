import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'


import { API_ROOT } from '../config/global'
import Navbar from '../components/Navbar'
import { useAuthState } from '../auth/context'
import { fetchData } from '../fetchposts/actions'
import { initialState as postsInitialState, postsReducer } from '../fetchposts/reducer';
import Paginator from '../components/Paginator';
import Postlist from '../components/Postlist';

const User = () => {
    const userDetails = useAuthState();
    let { username } = useParams();
    const [posts, dispatch] = React.useReducer(
        postsReducer,
        postsInitialState
    );
    const [currentPage, setCurrentPage] = React.useState(1)
    const [exists, SetExists] = React.useState(false);
    const [followersNum, setFollowersNum] = React.useState();
    const [isFollowing, setIsFollowing] = React.useState(false);

    const check_username = React.useCallback(async () => {
        const payload = { username: username }
        try {
            console.log(payload)
            const response = await axios.post(`${API_ROOT}user/check_user_exist/`, payload);
            console.log(response)
            if (response.status === 200) {
                if (response.data.exist === true) {
                    console.log(true);
                    SetExists(true);
                } else {
                    SetExists(false)
                }

            } else {
                console.log("an error occurred")
            }

        } catch (e) {
            console.log(e);
        }
    }, [username])

    const fetch = async () => {
        const following = false;
        try {
            await fetchData(dispatch, currentPage, following, username);
        } catch (e) {
            console.log(e);
        }
    }

    const checkuser_fetch = React.useCallback(async () => {
        // if (userDetails.user) {
        await check_username();
        console.log(exists)
        if (exists) {
            await fetch()
        } else {
            console.log(exists)
            return (
                <Redirect
                    to={{ pathname: "/page-not-found" }}
                />
            )
        }
        // }
    }, [check_username, username, exists])

    React.useEffect(() => {

        async function check_isFollowing() {
            if (!userDetails.user)
                return
            try {
                let response = await axios.get(`${API_ROOT}user/${username}/`);
                if (response.data.followers.indexOf(userDetails.user.user_id) !== -1) {
                    setIsFollowing(true);
                }
            } catch (e) {
                console.log(e)
            }
        }
        check_isFollowing()}, [])

    React.useEffect(() => {
        async function check_and_fetch() {
            await checkuser_fetch();
        }
        check_and_fetch();
    }, [checkuser_fetch, exists])

    React.useEffect(() => {
        async function fetchPosts() {
            if (exists)
                await fetch();
        }
        fetchPosts();
    }, [currentPage, exists])

    React.useEffect(() => {

    }, [])

    // React.useEffect(() => {
    //     let response = check_username()
    //     if (response === true)
    //         fetch()
    //     else
    //         return <Redirect
    //             to={{ pathname: "/page-not-found" }}
    //         />
    // }, [currentPage])


    if (exists) {
        return (

            <div>
                <Navbar />
                <h2>Profile Page</h2>
                <h2>{username}</h2>
                {isFollowing?<p>Following</p>:<p>Not Following</p>}
                {userDetails.user ? <button>Follow</button> : null}
                {posts.isError && <p>Something went wrong...</p>}
                {posts.isLoading ? (<p>Loading...</p>) : (<Postlist postlist={posts.data} />)}

                <Paginator
                    previousPage={posts.previousPage}
                    nextPage={posts.nextPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        )
    } else {
        return <p>This user does not exist</p>
    }
}

export default User
