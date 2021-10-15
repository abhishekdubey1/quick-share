import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { makeToasts } from "../../store/actions/toastActions";
import { apiEndPoint } from "../../utils/helper";

const FollowersList = ({ list }) => {
  // const { id } = useParams();
  // const [followers, setFollowers] = useState([]);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   axios(`${apiEndPoint}/user/followers/${id}`).then(({ data }) => {
  //     setFollowers(data.followers);
  //     dispatch(makeToasts("success", "Followers list loaded"));
  //   });
  //   // eslint-disable-next-line
  // }, [id]);
  const { _id } = useSelector(state => state.user);

  return (
    <div className="followers-screen card">
      <ul>
        {list.map(user => (
          <li key={user._id}>
            <img
              src={user.dpUrl}
              alt="profile-pic"
              className="search-user-img"
            />
            <div className="follower-name">
              <h3>{user._id === _id ? "You" : user.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FollowersWrapper = ({ type }) => {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios(`${apiEndPoint}/user/subs/${id}?list=${type}`)
      .then(({ data }) => {
        setList(data.list);
        dispatch(makeToasts("success", `${type} list loaded`));
      })
      .catch(err => {
        dispatch(
          makeToasts("error", err.response.data?.error || "An error occured")
        );
      });
    // eslint-disable-next-line
  }, [id]);
  return <FollowersList list={list} />;
};

export default FollowersWrapper;
