import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeToasts } from "../../store/actions/toastActions";
import { follow, unFollow } from "../../utils/apiCalls";

const FollowBtn = ({ userid, isFollowed, postsCount, setUser }) => {
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();
  const handleFollow = async () => {
    if (userid) {
      try {
        setStatus("loading");
        if (isFollowed) {
          const { unFollowedUser } = await unFollow(userid);
          setUser({
            ...unFollowedUser,
            postsCount,
            followersCount: unFollowedUser.followers.length,
            followingCount: unFollowedUser.following.length
          });
          setStatus("accepted");
        } else {
          const { followedUser } = await follow(userid);
          setUser({
            ...followedUser,
            postsCount,
            followersCount: followedUser.followers.length,
            followingCount: followedUser.following.length
          });
          setStatus("accepted");
        }
      } catch (error) {
        console.log(error);
        dispatch(
          makeToasts(
            "error",
            error.response.data.error ||
              error.response.data.message ||
              error.message
          )
        );
        setStatus("idle");
      }
    }
  };
  return (
    <div className="profile__follow">
      {(status === "accepted" || status === "idle") && (
        <button className="" onClick={handleFollow}>
          {!isFollowed ? "Follow" : "UnFollow"}
        </button>
      )}
      {status === "loading" && (
        <p className="loading" style={{ fontSize: "40px" }} />
      )}
    </div>
  );
};

export default FollowBtn;
