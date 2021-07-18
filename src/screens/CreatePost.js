import { useState } from "react";
import { initialState, ipClass } from "../utils/helper";
import { useImage, useTitle } from "../utils/customHooks";
import { uploadToCloud, createPost } from "../utils/apiCalls";

const CreatePost = () => {
	const { clearImage, ipRef, onSelectFile, image, preview } = useImage();
	const [caption, setCaption] = useState("");
	const [appState, setAppState] = useState(initialState);
	const { status } = appState;

	const handleCreatePost = async (postUrl) => {
		if (postUrl && caption) {
			console.log("if condition");
			const post = await createPost(caption, postUrl);

			if (post) {
				console.log("post created", post);
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
				let resData = await uploadToCloud(data);
				console.log(resData);
				if (resData) {
					handleCreatePost(resData.url);
				} else {
					setAppState({ status: "idle" });
				}
			}
		} catch (error) {
			alert("There is an error, check the console");
			console.log("Error: ", error);
		}
	};
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
					onChange={(e) => setCaption(e.target.value)}
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
