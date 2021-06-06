import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useOnlineStatus, useWindowSize } from "../utils/customHooks";
import SearchBar from "./SearchBar";
import { CreatePostIcon, ExploreBtn, LogoutIcon, ProfileIcon } from "./Svg";
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
	const { width } = useWindowSize();
	const isOnline = useOnlineStatus();

	return state ? (
		<>
			<div className="nav-container">
				<nav className="nav">
					<div className="logo">
						<a href="/">
							{/* <div className="logo-preview">
                <div className="instagram-logo">
                  <div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div> */}
							<img
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
								alt="instagram logo"
								className="logo-img"
							/>
						</a>
					</div>
					<SearchBar className={`${width < 600 ? "ps-ab top-90" : ""}`} />
					<div className="nav-links">
						<Link to="/myfollowingpost">
							<div>
								<ExploreBtn />
							</div>
						</Link>
						<Link to="/create">
							<div>
								<CreatePostIcon />
							</div>
						</Link>
						<Link to="/profile">
							<div className="fl-ct">
								<ProfileIcon />
								<div
									title={`${isOnline ? "online" : "offline"}`}
									className={`isOnline ${isOnline ? "lg" : "gy"}`}
								/>
							</div>
						</Link>
						<Link to="/signin">
							<div onClick={logout}>
								<LogoutIcon />
							</div>
						</Link>
					</div>
				</nav>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	) : null;
};

export default NavBar;
