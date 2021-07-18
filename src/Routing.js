import { useEffect } from "react";
import { useSelector } from "react-redux";
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
import SinglePost from "./components/SinglePost";
import NotFound from "./screens/404-page";

export const Routing = () => {
  const { user } = useSelector(state => state);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      login(savedUser);
    }
  }, []);
  // if (!user.name) {
  //   return (
  //     <Routes>
  //     </Routes>
  //   );
  // }
  // if (user.name) {
  // return <h1>Development in progress</h1>;
  return (
    <Routes>
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
        element={<SinglePost userId={user._id || ""} />}
      />
      <PrivateRoute
        condition={user.email}
        redirectPath="/signin"
        path="/myfollowingpost"
        element={<FollowingsPost />}
      />
      <PrivateRoute
        condition={!user.email}
        path="/signin"
        redirectPath="/"
        element={<SignIn />}
      />
      <PrivateRoute
        condition={!user.email}
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
