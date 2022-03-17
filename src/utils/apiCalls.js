import axios from "axios";
import { apiEndPoint } from "./helper";

const getJwt = () => localStorage.getItem("jwt")
const headers = () => ({
  headers: {
    Authorization: "Bearer " + getJwt()
  }
});
export const fetchPosts = async () => {
  try {
    const response = await axios(`${apiEndPoint}/allposts`, { ...headers() });
    return response;
  } catch (error) {
    alert(`There was some error: ${error.message}`);
    console.log(error);
    throw new Error(error);
    // return error;
  }
};
export const makeComment = async (text, postId) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/comment/${postId}`,
      { text },
      { ...headers() }
    );
    return data.comments;
  } catch (error) {
    alert(`There was some error: ${error.message}`);
    console.log(error);
    // return error;
  }
};
export const removeComment = async (commentId, postId) => {
  try {
    const url = `${apiEndPoint}/comment/${postId}/${commentId}`;
    const { data } = await axios.delete(url, {
      ...headers()
    });
    return data.comments;
  } catch (error) {
    alert(`There was some error: ${error.message}`);
    console.log(error);
    // return error;
  }
};
export const deletePost = async postid => {
  try {
    const { data } = await axios.delete(`/deletepost/${postid}`, {
      ...headers()
    });
    console.log({ data });
    //   const newData = data.filter((item) => {
    //     return item._id !== result._id;
    //   });
    //   setData(newData);
  } catch (error) {
    alert(`There was some error: ${error.message}`);
    console.log(error);
    // return error;
  }
};
export const fetchSubPosts = async () => {
  try {
    const response = await axios(`${apiEndPoint}/getsubpost`, {
      ...headers()
    });
    return response;
  } catch (error) {
    console.log(error);
    alert("Oops! there was an error");
    // return error;
  }
};
export const follow = async followId => {
  try {
    const { data } = await axios.put(
      `${apiEndPoint}/user/${followId}/follow`,
      {},
      {
        ...headers()
      }
    );
    return data;
    // setData(newData);
  } catch (error) {
    alert(`There was some error: ${error.message}`);
    console.log(error);
    // return error;
  }
};
export const unFollow = async unfollowId => {
  try {
    const { data } = await axios.delete(
      `${apiEndPoint}/user/${unfollowId}/follow`,
      { ...headers() }
    );
    return data;
    // setData(newData);
  } catch (error) {
    alert(`There was some error: ${error.message}`);
    console.log(error);
    // return error;
  }
};
export const fetchUser = async (id, setUser, setPosts) => {
  try {
    const result = await axios(`${apiEndPoint}/user/${id}`, { ...headers() });
    setUser(result.data.user);
    setPosts(result.data.posts);
    return result;
  } catch (error) {
    console.log(error);
    alert("Oops! there was an error");
    // return error;
  }
};

export const fetchUserPosts = async id => {
  try {
    const { data } = await axios(`${apiEndPoint}/user/${id}`, { ...headers() });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const uploadToCloud = async data => {
  let res = await fetch(
    " https://api.cloudinary.com/v1_1/hookupcloudddddddddddd/image/upload",
    {
      method: "post",
      body: data
    }
  );
  let resData = res.json();
  return resData;
};

export const createPost = async (caption, photo) => {
  try {
    const { data } = await axios.post(
      `${apiEndPoint}/post`,
      {
        caption,
        photo
      },
      { ...headers() }
    );
    return data;
  } catch (error) {
    alert("There is an error in creating post");
    console.log("Error: ", error);
  }
};

// export function ()
