import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMount, useTitle } from "../utils/customHooks";
import { fetchSubPosts } from "../utils/apiCalls";
import Post from "../components/Post";
import { initialState } from "../utils/helper";
import { RefreshBtn } from "../components/Svg";
import { useSelector } from "react-redux";
const FollowingsPost = () => {
  const { user } = useSelector(state => state);
  const [{ data, error, status }, setAppState] = useState({
    ...initialState,
    data: []
  });

  const isMounted = useMount();
  useTitle("Followings - Instagram");

  const handleFetchPosts = useCallback(async () => {
    try {
      if (isMounted) {
        setAppState({ status: "loading", data: [] });
        const response = await fetchSubPosts();
        if (isMounted) {
          setAppState({ status: "accepted", data: response.data });
        }
      }
    } catch (error) {
      if (isMounted) {
        setAppState({ status: "rejected", error });
      }
    }
  }, [isMounted]);
  const likeFunction = postData => {
    const newData = data.map(post => {
      if (postData._id === post._id) {
        console.log("postData");
        return postData;
      }
      return post;
    });
    setAppState({ status: "accepted", data: newData });
  };
  useEffect(() => {
    handleFetchPosts();
    return () => {};
  }, [handleFetchPosts]);
  return (
    <div className="home">
      <br />
      {data?.length > 0 &&
        data.map(item => {
          return (
            <Post
              key={item?._id}
              postId={item?._id}
              isOwnPost={user?._id === item?.postedBy?._id}
              src={item?.postUrl}
              postedBy={item?.postedBy}
              likes={item?.likes}
              dpUrl={item?.dpUrl}
              caption={item?.caption}
              isLiked={item?.likes?.includes(user?._id)}
              likeFunction={likeFunction}
            />
          );
        })}
      {data?.length === 0 && (status === "idle" || status === "accepted") && (
        <div className="feed-noposts">
          <h1>No Posts on the Feed</h1>
          <Link to="/">Explore more posts?</Link>
          <div onClick={handleFetchPosts}>
            Try refreshing?
            <RefreshBtn isLoading={false} />
          </div>
        </div>
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
        <div style={{ fontSize: "25px" }}>
          <p role="alert">
            Some error
            <span>{error?.message}</span>
          </p>
          <button onClick={handleFetchPosts}>Try refetching?</button>
        </div>
      )}
    </div>
  );
};

export default FollowingsPost;
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
