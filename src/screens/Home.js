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
  // const likeFunction = (postData) => {
  // 	const newData = data.map((post) => {
  // 		if (postData._id === post._id) {
  // 			return postData;
  // 		}
  // 		return post;
  // 	});
  // 	setAppState({ status: "accepted", data: newData });
  // };
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
  return (
    <div className="home">
      <br />
      {posts?.length > 0 &&
        posts.map(post => {
          return (
            <Post
              key={post?._id}
              postId={post?._id}
              isOwnPost={user?._id === post?.postedBy?._id}
              src={post?.postUrl}
              postedBy={post?.postedBy}
              likes={post?.likes}
              dpUrl={post?.dpUrl}
              caption={post?.caption}
              isLiked={post?.likes?.includes(user?._id)}
              likeFunction={(a, b, c) => {
                // likeFunction;
                console.log(a, b, c);
              }}
            />
          );
        })}
      {posts?.length === 0 && status === "idle" && (
        <>
          <h1>No Posts on the Feed</h1>
          <button onClick={() => dispatch(setPosts(isMounted))}>
            Try refetching?
          </button>
        </>
      )}

      {status === "rejected" && (
        <div style={{ fontSize: "25px" }}>
          <p role="alert">
            Some error
            <span>{error}</span>
          </p>
          <button onClick={() => dispatch(setPosts(isMounted))}>
            Try refetching?
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
