import React from 'react';
import axios from 'axios';

import { API_ROOT } from '../config/global';

import Postlist from '../components/Postlist';
import NewPost from '../components/NewPost'
import Paginator from '../components/Paginator';
import Navbar from '../components/Navbar';

import { initialState as postsInitialState, postsReducer } from '../fetchposts/reducer';
import { fetchData } from '../fetchposts/actions';

import { useAuthState } from '../auth/context';


const Home = () => {

  const userDetails = useAuthState();

  const [posts, dispatch] = React.useReducer(
    postsReducer,
    postsInitialState
  );
  const [currentPage, setCurrentPage] = React.useState(1)
  


  const [text, setText] = React.useState("");
  const [textForSubmit, setTextForSubmit] = React.useState(text)
  

  const onInput = (e) => setText(e.target.value)


  const handlePostText = (e) =>{
    e.preventDefault();
    setTextForSubmit(text);
  }

  const handlePost = React.useCallback(async () => {
    if (textForSubmit === "")
      return;
    const payload = { text: textForSubmit };

    try {
      const response = await axios.post(`${API_ROOT}post/`, payload);
      if (response === undefined) throw new Error();
      console.log(response)
      setText("")

    } catch (error) {
      console.log(error)
    }
  },[textForSubmit])



  React.useEffect(async () => {
    const fetch = async () => {
      await fetchData(dispatch, currentPage);
    }
    await handlePost();
    await fetch();
  }, [currentPage, handlePost])
  return (
    <>
      <Navbar />
      {userDetails.user ? <NewPost onPost={handlePostText} onInput={onInput} text={text} /> : null}
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
