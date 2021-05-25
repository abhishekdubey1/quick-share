import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { fetchUser } from "../utils/apiCalls";
import FollowBtn from "./FollowBtn";
let initialState = {
  dpUrl: null,
  name: null,
  email: null,
  followers: null,
  following: null,
  postsCount: null,
};
const Profile = () => {
  const [user, setUser] = useState(initialState);
  const [posts, setPosts] = useState([]);
  const { userid } = useParams();
  useEffect(() => {
    fetchUser(userid, setUser, setPosts);
  }, [userid]);
  let { state } = useContext(UserContext);
  let { dpUrl, name, email, followers, following, postsCount } = user;
  let isLoaded = user.dpUrl;
  let isFollowed = followers?.includes(state._id);

  /*
   
      "followedUser": {
        "dpUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7kc4LWYMTgCvPRNPCDK99Vf0O1vggwWsgA&usqp=CAU",
        "followers": [
            "609ea882b038f400292b9ee0"
        ],
        "following": [
            "6093b5b628bce2002328eed8"
        ],
        "_id": "6093bb0528bce2002328eed9",
        "name": "Amarjit",
        "email": "abc@gmail.com",
        "password": "$2b$12$nhZ52v64OP9FdPeYXXZ0B.8lVO6L7vZTqQzyywvcBt1KnxzT7//pu",
        "__v": 0
    }

   */

  return isLoaded ? (
    <div className="profile">
      <header className="profile-info">
        <div className="profile-picture">
          <img src={dpUrl} alt={`Display of ${name}`} />
        </div>
        <section className="profile-details">
          <div className="profile-main">
            <h2 className="profile-username">{email}</h2>
            <FollowBtn
              userid={userid}
              isFollowed={isFollowed}
              postsCount={postsCount}
              setUser={setUser}
            />
          </div>
          <ul className="profile-stats">
            <li>
              <b>{postsCount || 0}</b> posts
            </li>
            <li>
              <b>{followers.length}</b> followers
            </li>
            <li>
              <b>{following.length}</b> followings
            </li>
          </ul>
          <div className="profile-head">
            <h1 className="profile-name">{name}</h1>
          </div>
        </section>
      </header>
      <div id="photos" style={{ margin: "80px 20px" }}>
        {posts.map((postEl) => (
          <img
            src={postEl.postUrl}
            alt={postEl.caption}
            key={postEl._id}
            className="abcd"
          />
        ))}
      </div>
    </div>
  ) : (
    <h3 className="loading fs-lg">Loading</h3>
  );
};

export default Profile;
