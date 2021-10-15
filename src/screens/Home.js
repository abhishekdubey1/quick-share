import { useEffect } from "react";
import { useTitle } from "../utils/customHooks";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/actions/postActions";
import { Loader } from "./Profile";
const Home = () => {
  const { user, posts } = useSelector(state => state);
  const { status, error } = useSelector(state => state.loader.postsLoader);
  useTitle("Home - Instagram");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPosts());
    // eslint-disable-next-line
  }, []);
  if (status === "loading") {
    return <Loader status="loading" />;
  }
  if (status === "fail") {
    return (
      <div style={{ fontSize: "25px" }}>
        <p role="alert">
          Some error
          <span>{error}</span>
        </p>
        <button onClick={() => dispatch(setPosts())}>Try refetching?</button>
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
