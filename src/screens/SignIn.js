import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES, ipClass } from "../utils/helper";
import { useTitle, useForm } from "../utils/customHooks";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
const initialState = { email: "test1@gmail.com", password: "test123" };
const SignIn = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.loader.signinLoader);
  useTitle("Login - Instagram");
  const { handleChange, values } = useForm(initialState);
  const [showPassword, setShowPassword] = useState(false);
  function handleSignIn(e) {
    e.preventDefault();
    if (
      values.email.toString().trim() &&
      values.password.toString().trim() &&
      status !== "loading"
    ) {
      dispatch(login({ email: values.email, password: values.password }));
    }
  }

  return (
    <div className="signin-container">
      <form className="Signin" onSubmit={handleSignIn}>
        {false && (
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
            alt="instagram logo"
            className="logo-img signin-img"
          />
        )}
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
              onClick={() => setShowPassword(s => !s)}
            >
              {showPassword ? "Hide" : "Show"}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "accepted"}
          className={`login-btn ${
            ""
            // (!validateData(values) || status === "loading") && "disabled "
          }`}
        >
          Log{status === "loading" && "ing "} In
        </button>
        <div className="signin-or">OR</div>
        <div className="signin-fb-btn">
          <span className="fb-icon">f</span>Log in with Facebook
        </div>
      </form>

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
    Don't have an account? <Link to={`/${ROUTES.SIGN_UP}`}>Sign up</Link>
  </div>
);
export default SignIn;

// //  status === "fail" && (
//     <div className="auth-loading auth-err" role="alert">
//       {
//         error
//         //There was some error, try again
//       }

//       <div className="error">
//         <span>!</span>
//       </div>
//     </div>
//   );
// }
