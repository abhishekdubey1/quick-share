import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchUser } from "../../utils/apiCalls";
import { Main, PhotoPosts, Picture, Stats } from "./ProfileComponents";
let initialState = {
  dpUrl: null,
  name: null,
  email: null,
  followers: null,
  following: null,
  postsCount: null
};
const UserProfile = () => {
  const [user, setUser] = useState(initialState);
  const [posts, setPosts] = useState([]);
  const { userid } = useParams();
  useEffect(() => {
    fetchUser(userid, setUser, setPosts);
  }, [userid]);
  let {
    dpUrl,
    name,
    email,
    followers,
    // following,
    postsCount,
    followersCount,
    followingCount
  } = user;
  const isLoaded = user.dpUrl;
  const _id = useSelector(state => state.user._id);
  const isFollowed = followers !== null ? followers.includes(_id) : false;

  return isLoaded ? (
    <div className="profile">
      <header className="profile__head">
        <Picture dpUrl={dpUrl} name={name} />
        <Main
          name={name}
          showFollow={true}
          showEdit={true}
          userid={userid}
          isFollowed={isFollowed}
          postsCount={postsCount}
          setUser={setUser}
        />
        <h2 className="profile__email">{email}</h2>
        <Stats
          postsCount={postsCount}
          followers={followersCount}
          following={followingCount}
        />
      </header>
      <PhotoPosts posts={posts} />
    </div>
  ) : (
    <h3 className="loading fs-lg">Loading</h3>
  );
};

export default UserProfile;
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
