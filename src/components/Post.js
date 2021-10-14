import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeToasts } from "../store/actions/toastActions";
import { likePost, unLikePost } from "../store/actions/postActions";
// import { likePost, unlikePost } from "../utils/apiCalls";
import { CommentBtn, DeleteBtn, LikeBtn, UnLikeBtn } from "./Svg";
function Post({ post, isOwnPost, isLiked, likeFn }) {
  const { photo, likes, _id, caption, postedBy } = post;
  const { status } = useSelector(state => state.loader.likeLoader);
  const dispatch = useDispatch();
  // const showError = useCallback(error => {
  //   dispatch(makeToasts("error", error));
  //   // eslint-disable-next-line
  // }, []);

  const deletePost = () => {
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      dispatch(makeToasts("success", "Post deleted successfully"));
    }
  };

  const postCreatorProfile = isOwnPost
    ? `/profile`
    : `/profile/${postedBy?._id}`;

  return (
    <div className="post">
      <div className="post-head">
        <div className="post-creator">
          <div className="post-creator-pic">
            <img src={postedBy.dpUrl} alt="profile" />
          </div>
          <div className="post-creator-details">
            <Link to={postCreatorProfile}>
              <div className="post-creator-name">{postedBy.name}</div>
            </Link>
            <div className="post-location">Mumbai, IN</div>
          </div>
        </div>
        <div className="post-options-btn">
          {isOwnPost && <DeleteBtn onClick={deletePost} />}
        </div>
      </div>
      {/* <Link to={`/post/${_id}`}> */}
      <div
        className="post-main fl-ct"
        title="Open in a new tab"
        // onDoubleClickCapture={() =>
        //   !isOwnPost && !isLiked && handleLike()
        // }
      >
        <img src={photo} alt="Post" className="post-img" loading="lazy" />
      </div>
      {/* </Link> */}
      <div className="post-features">
        {!isLiked && isAccepted(status) && (
          <LikeBtn handleLike={() => !isLiked && dispatch(likePost(_id))} />
        )}
        {isLiked && isAccepted(status) && (
          <UnLikeBtn handleLike={() => isLiked && dispatch(unLikePost(_id))} />
        )}
        {status === "loading" && <div className="spin-loader" />}
        <Link to={`/post/${_id}`}>
          <CommentBtn />
        </Link>
        <div className="post-likes fs-sm">{likes?.length + " Like"}</div>
        <div className="post-caption fs-sm">
          <b>{postedBy?.name + " "}</b>
          {caption}
        </div>
      </div>
      <Link to={`/post/${_id}`}>
        <button className="view-comments">View comments</button>
      </Link>
    </div>
  );
}

export default Post;

const isAccepted = status =>
  status === "accepted" || status === "idle" ? true : false;
