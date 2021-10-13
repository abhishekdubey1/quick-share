import { Link } from "react-router-dom";
import { twoDArray } from "../../utils/helper";
import FollowBtn from "./FollowBtn";
import "./style.css";
export function Picture(props) {
  return (
    <div className="profile__picture ps-rl">
      {props.showPicture && (
        <Link className="btn-edit-dp ps-ab" to={`/edit-dp`}>
          Edit
        </Link>
      )}
      <img
        src={props.dpUrl}
        alt={`Display of ${props.name ? props.name.toUpperCase() : ""}`}
      />
      {props.showPicture && (
        <Link className="btn-edit-profile fs-md" to={`/edit-profile`}>
          Edit Profile
        </Link>
      )}
      {props.showPicture && (
        <Link className="btn-edit-profile fs-md" to={`/edit-password`}>
          🔑
        </Link>
      )}
    </div>
  );
}
export function Main(props) {
  return (
    <div className="profile__main">
      <h1 className="profile__name">{props.name}</h1>
      {false && (
        <button onClick={() => console.log("editted")}>Edit Profile</button>
      )}
      {props.showFollow && (
        <FollowBtn
          userid={props.userid}
          isFollowed={props.isFollowed}
          postsCount={props.postsCount}
          setUser={props.setUser}
        />
      )}
    </div>
  );
}
export function Stats(props) {
  return (
    <ul className="profile__stats">
      <li>
        <b>{props.postsCount}</b> posts
      </li>
      <li>
        <b>{props.followers}</b> followers
      </li>
      <li>
        <b>{props.following}</b> followings
      </li>
    </ul>
  );
}
export function PhotoPosts(props) {
  // const [caption, setCaption] = useState("hideCaption"); //classname of caption
  // const mouseEnter = () => setCaption("showCaption");
  // const mouseLeave = () => setCaption("hideCaption");
  // onMouseEnter={mouseEnter}
  // onMouseLeave={mouseLeave}
  return (
    <div id="photos" style={{ margin: "80px 20px" }} className="postRow">
      {props.posts &&
        twoDArray(props.posts, 3).map(row => (
          <div className="postColumn">
            {row.map(post => (
              <img
                className="profile-post-img"
                src={post?.photo}
                alt={post?.caption}
                key={post?._id}
                loading="lazy"
              />
            ))}
          </div>
        ))}
    </div>
  );
}
//<div className={caption}>{post.caption}</div>
//
