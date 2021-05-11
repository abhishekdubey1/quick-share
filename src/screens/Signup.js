import { Link, useHistory } from "react-router-dom";
import {
  apiEndPoint,
  defaultSrc,
  hookupcloudUrl,
  validateData,
} from "../utils/helper";
import { useTitle, useForm, useImage } from "../utils/customHooks";
import axios from "axios";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const history = useHistory();
  const { handleChange, values } = useForm(initialState);
  const { name, email, password, confirmPassword } = values;
  const { clearImage, ipRef, onSelectFile, image, preview } = useImage();
  useTitle("Sign Up - Instagram");

  async function submitForm(dpUrl = defaultSrc) {
    if (name && password && email && password === confirmPassword) {
      try {
        const { data } = await axios.post(`${apiEndPoint}/signup`, {
          name: name.toString().trim() || "Chan",
          password: password || "chan1234", //password,
          email: email.toString().trim() || "chan@gmail.com", //email,
          dpUrl,
        });
        alert(data.message);
        history.push("/signin");
      } catch (error) {
        alert(error.message);
      }
    }
  }
  async function uploadPic() {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "hook-up");
      data.append("cloud_name", "hookupcloudddddddddddd");
      console.log("request to cloud");
      const res = await fetch(hookupcloudUrl, {
        method: "post",
        body: data,
      });
      const resData = await res.json();
      console.log("res from cloud", { url: resData.url });
      submitForm(resData.url);
    } else {
      submitForm();
    }
  }
  return (
    <div className="signup-container">
      <Alreadyaccount />
      <div className="Signup">
        <div className="form-group">
          <label htmlFor="name" className={`${!name ? "dn" : ""} auth-label`}>
            Name
          </label>
          <input
            required
            id="name"
            className="name"
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
            className="email"
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
            className="password"
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
            className="confirm-password"
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
        onClick={uploadPic}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
const Alreadyaccount = () => (
  <div className="alreadyaccount">
    <Link to="/signin">Already have an account? Sign in</Link>
  </div>
);
