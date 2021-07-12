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
    const [isLoading, setIsLoading] = React.useState(false);
    const [posts, dispatch] = React.useReducer(
        postsReducer,
        postsInitialState
    );
    const [currentPage, setCurrentPage] = React.useState(1)
    const [exists, SetExists] = React.useState(false);

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
        setIsLoading(true);
        if (userDetails.user) {
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
        }
    }, [check_username, username, exists])

    React.useEffect(() => {
        async function check_and_fetch() {
            await checkuser_fetch();
        }
        check_and_fetch();
    }, [checkuser_fetch])

    React.useEffect(() => {
        async function fetchPosts() {
            await fetch();
        }
        fetchPosts();
    }, [currentPage])

    // React.useEffect(() => {
    //     let response = check_username()
    //     if (response === true)
    //         fetch()
    //     else
    //         return <Redirect
    //             to={{ pathname: "/page-not-found" }}
    //         />
    // }, [currentPage])



    return (
        <div>
            <Navbar />
            <h2>Profile Page</h2>
            <h2>{username}</h2>
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
}

export default User
