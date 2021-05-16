import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ROUTES, apiEndPoint, validateData, ipClass } from "../utils/helper";
import { useTitle, useForm } from "../utils/customHooks";
import axios from "axios";
const initialState = { email: "", password: "" };
const SignIn = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  useTitle("Login - Instagram");
  const { handleChange, values } = useForm(initialState);
  const [status, setStatus] = useState("idle");
  const [showPassword, setShowPassword] = useState(false);
  async function handleSignIn(e) {
    e.preventDefault();
    if (
      values.email.toString().trim() &&
      values.password.toString().trim() &&
      status !== "loading"
    ) {
      try {
        setStatus("loading");
        const { data } = await axios.post(`${apiEndPoint}/signin`, {
          password: values.password, //values.password,
          email: values.email, //values.email,
        });
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        setStatus("accepted");
        alert("Signed In Successfully");
        history.push("/profile");
      } catch (error) {
        // alert("There was some error");
        setStatus("rejected");
        console.log(error);
      }
    }
  }

  return (
    <div className="signin-container">
      <form className="Signin" onSubmit={handleSignIn}>
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt="instagram logo"
          className="logo-img signin-img"
        />
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
            className={`${ipClass("email", values.email)}`}
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
            type={showPassword ? "text" : "password"}
            required
            id="password"
            className={`${ipClass("password ", values.password)}`}
            placeholder="Password"
            aria-label="Enter Password"
            value={values.password}
            onChange={handleChange}
          />
          {values.password && (
            <div
              role="button"
              className="show-pwd"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Hide" : "Show"}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "accepted"}
          className={`login-btn ${
            (!validateData(values) || status === "loading") && "disabled "
          }`}
        >
          Log{status === "loading" && "ing "} In
        </button>
        <div className="signin-or">OR</div>
        <div className="signin-fb-btn">
          <span className="fb-icon">f</span>Log in with Facebook
        </div>
      </form>
      {status === "rejected" && (
        <span className="auth-loading auth-err" role="alert">
          There was some error, try again
          <div className="error">
            <span>!</span>
          </div>
        </span>
      )}
      {status === "loading" && (
        <span className="auth-loading loading">
          Please wait while we log you in
        </span>
      )}
      {status !== "loading" && <NoAccount />}
    </div>
  );
};
const NoAccount = () => (
  <div className="noaccount">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
  </div>
);
export default SignIn;
