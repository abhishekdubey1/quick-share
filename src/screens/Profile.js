import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Main, PhotoPosts } from "../components/Profile/ProfileComponents";
import { Picture, Stats } from "../components/Profile/ProfileComponents";
import { useMount, useTitle } from "../utils/customHooks";
import { apiEndPoint, capitalize } from "../utils/helper";

const Profile = () => {
  const [status, setStatus] = useState("idle");
  const { dpUrl, name, email, followers, following, postsCount, _id } =
    useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  useTitle(`${capitalize(name)} - Instagram`);
  const isMounted = useMount();
  useEffect(() => {
    async function fetchPosts() {
      setStatus("loading");
      const { data } = await axios(`${apiEndPoint}/user/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      }); //data.user, data.posts

      if (isMounted) {
        setPosts(data.posts);
        setStatus("accepted");
      }
    }
    if (_id) {
      fetchPosts();
    }
    // eslint-disable-next-line
  }, [_id]);
  return (
    <div className="profile">
      <header className="profile__head">
        <Picture dpUrl={dpUrl} name={name} showPicture />
        <Main name={name} showEdit={true} />
        <h2 className="profile__email">{email}</h2>
        <Stats
          postsCount={postsCount}
          followers={followers}
          following={following}
          userid={_id}
        />
      </header>
      {status === "accepted" && <PhotoPosts posts={posts || []} />}
      {<Loader status={status === "loading"} />}
    </div>
  );
};

export default Profile;
export const Loader = ({ status }) =>
  status ? (
    <div className="ht-50 fl-ct">
      <div className="loader">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  ) : (
    ""
  );
