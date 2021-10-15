import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes } from "react-router-dom";
// import { login } from "./store/actions/userActions.js";
import SignIn from "./screens/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./screens/Signup";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import UserProfile from "./components/Profile/UserProfile";
import FollowingsPost from "./screens/FollowingsPost";
import SinglePost from "./components/SinglePost";
import NotFound from "./screens/404-page";
import {
  EditProfile,
  EditDp,
  EditPassword
} from "./components/Profile/EditProfile";
import FollowersWrapper from "./components/Profile/FollowersWrapper";

export const Routing = () => {
  const { user } = useSelector(state => state);
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (savedUser && !user.email) {
      dispatch({ type: "LOGIN_USER", payload: { user: savedUser } });
    }
    // eslint-disable-next-line
  }, [savedUser, user.email]);
  return (
    <Routes>
      <PrivateRoute
        condition={savedUser}
        redirectPath="/signin"
        path="/"
        element={<Home />}
      />
      <PrivateRoute
        condition={savedUser}
        redirectPath="/signin"
        path="/profile"
        element={<Profile />}
      />
      <PrivateRoute
        condition={savedUser}
        redirectPath="/signin"
        path="/create"
        element={<CreatePost />}
      />
      <PrivateRoute
        condition={savedUser}
        redirectPath="/signin"
        path="/profile/:userid"
        element={<UserProfile />}
      />
      <PrivateRoute
        condition={savedUser}
        redirectPath="/signin"
        path="/post/:postIdParam"
        element={<SinglePost userId={user._id || ""} />}
      />
      <PrivateRoute
        condition={savedUser}
        redirectPath="/signin"
        path="/myfollowingpost"
        element={<FollowingsPost />}
      />
      <PrivateRoute
        condition={!savedUser}
        path="/signin"
        redirectPath="/"
        element={<SignIn />}
      />
      <PrivateRoute
        condition={!savedUser}
        path="/signup"
        redirectPath="/"
        element={<SignUp />}
      />
      <PrivateRoute
        condition={savedUser}
        path="/edit-profile"
        redirectPath="/signin"
        element={<EditProfile />}
      />
      <PrivateRoute
        condition={savedUser}
        path="/edit-dp"
        redirectPath="/signin"
        element={<EditDp />}
      />
      <PrivateRoute
        condition={savedUser}
        path="/edit-password"
        redirectPath="/signin"
        element={<EditPassword />}
      />
      <PrivateRoute
        condition={savedUser}
        path="/followers/:id"
        redirectPath="/signin"
        element={<FollowersWrapper type="followers" />}
      />
      <PrivateRoute
        condition={savedUser}
        path="/following/:id"
        redirectPath="/signin"
        element={<FollowersWrapper type="following" />}
      />
      <Routes path="*">
        <NotFound />
      </Routes>
    </Routes>
  );
  // }
};
