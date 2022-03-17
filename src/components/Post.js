import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeToasts } from "../store/actions/toastActions";
import { likePost, unLikePost } from "../store/actions/postActions";
import { CommentBtn, DeleteBtn, LikeBtn, UnLikeBtn } from "./Svg";
import { useState } from "react";
function Post({ post, isOwnPost, isLiked }) {
  const { photo, likes, _id, caption, postedBy } = post;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLike = type => {
    setLoading(true);
    if (type === "like") {
      dispatch(likePost(_id));
    } else {
      dispatch(unLikePost(_id));
    }
    setLoading(false);
  };
  const deletePost = () => {
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      dispatch(makeToasts("success", "Post deleted successfully"));
    }
  };

  const postCreatorProfile = isOwnPost
    ? `/profile`
    : `/profile/${postedBy?._id}`;

  const singlePost = `/post/${_id}`;

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
      <div
        className="post-main fl-ct"
        title="Open in a new tab"
        onDoubleClick={() => {
          console.log("like");
          handleLike("like");
        }}
      >
        <img src={photo} alt="Post" className="post-img" loading="lazy" />
      </div>
      <div className="post-features">
        {!isLiked && !loading && (
          <LikeBtn handleLike={() => !isLiked && handleLike("like")} />
        )}
        {isLiked && !loading && (
          <UnLikeBtn handleLike={() => isLiked && handleLike()} />
        )}
        {loading && <div className="spin-loader" />}
        <Link to={singlePost}>
          <CommentBtn />
        </Link>
        <div className="post-likes fs-sm">{likes?.length + " Like"}</div>
        <div className="post-caption fs-sm">
          <Link to={postCreatorProfile}>
            <b>{postedBy?.name + " "}</b>
          </Link>
          {caption}
        </div>
      </div>
      <Link to={singlePost}>
        <button className="view-comments">View comments</button>
      </Link>
    </div>
  );
}

export default Post;
