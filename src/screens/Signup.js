import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  apiEndPoint,
  defaultSrc,
  hookupcloudUrl,
  validateData,
} from "../utils/helper";
import { useTitle, useForm } from "../utils/customHooks";
import axios from "axios";
const SignUp = () => {
  const history = useHistory();
  const initialState = {
    signupEmail: "",
    signupName: "",
    signupPassword: "",
    confirmPassword: "",
  };
  const [image, setImage] = useState(""); //this is image file
  const [src, setSrc] = useState(defaultSrc); //this is to show preview
  const { handleChange, values } = useForm(initialState);
  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.addEventListener("load", function () {
        setSrc(`${this.result}`);
      });
    }
  }, [image]);
  useTitle("Sign Up - Instagram");

  async function submitForm(dpUrl = defaultSrc) {
    if (values.signupName && values.signupPassword && values.signupEmail) {
      try {
        const { data } = await axios.post(`${apiEndPoint}/signup`, {
          name: values.signupName.toString().trim() || "Chan",
          password: values.signupPassword || "chan1234", //values.password,
          email: values.signupEmail.toString().trim() || "chan@gmail.com", //values.email,
          dpUrl,
        });
        alert(data.message);
        history.push("/signin");
      } catch (error) {
        alert(error.message);
      }
    }
  }
  async function uploadPic(params) {
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
  const clearImage = () => {
    setImage("");
    setSrc(defaultSrc);
  };
  return (
    <div className="signup-container">
      <Alreadyaccount />
      <div className="Signup">
        <div className="name">
          <label htmlFor="signupName">Name</label>
          <input
            id="signupName"
            placeholder="Enter Name"
            type="text"
            value={values.signupName}
            onChange={handleChange}
          />
        </div>
        <div className="email">
          <label htmlFor="signupEmail">Email</label>
          <input
            id="signupEmail"
            placeholder="Enter Email"
            type="email"
            value={values.signupEmail}
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            placeholder="Enter Password"
            type="password"
            value={values.signupPassword}
            onChange={handleChange}
          />
        </div>
        <div className="password confirmPassword">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <input
          type="file"
          id="createpost"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <div className="createpost-custom">
          <label htmlFor="createpost" className="upload">
            Upload
          </label>
          <div className="image-name ps-rel">
            {image ? (
              <div className="">
                <img src={src} alt="" className="img-preview" />
                <button className="clear-image" onClick={clearImage}>
                  X
                </button>
              </div>
            ) : (
              <img
                src={defaultSrc}
                alt=""
                className="img-preview"
                style={{ width: "80px" }}
              />
            )}
          </div>
        </div>
        <button
          className={`signup-btn  ${!validateData(values) && "disabled"}`}
          onClick={uploadPic}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
const Alreadyaccount = () => (
  <div className="alreadyaccount">
    <Link to="/signin">Already have an account? Sign in</Link>
  </div>
);
