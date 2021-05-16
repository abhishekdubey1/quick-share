import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiEndPoint } from "../utils/helper";
import { SpinLoader } from "./Svg";
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

const headers = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
};
/*
    {
      name: "Simba",
      id: "6080b352bc327e4560bc1c5c",
      dpUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7kc4LWYMTgCvPRNPCDK99Vf0O1vggwWsgA&usqp=CAU",
    },
    {
      name: "Natasha",
      id: "6080b3dcbc327e4560bc1c5d",
      dpUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7kc4LWYMTgCvPRNPCDK99Vf0O1vggwWsgA&usqp=CAU",
    },
    {
      name: "abhishek",
      id: "6093b5b628bce2002328eed8",
      dpUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7kc4LWYMTgCvPRNPCDK99Vf0O1vggwWsgA&usqp=CAU",
    },
    {
      name: "Amarjit",
      id: "6093bb0528bce2002328eed9",
      dpUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7kc4LWYMTgCvPRNPCDK99Vf0O1vggwWsgA&usqp=CAU",
    },

*/
const SearchBar = ({ className }) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); //idle, requesting, no-result, rejected
  const [users, setUsers] = useState([]);
  // const [state, setState] = useState(false);
  const getUsers = useCallback(async () => {
    setStatus("requesting");
    console.log("getting users");
    const response = await axios(`${apiEndPoint}/allusers/${input}`, {
      ...headers,
    });
    // const usersArr = response.data
    //   .map((user) => ({ name: user?.name, id: user._id, dpUrl: user.dpUrl }))
    //   .filter((user) => user.name.includes(input));
    // .map((user) => user?.name)
    //
    if (response.data) {
      setUsers(response.data);
      setStatus("accepted");
    } else {
      setStatus("rejected");
    }
  }, [input]);
  useEffect(() => {
    if (input && status !== "requesting") {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsers, input]);

  return (
    <div className={input.trim() && users.length ? `mt-45` : ""}>
      <label className={"search-input-wrap " + className} htmlFor="search-bar">
        <h1 id="search-title" className="screen-reader-text">
          Search
        </h1>
        <svg viewBox="0 0 56.7 56.7" className="icon-mag">
          <path d="M42.8 7.3C33-2.4 17.1-2.4 7.3 7.3c-9.8 9.8-9.8 25.7 0 35.5 8.7 8.7 22.2 9.7 32 2.9l9.6 9.6c1.8 1.8 4.7 1.8 6.4 0 1.8-1.8 1.8-4.7 0-6.4l-9.6-9.6c6.8-9.8 5.8-23.3-2.9-32zm-6.2 29.3c-6.4 6.4-16.7 6.4-23.1 0s-6.4-16.7 0-23.1c6.4-6.4 16.7-6.4 23.1 0 6.4 6.4 6.4 16.8 0 23.1z"></path>
        </svg>
        <input
          autoComplete="off"
          className="search-input"
          placeholder="Search Users"
          type="search"
          id="search-bar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      {input && (
        <ul className="search-users-li">
          {(status === "idle" || status === "accepted") &&
            users?.map((user) => (
              <Link to={`/profile/${user.id}`} key={user.id}>
                <li className="search-user-item" key={user.id}>
                  <img src={user.dpUrl} alt="" className="search-user-img" />
                  {user.name}
                </li>
              </Link>
            ))}
          {status === "requesting" && <SpinLoader />}
          {status === "rejected" && (
            <p role="alert" onClick={getUsers}>
              Error try again
            </p>
          )}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
