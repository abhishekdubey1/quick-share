import { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "../screens/Home";
import Signin from "../screens/SignIn";
import Profile from "../screens/Profile";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost";
import UserProfile from "../components/UserProfile";
import FollowingsPost from "../screens/FollowingsPost";
import { UserContext } from "../context/UserContext";
import SinglePost from "../components/SinglePost";
import NotFound from "../screens/404-page";
import Inbox from "../components/Inbox";

export const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "USER", payload: user });
		} else {
			if (!history.location.pathname.startsWith("/reset"))
				history.push("/signin");
		}
	}, [dispatch, history]);
	const { _id } = state ||
		JSON.parse(localStorage.getItem("user")) || { _id: 1 };
	if (!state) {
		<Switch>
			<Route path="/signin">
				<Signin />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>;
	}
	if (state) {
		return (
			<Switch>
				<Route exact path="/">
					{/* <SideBarWrap> */}
					<Home />
					{/* </SideBarWrap> */}
				</Route>
				<Route exact path="/profile">
					<Profile />
				</Route>
				<Route path="/create">
					<CreatePost />
				</Route>
				<Route path="/profile/:userid">
					<UserProfile />
				</Route>
				<Route path="/post/:postIdParam">
					<SinglePost userId={_id || ""} />
				</Route>
				<Route path="/myfollowingpost">
					<FollowingsPost />
				</Route>
				<Route path="/following-users">
					<FollowingsPost />
				</Route>
				<Route path="/inbox">
					<Inbox />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		);
	}
};
/* <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route> */
