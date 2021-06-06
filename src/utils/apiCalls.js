import axios from "axios";
import { apiEndPoint } from "./helper";
const headers = {
	headers: {
		Authorization: "Bearer " + localStorage.getItem("jwt"),
	},
};
export const likePost = async (postId) => {
	try {
		const response = await axios.put(
			`${apiEndPoint}/like`,
			{ postId },
			{ ...headers }
		);
		return response;
	} catch (error) {
		alert("There was some error");
		console.log(error);
		// return error;
	}
};
export const unlikePost = async (postId) => {
	try {
		const response = await axios.put(
			`${apiEndPoint}/unlike`,
			{ postId },
			{ ...headers }
		);
		return response;
	} catch (error) {
		alert("There was some error");
		console.log(error);
		// return error;
	}
};
export const fetchPosts = async () => {
	try {
		const response = await axios(`${apiEndPoint}/allposts`, { ...headers });
		return response;
	} catch (error) {
		alert("There was some error");
		console.log(error);
		throw new Error(error);
		// return error;
	}
};
export const makeComment = async (text, postId) => {
	try {
		const { data } = await axios.put(
			`${apiEndPoint}/comment`,
			{ text, postId },
			{ ...headers }
		);
		return data.comments;
	} catch (error) {
		alert("There was some error");
		console.log(error);
		// return error;
	}
};
export const removeComment = async (commentId, postId) => {
	try {
		const url = `${apiEndPoint}/comment/${commentId}/${postId}`;
		const { data } = await axios.delete(url, {
			...headers,
		});
		return data;
	} catch (error) {
		alert("There was some error");
		console.log(error);
		// return error;
	}
};
export const deletePost = async (postid) => {
	try {
		const { data } = await axios.delete(`/deletepost/${postid}`, {
			...headers,
		});
		console.log({ data });
		//   const newData = data.filter((item) => {
		//     return item._id !== result._id;
		//   });
		//   setData(newData);
	} catch (error) {
		alert("There was some error");
		console.log(error);
		// return error;
	}
};
export const fetchSubPosts = async () => {
	try {
		const response = await axios(`${apiEndPoint}/getsubpost`, {
			...headers,
		});
		return response;
	} catch (error) {
		console.log(error);
		alert("Oops! there was an error");
		// return error;
	}
};
export const follow = async (followId) => {
	try {
		const response = axios.put(
			`${apiEndPoint}/follow`,
			{ followId },
			{ ...headers }
		);
		return response;
		// setData(newData);
	} catch (error) {
		alert("There was some error");
		console.log(error);
		// return error;
	}
};
export const unFollow = async (unfollowId) => {
	try {
		const response = await axios.put(
			`${apiEndPoint}/unfollow`,
			{ unfollowId },
			{ ...headers }
		);
		return response;
		// setData(newData);
	} catch (error) {
		alert("There was some error");
		console.log(error);
		// return error;
	}
};
export const fetchUser = async (id, setUser, setPosts) => {
	try {
		const result = await axios(`${apiEndPoint}/user/${id}`, { ...headers });
		setUser(result.data.user);
		setPosts(result.data.posts);
		return result;
	} catch (error) {
		console.log(error);
		alert("Oops! there was an error");
		// return error;
	}
};
export const fetchUserPosts = async () => {
	try {
		const response = await axios(`${apiEndPoint}/posts`, { ...headers });
		return response;
	} catch (error) {
		console.log(error);
		alert("Oops! there was an error");
		return [];
		// return error;
	}
};
export const uploadToCloud = async (data) => {
	let res = await fetch(
		" https://api.cloudinary.com/v1_1/hookupcloudddddddddddd/image/upload",
		{
			method: "post",
			body: data,
		}
	);
	let resData = res.json();
	return resData;
};
export const createPost = async (caption, postUrl) => {
	try {
		let res = await fetch(`${apiEndPoint}/createpost`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
			body: JSON.stringify({
				caption,
				postUrl,
			}),
		});
		console.log("got a res from be");
		let data = res.json();
		if (data.error) {
			alert("There is an error in creating post");
			console.log("Error: ", data.error);
			throw new Error(data.error);
		} else {
			alert("Created post Successfully");
			return data;
		}
	} catch (error) {
		alert("There is an error in creating post 2");
		console.log("Error: ", error);
	}
};

// export function ()
