import { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "../screens/Home";
import Signin from "../screens/SignIn";
import Profile from "../screens/Profile";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost";
import UserProfile from "../components/UserProfile";
import FollowingsPost from "../screens/FollowingsPost";
import Reset from "../screens/Reset";
import NewPassword from "../components/Newpassword";
import { UserContext } from "../context/UserContext";
import SinglePost from "../components/SinglePost";

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

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
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
        <SinglePost userId={_id} />
      </Route>
      <Route path="/myfollowingpost">
        <FollowingsPost />
      </Route>
      {/* <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route> */}
      <Route>
        <h1>404 Page Not Found</h1>
      </Route>
    </Switch>
  );
};
