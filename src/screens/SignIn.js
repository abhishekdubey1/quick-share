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

  async function handleSignIn(e) {
    e.preventDefault();
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
        history.push("/");
      } catch (error) {
        alert("There was some error");
        console.log(error);
      }
    }
  }

  return (
    <div className="signin-container">
      <form className="Signin" onSubmit={handleSignIn}>
        <div className="form-group">
          <label
            htmlFor="email"
            className={`${!values.email ? "dn" : ""} auth-label`}
          >
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            className="email"
            aria-label="Enter Email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="password"
            className={`${!values.password ? "dn" : ""} auth-label`}
          >
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            className="password"
            name="monster"
            placeholder="Password"
            aria-label="Enter Password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`login-btn ${!validateData(values) && "disabled"}`}
        >
          Log In
        </button>
      </form>

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
