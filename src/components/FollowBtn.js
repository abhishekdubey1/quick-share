import { useState } from "react";
import { follow, unFollow } from "../utils/apiCalls";

const initialState = "idle";
const FollowBtn = ({ userid, isFollowed, postsCount, setUser }) => {
  const [status, setStatus] = useState(initialState);
  const handleFollow = async () => {
    if (userid) {
      try {
        if (isFollowed) {
          setStatus("loading");
          const response = await unFollow(userid);
          console.log(response);
          response.data.unFollowedUser.postsCount = postsCount;
          setUser(response.data.unFollowedUser);
          setStatus("accepted");
        } else {
          setStatus("loading");
          const response = await follow(userid);
          console.log(response);
          response.data.followedUser.postsCount = postsCount;
          setUser(response.data.followedUser);
          setStatus("accepted");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="profile-follow-btn">
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
