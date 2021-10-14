import { useEffect } from "react";
import { useMount, useTitle } from "../utils/customHooks";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/actions/postActions";
const Home = () => {
  const { user, posts } = useSelector(state => state);
  const { status, error } = useSelector(state => state.loader.postsLoader);
  const isMounted = useMount();
  useTitle("Home - Instagram");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPosts(isMounted));
  }, [dispatch, isMounted]);
  if (status === "loading") {
    return (
      <div className="loader-preview">
        <div className="instagram-loader">
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div style={{ fontSize: "25px" }}>
        <p role="alert">
          Some error
          <span>{error}</span>
        </p>
        <button onClick={() => dispatch(setPosts(isMounted))}>
          Try refetching?
        </button>
      </div>
    );
  }
  return (
    <div className="home">
      {posts.map(post => {
        return (
          <Post
            key={post?._id}
            post={post}
            isOwnPost={user?._id === post?.postedBy?._id}
            isLiked={post?.likes?.includes(user?._id)}
            likeFn={post => {
              console.log(post);
            }}
          />
        );
      })}
    </div>
  );
};

export default Home;
