import { useContext, useState } from "react";
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
  const [status, setStatus] = useState("idle");
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
          disabled={status === "loading" || status === "accepted"}
          className={`login-btn ${
            (!validateData(values) || status === "loading") && "disabled "
          }`}
        >
          Log{status === "loading" && "ing "} In
        </button>
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
    <Link to={ROUTES.SIGN_UP}>Don't have an account? Sign up</Link>
  </div>
);
export default SignIn;
