import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useTitle } from "../utils/customHooks";
import { capitalize } from "../utils/helper";

const Profile = () => {
  const [, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  let { data, dpUrl, name, email, followers, following, postsCount } = state
    ? state
    : JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState("");
  function updateProfile() {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "cnq");
      fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              //window.location.reload()
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, image, state]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  const deleteLater = () => {
    updatePhoto();
    updateProfile();
  };
  useTitle(`${capitalize(name)} - Instagram`);
  return (
    <div className="profile">
      {false && <button onClick={() => false && deleteLater()}>caution</button>}
      <header className="profile-info">
        <div className="profile-picture">
          <img src={dpUrl} alt={`Display of ${name}`} />
        </div>
        <section className="profile-details">
          <div className="profile-head">
            <h1 className="profile-name">{name}</h1>
            {false && (
              <button onClick={() => console.log("edit")}>Edit Profile</button>
            )}
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
          <div className="profile-main">
            <h2 className="profile-username">{email}</h2>
            <div className="profile-follow-btn" style={{ width: "200px" }}>
              {false && (
                <button
                  className=""
                  onClick={
                    () => {}
                    // !isFollowed ? handleFollow() : handleUnfollow()
                  }
                >
                  {/* {!isFollowed ? "Follow" : "UnFollow"} */}
                </button>
              )}
            </div>
          </div>
        </section>
      </header>
      <div className="profile-posts-container">
        {data?.length &&
          data.map((el) => (
            <div key={el[0]} className="profile-posts-columns">
              {el.map((inEl) => (
                <div key={inEl} className="profile-posts-row">
                  {
                    <img
                      className="profile-posts"
                      src={"imgUrl"}
                      alt={"post by" + name}
                    />
                  }
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
