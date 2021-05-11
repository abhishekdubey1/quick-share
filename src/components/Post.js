import { useState } from "react";
import { Link } from "react-router-dom";
import { likePost, unlikePost } from "../utils/apiCalls";
// import { initialState } from "../utils/helper";
import { CommentBtn, DeleteBtn, LikeBtn, UnLikeBtn } from "./Svg";
function Post(props) {
  const { src, likes, isOwnPost, postId, isLiked } = props;
  const { caption, postedBy, likeFunction } = props;
  const [status, setStatus] = useState("idle");
  const handleLike = async () => {
    if (!isLiked) {
      setStatus("loading");
      const response = await likePost(postId);
      if (response.status === 200) {
        likeFunction(response.data);
      }
      setStatus("accepted");
    }
  };
  const handleUnlike = async () => {
    if (isLiked) {
      setStatus("loading");
      const response = await unlikePost(postId);
      if (response.status === 200) {
        likeFunction(response.data);
      }
      setStatus("accepted");
    }
  };
  const isAccepted = () =>
    status === "accepted" || status === "idle" ? true : false;

  const deletePost = () => {
    let answer = window.confirm("Are you sure you want to delete?");
    alert(answer ? "Deleted the Post!" : "Okay!");
  };
  const postCreatorProfile = isOwnPost
    ? `/profile`
    : `/profile/${postedBy._id}`;
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
      <Link to={`/post/${postId}`}>
        <div className="post-main fl-ct" title="Open in a new tab">
          <img src={src} alt="Post" className="post-img" />
        </div>
      </Link>
      <div className="post-features">
        {!isLiked && isAccepted() && <LikeBtn handleLike={handleLike} />}
        {isLiked && isAccepted() && <UnLikeBtn handleLike={handleUnlike} />}
        {status === "loading" && <div className="spin-loader" />}
        <Link to={`/post/${postId}`}>
          <CommentBtn />
        </Link>
        <div className="post-likes fs-sm">{likes?.length + " Like"}</div>
        <div className="post-caption fs-sm">
          <b>{postedBy?.name + " "}</b>
          {caption}
        </div>
      </div>
      <Link to={`/post/${postId}`}>
        <button className="view-comments">View comments</button>
      </Link>
    </div>
  );
}

export default Post;
