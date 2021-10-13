import { useState } from "react";
import { initialState, ipClass } from "../utils/helper";
import { useImage, useTitle } from "../utils/customHooks";
import { uploadToCloud, createPost } from "../utils/apiCalls";
import { Link } from "react-router-dom";
import { makeToasts } from "../store/actions/toastActions";
import { useDispatch } from "react-redux";

const CreatePost = () => {
  const { clearImage, ipRef, onSelectFile, image, preview } = useImage();
  const [caption, setCaption] = useState("");
  const [appState, setAppState] = useState(initialState);
  const { status, data } = appState;
  const dispatch = useDispatch();
  useTitle("Create Post - Instagram");
  const savePicToCloud = async () => {
    try {
      if (image && status === "idle") {
        setAppState({ status: "loading" });
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "hook-up");
        data.append("cloud_name", "hookupcloudddddddddddd");
        let resData = await uploadToCloud(data);
        if (resData) {
          if (resData.url && caption) {
            const { post, message } = await createPost(caption, resData.url);
            setAppState({ data: post, status: "accepted" });
            dispatch(makeToasts("success", message));
          }
        } else {
          setAppState({ status: "idle" });
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      setAppState({ status: "idle" });
      dispatch(makeToasts("error", "There was some error creating the post"));
    }
    clearImage();
    setCaption("");
  };
  if (status === "accepted") {
    return (
      <div className="post-created">
        <p>
          Post created: <Link to={`/post/${data?._id}`}>{data?.caption}</Link>
          <img src={data.photo} alt={`post with caption: ${data.caption}`} />
        </p>
        <button onClick={() => setAppState({ status: "idle" })}>
          New Post
        </button>
      </div>
    );
  }
  return (
    <div className="createpost">
      <div className="form-group">
        <label
          htmlFor="caption"
          className={`${!caption ? "dn" : ""} auth-label`}
          style={{ paddingTop: "5px" }}
        >
          Caption
        </label>
        <input
          style={{ margin: "10px 0px 0px 0px" }}
          required
          id="caption"
          className={`${ipClass("caption", caption)}`}
          aria-label="Enter caption"
          placeholder="Caption For Post"
          value={caption}
          onChange={e => setCaption(e.target.value)}
        />
      </div>
      <div className="create-post">
        {status !== "loading" && (
          <label htmlFor="create" className="upload">
            Upload
          </label>
        )}
        <input
          type="file"
          id="create"
          className="dn"
          onChange={onSelectFile}
          ref={ipRef}
          accept="image/*"
        />
        {image && status !== "loading" && (
          <div className="clear-img-box">
            <button className="clear-img" onClick={clearImage}>
              X
            </button>
          </div>
        )}
        {image && <img src={preview} alt="" className="img-preview" />}
        {!image && "No - Image"}
      </div>
      <div style={{ margin: "10px" }}>
        <button
          className={`submit-btn ${status === "loading" ? "loading" : ""}`}
          onClick={savePicToCloud}
          disabled={
            status === "accepted" ||
            status === "rejected" ||
            status === "loading"
          }
        >
          Submit post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
