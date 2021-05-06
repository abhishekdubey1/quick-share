import { Link } from "react-router-dom";
import { likePost, unlikePost } from "../utils/apiCalls";
import { CommentBtn, DeleteBtn, LikeBtn, UnLikeBtn } from "./Svg";
function Post({
  postActions,
  src,
  likes,
  isOwnPost,
  postId,
  caption,
  postedBy,
  isLiked,
}) {
  const handleLike = () => {
    console.log("called handleLike");
    return isLiked ? unlikePost(postId) : likePost(postId);
  };
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
        {!isLiked && <LikeBtn handleLike={handleLike} />}
        {isLiked && <UnLikeBtn handleLike={handleLike} />}
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
        <button className="view-comments">View all comments</button>
      </Link>
    </div>
  );
}

export default Post;
