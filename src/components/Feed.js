import { useContext } from "react";
import { UserContext } from "../context/UserContext";
// import { initialState } from "../utils/helper";

// import { useMount } from "../utils/customHooks";
import Post from "./Post";

function Feed({ data, postActions, userId }) {
  let { state } = useContext(UserContext);
  state = state || JSON.parse(localStorage.getItem("user"));
  // const [appState, setAppState] = useState(initialState);
  // const { status } = appState;
  // const isMounted = useMount();
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
              isLiked={item.likes.includes(state?._id)}
            />
          );
        })}
      {data.length === 0 && (
        <>
          <h1>No Posts on the Feed</h1>
          <button onClick={postActions.fetchPosts}>Try refetching?</button>
        </>
      )}
      {
        //status === "loading" && (
        //<div className="loading fs-lg " style={{ position: "absolute" }}>
        //Loading.
        //</div>
        //)
      }
      {
        //status === "rejected" && (
        //<>
        //<p role="alert">Some error</p>
        // <button onClick={postActions.fetchPosts}>Try refetching?</button>
        // </>
        // )
      }
    </div>
  );
}

export default Feed;
