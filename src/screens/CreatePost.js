import { useState } from "react";
import { useHistory } from "react-router-dom";
import { initialState } from "../utils/helper";
import { useImage, useTitle } from "../utils/customHooks";
import { Input } from "../components/Element-Component";
import { uploadToCloud, createPost } from "../utils/apiCalls";

const CreatePost = () => {
  const history = useHistory();
  const { clearImage, ipRef, onSelectFile, image, preview } = useImage();
  const [caption, setCaption] = useState("");
  const [appState, setAppState] = useState(initialState);
  const { status } = appState;

  const handleCreatePost = async (postUrl) => {
    if (postUrl && caption) {
      const post = await createPost(caption, postUrl);
      if (post) {
        history.push("/");
      }
    }
  };
  useTitle("Create - Instagram");
  const savePicToCloud = async () => {
    try {
      if (image && status === "idle") {
        setAppState({ status: "loading" });
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "hook-up");
        data.append("cloud_name", "hookupcloudddddddddddd");
        let resData = await uploadToCloud;
        if (resData) {
          handleCreatePost(resData.url);
        }
      }
    } catch (error) {
      alert("There is an error, check the console");
      console.log("Error: ", error);
    }
  };
  return (
    <div className="createpost">
      <Input
        className="title"
        value={caption}
        label="Caption"
        placeholder="Caption for the body"
        onChangeFn={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        id="createpost"
        onChange={onSelectFile}
        ref={ipRef}
        accept="image/*"
      />
      <div className="createpost-custom">
        <label htmlFor="createpost" className="upload">
          Upload
        </label>
        <div className="image-name ps-rel">
          {image && (
            <>
              <img src={preview} alt="" className="img-preview" />
              <button className="clear-image" onClick={clearImage}>
                X
              </button>
            </>
          )}
          {!image && "No - Image"}
        </div>
      </div>
      <div>
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
