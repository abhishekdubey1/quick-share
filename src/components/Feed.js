import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { initialState } from "../utils/helper";

import { useMount } from "../utils/customHooks";
import Post from "./Post";

function Feed({ data, postActions, userId }) {
  const { state } = useContext(UserContext);
  const { _id } = state || JSON.parse(localStorage.getItem("user"));
  const [appState, setAppState] = useState(initialState);
  const { status } = appState;
  const isMounted = useMount();
  useEffect(() => {
    if (isMounted) {
      setAppState({ status: "loading" });
      postActions.fetchPosts();
      setAppState({ status: "accepted" });
    }
  }, [postActions, isMounted]);
  return (
    <div className="home">
      {data?.length > 0 &&
        data.map((item) => {
          return (
            <Post
              key={item._id}
              postId={item._id}
              isOwnPost={userId === item.postedBy._id}
              src={item.postUrl}
              postedBy={item.postedBy}
              likes={item.likes}
              dpUrl={item.dpUrl}
              caption={item.caption}
              postActions={postActions}
              isLiked={item.likes.includes(_id)}
            />
          );
        })}
      {data.length === 0 && status === "accepted" && (
        <>
          <h1>No Posts on the Feed</h1>
          <button onClick={postActions.fetchPosts}>Try refetching?</button>
        </>
      )}
      {status === "loading" && (
        <div className="loading fs-lg " style={{ position: "absolute" }}>
          Loading.
        </div>
      )}
      {status === "rejected" && (
        <>
          <p role="alert">Some error</p>
          <button onClick={postActions.fetchPosts}>Try refetching?</button>
        </>
      )}
    </div>
  );
}

export default Feed;
