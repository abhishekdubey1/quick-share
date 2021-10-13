import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeToasts } from "../../store/actions/toastActions";
import { uploadToCloud } from "../../utils/apiCalls";
import { useForm, useImage } from "../../utils/customHooks";
import { apiEndPoint, ipClass } from "../../utils/helper";

function getUserFromLocal() {
  return JSON.parse(localStorage.getItem("user"));
}
function setValueInLocal(key, value) {
  let user = getUserFromLocal();
  user = { ...user, [key]: value };
  localStorage.setItem("user", JSON.stringify(user));
}

export const EditProfile = () => {
  const { handleChange, values } = useForm(() => ({
    name: getUserFromLocal().name,
    email: getUserFromLocal().email
  }));
  const { name, email } = values;
  const stateRef = useRef({
    name: getUserFromLocal().name,
    email: getUserFromLocal().email
  });
  const isChanged = JSON.stringify(values) !== JSON.stringify(stateRef.current);
  const editDetails = async () => {
    const { data } = await axios.put(
      `${apiEndPoint}/user`,
      {
        name,
        email
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      }
    );
    setValueInLocal("name", data.user.name);
    setValueInLocal("email", data.user.email);
  };
  return (
    <div className="edit-profile Signup">
      <div>
        <Link to="/edit-dp">Edit Display Picture </Link>
        <br />
        <hr />
        <br />
        <Link to="/edit-password">Edit Password</Link>
      </div>
      <div className="form-group">
        <label htmlFor="email" className={`${!email ? "dn" : ""} auth-label`}>
          Email
        </label>
        <input
          required
          id="email"
          className={`${ipClass("email", email)}`}
          placeholder="New Email"
          aria-label="New email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name" className={`${!name ? "dn" : ""} auth-label`}>
          Name
        </label>
        <input
          required
          id="name"
          className={`${ipClass("name", name)}`}
          placeholder="New Name"
          aria-label="New name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <button
        className={`btn-edit-save ${isChanged ? "" : "not-changed"}`}
        onClick={() => isChanged && editDetails()}
      >
        Save
      </button>
    </div>
  );
};

export const EditDp = () => {
  const { clearImage, ipRef, onSelectFile, image, preview } = useImage();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const savePicToCloud = async () => {
    try {
      if (image && !loading) {
        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "hook-up");
        data.append("cloud_name", "hookupcloudddddddddddd");
        let resData = await uploadToCloud(data);
        if (resData?.url) {
          const { data } = await axios.put(
            `${apiEndPoint}/user`,
            { dpUrl: resData.url },
            {
              headers: {
                Authorization: localStorage.getItem("jwt")
              }
            }
          );
          setValueInLocal("dpUrl", data.url);
          dispatch(makeToasts("success", "Picture updated successfully"));
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      dispatch(makeToasts("error", "There was some error creating the post"));
    }
    setLoading(false);
    clearImage();
  };

  return (
    <div className="createpost fl-ct edit-dp">
      {image ? (
        <div className="clear-img-box fl-ct">
          {image && <img src={preview} alt="" className="dp-preview" />}
        </div>
      ) : (
        "No - Image Selected"
      )}
      <div className="fl-ct">
        <button
          className={`btn-edit-save upload ${image ? "" : "not-changed"}`}
          onClick={() => image && !loading && savePicToCloud()}
        >
          {loading ? (
            <span className="loading" color="black">
              Loading
            </span>
          ) : (
            "Save"
          )}
        </button>
        <label htmlFor="create" className="upload">
          Upload
        </label>
        <input
          type="file"
          id="create"
          className="dn"
          onChange={onSelectFile}
          ref={ipRef}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export const EditPassword = () => {
  const { handleChange, values } = useForm({
    new: "",
    old: "",
    confirm: ""
  });
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async e => {
    e.preventDefault();
    if (disabled || loading) {
      return;
    }
    setLoading(false);
    try {
      const { data } = await axios.put(
        `${apiEndPoint}/user`,
        { newPassword: values.new, oldPassword: values.old },
        {
          headers: {
            Authorization: localStorage.getItem("jwt")
          }
        }
      );
      dispatch(makeToasts("success", data.message));
    } catch (error) {
      dispatch(makeToasts("error", error.response.data.error || "Some error"));
    }
    setLoading(false);
  };

  const toggle = () =>
    type === "password" ? setType("text") : setType("password");

  const disabled =
    !values.old || !values.new || !(values.old === values.confirm);

  return (
    <form onSubmit={handleSubmit} className="edit-profile Signup">
      <div className="form-group">
        <label
          htmlFor="new"
          className={`${!values.new ? "dn" : ""} auth-label`}
        >
          New Password
        </label>
        <input
          required
          type={type}
          id="new"
          className={`${ipClass("password", values.new)}`}
          placeholder="New Password"
          aria-label="New Password"
          value={values.new}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label
          htmlFor="old"
          className={`${!values.old ? "dn" : ""} auth-label`}
        >
          Old Password
        </label>
        <input
          required
          type={type}
          id="old"
          className={`${ipClass("password", values.old)}`}
          placeholder="Old Password"
          aria-label="Old Password"
          value={values.old}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label
          htmlFor="confirm"
          className={`${!values.confirm ? "dn" : ""} auth-label`}
        >
          Confirm Password
        </label>
        <input
          required
          type={type}
          id="confirm"
          className={`${ipClass("confirm-password", values.confirm)}`}
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          value={values.confirm}
          onChange={handleChange}
        />
      </div>

      <div className="cu-po fs-md" role="button" onClick={toggle}>
        {type === "password" ? "Show Passwords" : "Hide Passwords"}
      </div>
      <button type="submit" className="fs-md" disabled={disabled}>
        {loading ? <span className="loading">Changing</span> : "Save"}
      </button>
    </form>
  );
};
