import { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "../screens/Home";
import Signin from "../screens/SignIn";
import Profile from "../screens/Profile";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost";
import UserProfile from "./UserProfile";
import FollowingsPost from "../screens/FollowingsPost";
import SinglePost from "./SinglePost";
import NotFound from "../screens/404-page";
import Inbox from "./Inbox";
import { useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import PrivateRoute from "./PrivateRoute";

export const Routing = () => {
	const { user, toasts } = useSelector((state) => state.user);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			login(user);
		}
	}, []);
	if (!user.name) {
		return (
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
			</Switch>
		);
	}
	return (
		<Switch>
			<PrivateRoute
				condition={user.email}
				redirectPath="/signin"
				path="/"
				element={<Home />}
			/>
			<PrivateRoute
				condition={user.email}
				redirectPath="/signin"
				path="/profile"
				element={<Profile />}
			/>
			<PrivateRoute
				condition={user.email}
				redirectPath="/signin"
				path="/create"
				element={<CreatePost />}
			/>
			<PrivateRoute
				condition={user.email}
				redirectPath="/signin"
				path="/profile/:userid"
				element={<UserProfile />}
			/>
			<PrivateRoute
				condition={user.email}
				redirectPath="/signin"
				path="/post/:postIdParam"
				element={<SinglePost userId={_id || ""} />}
			/>
			<PrivateRoute
				condition={user.email}
				redirectPath="/signin"
				path="/myfollowingpost"
				element={<FollowingsPost />}
			/>
			<Route path="/inbox">
				<Inbox />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
};
