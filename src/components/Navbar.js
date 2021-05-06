import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useOnlineStatus } from "../utils/customHooks";
import SearchBar from "./SearchBar";
const NavBar = () => {
  // const searchModal = useRef(null);
  // const [search, setSearch] = useState("");
  // const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/signin");
  };
  const isOnline = useOnlineStatus();
  return state ? (
    <nav className="navbar">
      <Link to="/">
        <div>Instagram</div>
      </Link>
      <SearchBar />
      <Link to="/myfollowingpost">
        <div>Followings - Post</div>
      </Link>
      <Link to="/create">
        <div>Create</div>
      </Link>
      <Link to="/profile">
        <div className="fl-ct">
          Profile{" "}
          <div
            title={`${isOnline ? "online" : "offline"}`}
            className={`isOnline ${isOnline ? "lg" : "gy"}`}
          />
        </div>
      </Link>
      <Link to="/signin">
        <div onClick={logout}>Logout</div>
      </Link>
    </nav>
  ) : (
    <nav className="navbar logo">
      <Link to="/">Instagram</Link>
    </nav>
  );
};

export default NavBar;
