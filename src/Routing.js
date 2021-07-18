import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes } from "react-router-dom";
import { login } from "./store/actions/userActions.js";
import SignIn from "./screens/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./screens/Signup";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import UserProfile from "./components/UserProfile";
import FollowingsPost from "./screens/FollowingsPost";
import SinglePost from "./screens/SinglePost";
import NotFound from "./screens/404-page";
import { LOGIN_USER } from "./store/types.js";

export const Routing = () => {
  const { email, _id } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: LOGIN_USER,
        payload: { user }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if (!name) {
  //   return (
  //     <Routes>
  //     </Routes>
  //   );
  // }
  // if (name) {
  // return <h1>Development in progress</h1>;
  return (
    <Routes>
      <PrivateRoute
        condition={email}
        redirectPath="/signin"
        path="/"
        element={<Home />}
      />
      <PrivateRoute
        condition={email}
        redirectPath="/signin"
        path="/profile"
        element={<Profile />}
      />
      <PrivateRoute
        condition={email}
        redirectPath="/signin"
        path="/create"
        element={<CreatePost />}
      />
      <PrivateRoute
        condition={email}
        redirectPath="/signin"
        path="/profile/:userid"
        element={<UserProfile />}
      />
      <PrivateRoute
        condition={email}
        redirectPath="/signin"
        path="/post/:postIdParam"
        element={<SinglePost userId={_id || ""} />}
      />
      <PrivateRoute
        condition={email}
        redirectPath="/signin"
        path="/myfollowingpost"
        element={<FollowingsPost />}
      />
      <PrivateRoute
        condition={!email}
        path="/signin"
        redirectPath="/"
        element={<SignIn />}
      />
      <PrivateRoute
        condition={!email}
        path="/signup"
        redirectPath="/"
        element={<SignUp />}
      />
      <Routes path="*">
        <NotFound />
      </Routes>
    </Routes>
  );
  // }
};
