import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { likePost } from "../utils/apiCalls";
import { apiEndPoint } from "../utils/helper";
import CommentBox from "./CommentBox";
import { DeleteBtn, LikeBtn, UnLikeBtn } from "./Svg";

function SinglePost(props) {
  const { postIdParam } = useParams();
  const [postState, setPostState] = useState({});
  // const [status, setStatus] = useState("idle");
  const isOwnPost = postState.postedBy?._id === props?.userId;
  const isLiked = postState?.likes?.includes(props?.userId);
  const isMounted = useRef(true);
  const callPostApi = useCallback(
    async function () {
      console.log("making request");
      const res = await fetch(`${apiEndPoint}/post/${postIdParam}`);
      const data = await res.json();
      console.log(data);
      if (isMounted.current) {
        setPostState(data);
      }
    },
    [postIdParam]
  );
  useEffect(() => {
    console.log(isMounted.current);

    isMounted.current = true;
    return () => {
      console.log(isMounted.current);
      isMounted.current = false;
    };
  });

  useEffect(() => {
    if (postIdParam && isMounted.current) {
      callPostApi();
    }
    return () => {
      // cancelTokenSource.cancel();
    };
  }, [callPostApi, postIdParam]);
  const postCreatorProfile = isOwnPost
    ? `${apiEndPoint}/profile`
    : `${apiEndPoint}/profile/${postState?.postedBy?._id}`;

  return postState.postedBy ? (
    <div className="post">
      <div className="post-head">
        <div className="post-creator">
          <div className="post-creator-pic">
            <img src={postState?.postedBy?.dpUrl} alt="profile" />
          </div>
          <div className="post-creator-details">
            <Link to={postCreatorProfile}>
              <div className="post-creator-name">
                {postState?.postedBy?.name}
              </div>
            </Link>
            <div className="post-location">Mumbai, IN</div>
          </div>
        </div>
        <div
          className="post-options-btn"
          // onClick={() => setShowOptions(!showOptions)}
        >
          <ion-icon name="ellipsis-horizontal"></ion-icon>
        </div>
      </div>
      <div className="post-main fl-ct">
        {"" && (
          <div className="post-options">
            {isOwnPost && <DeleteBtn onClick={() => {}} />}
          </div>
        )}
        <img src={postState?.postUrl} alt="Post" className="post-img" />
      </div>
      <div className="post-features">
        {!isLiked && <LikeBtn likePost={() => console.log("liked")} />}
        {isLiked && <UnLikeBtn onClick={() => console.log("unliked")} />}
        <div className="post-likes fs-sm">
          {postState?.likes?.length + " Like"}
        </div>
        <div className="post-caption">
          <b>{postState?.postedBy?.name + " "}</b>
          {postState?.caption}
        </div>
      </div>
      <CommentBox
        postId={postState?._id}
        comments={postState?.comments || []}
        userId={props.userId}
        isOwnPost={isOwnPost}
      />
    </div>
  ) : (
    <h2 className="loading">Loading</h2>
  );
}

export default SinglePost;
