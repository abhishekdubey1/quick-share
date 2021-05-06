import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useTitle } from "../utils/customHooks";

import Feed from "../components/Feed";
import {
  deletePost,
  fetchPosts,
  likePost,
  makeComment,
  unlikePost,
} from "../utils/apiCalls";
const Home = () => {
  const [data, setData] = useState([]);
  let { state } = useContext(UserContext);
  state = state || JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // fetchPosts();
  }, []);
  useTitle("Home - Instagram");
  const postActions = {
    fetchPosts: () => fetchPosts(setData),
    likePost: (postId) => likePost(postId, setData),
    unlikePost: (postId) => unlikePost(postId, setData),
    makeComment: (text, postId) => makeComment(text, postId, setData),
    deletePost: (postId) => deletePost(postId, setData),
  };
  return <Feed data={data} postActions={postActions} userId={state._id} />;
};

export default Home;
