import { Link } from "react-router-dom";
// hookupcloudUrl,
import { ipClass, validateData } from "../utils/helper";
import { useTitle, useForm, useImage } from "../utils/customHooks";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/actions/userActions";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUp = () => {
  const { handleChange, values } = useForm(initialState);
  const { name, email, password, confirmPassword } = values;
  const { clearImage, ipRef, onSelectFile, image, preview } = useImage();
  useTitle("Sign Up - Instagram");
  const { status } = useSelector(state => state.loader.signupLoader);
  const dispatch = useDispatch();
  function submitForm(dpUrl) {
    if (name && password && email && password === confirmPassword) {
      dispatch(signup({ ...values, dpUrl }));
    }
  }

  return (
    <div className="signup-container">
      <br />
      <br />
      <Alreadyaccount />
      <div className="Signup">
        <div className="form-group">
          <label htmlFor="name" className={`${!name ? "dn" : ""} auth-label`}>
            Name
          </label>
          <input
            required
            id="name"
            className={`${ipClass("name", name)}`}
            placeholder="Name"
            aria-label="Enter Name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className={`${!email ? "dn" : ""} auth-label`}>
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            className={`${ipClass("email", email)}`}
            aria-label="Enter Email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="password"
            className={`${!password ? "dn" : ""} auth-label`}
          >
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            className={`${ipClass("password", password)}`}
            placeholder="Password"
            aria-label="Enter Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="confirm-password"
            className={`${!confirmPassword ? "dn" : ""} auth-label`}
          >
            Confirm Password
          </label>
          <input
            type="password"
            required
            id="confirmPassword"
            className={`${ipClass("confirm-password", confirmPassword)}`}
            placeholder="Confirm Password"
            aria-label="Enter Password"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="upload-dp-form">
        <label htmlFor="create" className="lb-upload">
          Add a Display Picture
        </label>
        <input
          type="file"
          id="create"
          onChange={onSelectFile}
          className="ip-upload"
          ref={ipRef}
          accept="image/*"
        />
        {image && (
          <div className="clear-dp-box">
            <button className="clear-dp" onClick={clearImage}>
              X
            </button>
          </div>
        )}
        {image && <img src={preview} alt="" className="dp-preview" />}
        {!image && "No - Image"}
      </div>
      <button
        className={`signup-btn  ${!validateData(values) && "disabled"}`}
        onClick={() => status !== "loading" && submitForm()}
      >
        {status !== "loading" && "Sign up"}
        {status === "loading" && "Creating your account"}
      </button>
    </div>
  );
};

export default SignUp;
const Alreadyaccount = () => (
  <div className="alreadyaccount">
    Already have an account? <Link to="/signin">Sign in</Link>
  </div>
);
