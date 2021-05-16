import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { fetchUser, follow, unFollow } from "../utils/apiCalls";
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
  const [, setPosts] = useState([]);
  const { userid } = useParams();
  useEffect(() => {
    fetchUser(userid, setUser, setPosts);
  }, [userid]);
  let { state } = useContext(UserContext);
  let { dpUrl, name, email, followers, following, postsCount } = user;
  let isLoaded = user.dpUrl;
  let isFollowed = followers?.includes(state._id);
  const handleFollow = async () => {
    if (userid) {
      if (isFollowed) {
        const data = await unFollow(userid);
        console.log(data);
        console.log({ ...user, followers });
      } else {
        const data = await follow(userid);
        console.log(data);
        console.log({ ...user, followers });
        // setUser((u) => ({ ...u, ...data }));
      }
    }
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  return isLoaded ? (
    <div className="profile">
      <header className="profile-info">
        <div className="profile-picture">
          <img src={dpUrl} alt={`Display of ${name}`} />
        </div>
        <section className="profile-details">
          <div className="profile-main">
            <h2 className="profile-username">{email}</h2>
            <div className="profile-follow-btn">
              {false && (
                <button className="" onClick={handleFollow}>
                  {!isFollowed ? "Follow" : "UnFollow"}
                </button>
              )}{" "}
            </div>
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
      <div className="profile-posts-container">
        {false &&
          [].map((el) => (
            <div key={el[0]} className="profile-posts-columns">
              {el.map((inEl) => (
                <div key={inEl} className="profile-posts-row">
                  {
                    <img
                      className="profile-posts"
                      src={"imgUrl"}
                      alt="post by katy"
                    />
                  }
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  ) : (
    <h3 className="loading">Loading</h3>
  );
};

export default Profile;
