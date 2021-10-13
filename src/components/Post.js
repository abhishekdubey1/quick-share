import { useState } from "react";
import { Link } from "react-router-dom";
import { likePost, unlikePost } from "../utils/apiCalls";
import { CommentBtn, DeleteBtn, LikeBtn, UnLikeBtn } from "./Svg";
function Post({ post, isOwnPost, isLiked, likeFn }) {
  const { photo, likes, _id, caption, postedBy } = post;
  const [status, setStatus] = useState("idle");

  const handleLike = async () => {
    if (!isLiked) {
      setStatus("loading");
      const response = await likePost(_id);
      likeFn(response.data);
      setStatus("accepted");
    }
  };

  const handleUnlike = async () => {
    if (isLiked) {
      setStatus("loading");
      const response = await unlikePost(_id);
      if (response.status === 200) {
        likeFn(response.data);
      }
      setStatus("accepted");
    }
  };

  const deletePost = () => {
    let answer = window.confirm("Are you sure you want to delete?");
    alert(answer ? "Deleted the Post!" : "Okay!");
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
        onDoubleClickCapture={() =>
          !isOwnPost && !isLiked && isAccepted(status) && handleLike()
        }
      >
        <img src={photo} alt="Post" className="post-img" loading="lazy" />
      </div>
      {/* </Link> */}
      <div className="post-features">
        {!isOwnPost && (
          <>
            {!isLiked && isAccepted(status) && (
              <LikeBtn handleLike={handleLike} />
            )}
            {isLiked && isAccepted(status) && (
              <UnLikeBtn handleLike={handleUnlike} />
            )}
            {status === "loading" && <div className="spin-loader" />}
          </>
        )}
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
