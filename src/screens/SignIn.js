import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ROUTES, apiEndPoint, validateData } from "../utils/helper";
import { useTitle, useForm } from "../utils/customHooks";
import axios from "axios";
const initialState = { email: "", password: "" };
const SignIn = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  useTitle("Login - Instagram");
  const { handleChange, values } = useForm(initialState);

  async function handleSignIn() {
    if (values.email.toString().trim() && values.password.toString().trim()) {
      try {
        const { data } = await axios.post(`${apiEndPoint}/signin`, {
          password: values.password, //values.password,
          email: values.email, //values.email,
        });
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        alert("Signed In Successfully");
        history.push("/profile");
      } catch (error) {
        alert("There was some error");
        console.log(error);
      }
    }
  }

  return (
    <div className="signin-container">
      <div className="Signin">
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            aria-label="Enter Email"
            placeholder="Enter Email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            aria-label="Enter Password"
            placeholder="Enter Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className={`login-btn ${!validateData(values) && "disabled"}`}
          onClick={handleSignIn}
        >
          Log In
        </button>
      </div>

      <NoAccount />
    </div>
  );
};
const NoAccount = () => (
  <div className="noaccount">
    <Link to={ROUTES.SIGN_UP}>Don't have an account? Sign up</Link>
  </div>
);
export default SignIn;
