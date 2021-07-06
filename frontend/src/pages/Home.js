import React from 'react';


import Postlist from '../components/Postlist';
import NewPost from '../components/NewPost'
import Paginator from '../components/Paginator';
import Navbar from '../components/Navbar';

import { initialState as postsInitialState, postsReducer } from '../fetchposts/reducer';
import { fetchData } from '../fetchposts/actions';


// const mockdata = {
//   count: 20,
//   next: "http://127.0.0.1:8000/api/post/?format=json&page=2",
//   previous: null,
//   results: [
//     {
//       id: 27,
//       text: "dmklkvlmtoe",
//       createdOn: "2021-06-10T07:59:33.178055Z",
//       updated: "2021-06-10T07:59:33.178081Z",
//       user: "http://127.0.0.1:8000/api/user/2/?format=json",
//       username: "user2",
//       comments: [
//         "http://127.0.0.1:8000/api/comment/8/?format=json"
//       ],
//       likedUsers: [],
//       url: "http://127.0.0.1:8000/api/post/27/?format=json"
//     },
//     {
//       id: 26,
//       text: "fdsfmas ktgmkl;mrkgl;w",
//       createdOn: "2021-06-10T07:59:29.871748Z",
//       updated: "2021-06-10T07:59:29.871772Z",
//       user: "http://127.0.0.1:8000/api/user/2/?format=json",
//       username: "user2",
//       comments: [],
//       likedUsers: [],
//       url: "http://127.0.0.1:8000/api/post/26/?format=json"
//     },
//     {
//       id: 25,
//       text: "12ml;r1",
//       createdOn: "2021-06-10T07:59:21.954735Z",
//       updated: "2021-06-10T07:59:21.954756Z",
//       user: "http://127.0.0.1:8000/api/user/2/?format=json",
//       username: "user2",
//       comments: [
//         "http://127.0.0.1:8000/api/comment/9/?format=json"
//       ],
//       likedUsers: [],
//       url: "http://127.0.0.1:8000/api/post/25/?format=json"
//     },
//   ]
// };


// const getAsyncPosts = () =>
//   new Promise((resolve,reject) =>
//     setTimeout(
//       () => resolve(mockdata),
//       // reject,
//       1000
//     )
//   );

// const postsReducer = (state, action) => {
//   switch (action.type) {
//     case 'POSTS_FETCH_INIT':
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };
//     case 'POSTS_FETCH_SUCCESS':
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         data: action.payload.posts,
//         nextPage: action.payload.nextPage,
//         previousPage: action.payload.previousPage,
//       };
//     case 'POSTS_FETCH_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };
//     default:
//       throw new Error();
//   }
// }

const Home = () => {

  const [posts, dispatch] = React.useReducer(
    postsReducer,
    postsInitialState
  );
  const [currentPage, setCurrentPage] = React.useState(1)

  // React.useEffect(() => {
  //   async function fetchData() {
  //     dispatch({ type: 'POSTS_FETCH_INIT' });
  //     try {
  //       const data = await axios.get(`${API_ROOT}post/?page=${currentPage}`);
  //       const result = data.data;

  //       dispatch({
  //         type: 'POSTS_FETCH_SUCCESS',
  //         payload: {
  //           posts: result.results,
  //           nextPage: result.next,
  //           previousPage: result.previous,
  //         },
  //       });
  //     } catch {
  //       dispatch({
  //         type: 'POSTS_FETCH_FAILURE'
  //       });
  //     }
  //   }
  //   fetchData();
  // }, [currentPage]);



  React.useEffect(() => {
    const fetch = async () => {
      await fetchData(dispatch, currentPage);
    }
    fetch();
  }, [currentPage])
  return (
    <>
      <Navbar />
      <NewPost />
      {posts.isError && <p>Something went wrong...</p>}
      {posts.isLoading ? (<p>Loading...</p>) : (<Postlist postlist={posts.data} />)}

      <Paginator
        previousPage={posts.previousPage}
        nextPage={posts.nextPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </>
  );

}

export default Home;
