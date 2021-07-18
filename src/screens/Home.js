import { useState, useEffect, useCallback } from "react";
import { useMount, useTitle } from "../utils/customHooks";
import { fetchPosts } from "../utils/apiCalls";
import Post from "../components/Post";
import { initialState } from "../utils/helper";
import { useSelector } from "react-redux";
const Home = () => {
	const { user } = useSelector((user) => user);
	const [{ data, error, status }, setAppState] = useState({
		...initialState,
		data: [],
	});

	const isMounted = useMount();
	useTitle("Home - Instagram");

	const handleFetchPosts = useCallback(async () => {
		try {
			if (isMounted) {
				setAppState({ status: "loading", data: [] });
				const response = await fetchPosts();
				if (isMounted) {
					setAppState({ status: "accepted", data: response.data });
				}
			}
		} catch (error) {
			if (isMounted) {
				setAppState({ status: "rejected", error });
			}
		}
	}, [isMounted]);
	const likeFunction = (postData) => {
		const newData = data.map((post) => {
			if (postData._id === post._id) {
				return postData;
			}
			return post;
		});
		setAppState({ status: "accepted", data: newData });
	};
	useEffect(() => {
		if (user) {
			handleFetchPosts();
		}
		return () => {};
	}, [handleFetchPosts, user]);
	return (
		<div className="home">
			<br />
			{data?.length > 0 &&
				data.map((item) => {
					return (
						<Post
							key={item?._id}
							postId={item?._id}
							isOwnPost={user?._id === item?.postedBy?._id}
							src={item?.postUrl}
							postedBy={item?.postedBy}
							likes={item?.likes}
							dpUrl={item?.dpUrl}
							caption={item?.caption}
							isLiked={item?.likes?.includes(user?._id)}
							likeFunction={likeFunction}
						/>
					);
				})}
			{data?.length === 0 && status === "idle" && (
				<>
					<h1>No Posts on the Feed</h1>
					<button onClick={handleFetchPosts}>Try refetching?</button>
				</>
			)}
			{status === "loading" && (
				<div className="loader-preview">
					<div className="instagram-loader">
						<div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			)}
			{status === "rejected" && (
				<div style={{ fontSize: "25px" }}>
					<p role="alert">
						Some error
						<span>{error?.message}</span>
					</p>
					<button onClick={handleFetchPosts}>Try refetching?</button>
				</div>
			)}
		</div>
	);
};

export default Home;
/*
      {!user && (
        <Link to={"/signin"}>
          <h3 className="">Please Login</h3>
        </Link>
      )}
*/
// <div
//   className="loading "
//   style={{ position: "absolute", fontSize: "55px" }}
// >
//   Loading
// </div>
