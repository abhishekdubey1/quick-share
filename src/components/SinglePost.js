import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { apiEndPoint } from "../utils/helper";
import CommentBox from "./CommentBox";
import { DeleteBtn, LikeBtn, UnLikeBtn } from "./Svg";

function SinglePost(props) {
  const { postIdParam } = useParams();
  const [state, setState] = useState({});
  const isOwnPost = state.postedBy?._id === props?.userId;
  const isLiked = state?.likes?.includes(props?.userId);
  const isMounted = useRef(true);
  const callPostApi = useCallback(
    async function () {
      console.log("making request");
      const { data } = await axios(`${apiEndPoint}/post/${postIdParam}`, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      if (isMounted.current) {
        setState(data.post);
      }
    },
    [postIdParam]
  );
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
    : `${apiEndPoint}/profile/${state?.postedBy?._id}`;

  return state.postedBy ? (
    <div className="post">
      <div className="post-head">
        <div className="post-creator">
          <div className="post-creator-pic">
            <img src={state?.postedBy?.dpUrl} alt="profile" />
          </div>
          <div className="post-creator-details">
            <Link to={postCreatorProfile}>
              <div className="post-creator-name">
                {state?.postedBy?.name}
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
            {isOwnPost && <DeleteBtn onClick={() => { }} />}
          </div>
        )}
        <img src={state?.photo} alt="Post" className="post-img" />
      </div>
      <div className="post-features">
        {!isLiked && <LikeBtn likePost={() => console.log("liked")} />}
        {isLiked && <UnLikeBtn onClick={() => console.log("unliked")} />}
        <div className="post-likes fs-sm">
          {state?.likes?.length + " Like"}
        </div>
        <div className="post-caption">
          <b>{state?.postedBy?.name + " "}</b>
          {state?.caption}
        </div>
      </div>
      <CommentBox
        postId={state?._id}
        comments={state?.comments || []}
        userId={props.userId}
        isOwnPost={isOwnPost}
      />
    </div>
  ) : (
    <h2 className="loading">Loading</h2>
  );
}

export default SinglePost;
