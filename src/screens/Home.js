import { useState, useContext, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useMount, useTitle } from "../utils/customHooks";
import { fetchPosts } from "../utils/apiCalls";
import Post from "../components/Post";
import { initialState } from "../utils/helper";
const Home = () => {
  const history = useHistory();
  let { state } = useContext(UserContext);
  state = state || JSON.parse(localStorage.getItem("user"));
  const [{ data, error, status }, setAppState] = useState({
    ...initialState,
    data: [],
  });

  useLayoutEffect(() => {
    if (!state) {
      history.push("/signin");
    }
  }, [history, state]);
  const isMounted = useMount();
  useTitle("Home - Instagram");

  const handleFetchPosts = async () => {
    try {
      if (isMounted) {
        setAppState({ status: "loading", data: [] });
        const response = await fetchPosts();
        if (isMounted) {
          setAppState({ status: "accepted", data: response.data });
        }
      }
    } catch (error) {
      if (isMounted) {
        setAppState({ status: "rejected", error });
      }
    }
  };
  const likeFunction = (postData) => {
    const newData = data.map((post) => {
      if (postData.id === post.id) {
        console.log({ post });
        console.log({ postData });
        return { ...post, ...postData };
      }
      return post;
    });
    setAppState({ status: "accepted", data: newData });
  };
  return (
    <div className="home">
      <br />
      {data?.length > 0 &&
        data.map((item) => {
          return (
            <Post
              key={item?._id}
              postId={item?._id}
              isOwnPost={state?._id === item?.postedBy?._id}
              src={item?.postUrl}
              postedBy={item?.postedBy}
              likes={item?.likes}
              dpUrl={item?.dpUrl}
              caption={item?.caption}
              isLiked={item?.likes?.includes(state?._id)}
              likeFunction={likeFunction}
            />
          );
        })}
      {data?.length === 0 && status === "idle" && (
        <>
          <h1>No Posts on the Feed</h1>
          <button onClick={handleFetchPosts}>Try refetching?</button>
        </>
      )}
      {status === "loading" && (
        <div className="loader-preview">
          <div className="instagram-loader">
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      {status === "rejected" && (
        <>
          <p role="alert">
            Some error
            <span>{error?.message}</span>
          </p>
          <button onClick={handleFetchPosts}>Try refetching?</button>
        </>
      )}
    </div>
  );
};

export default Home;
/*
      {!state && (
        <Link to={"/signin"}>
          <h3 className="">Please Login</h3>
        </Link>
      )}
*/
// <div
//   className="loading "
//   style={{ position: "absolute", fontSize: "55px" }}
// >
//   Loading
// </div>
