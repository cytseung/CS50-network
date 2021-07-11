import React from 'react'

import Navbar from '../components/Navbar'
import Postlist from '../components/Postlist';
import Paginator from '../components/Paginator';

import { initialState as postsInitialState, postsReducer } from '../fetchposts/reducer';
import { fetchData } from '../fetchposts/actions';


const Following = () => {

    const [posts, dispatch] = React.useReducer(
        postsReducer,
        postsInitialState
    );
    const [currentPage, setCurrentPage] = React.useState(1)
    React.useEffect(() => {
        const fetch = async () => {
            const following = true;
            await fetchData(dispatch, currentPage, following);
        }
        fetch();
    }, [currentPage])
    
    return (
        <div>
            <Navbar />
            <h2>Following</h2>
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

export default Following
