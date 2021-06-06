import { useContext, useEffect, useState } from "react";
import { Main, PhotoPosts } from "../components/Profile/ProfileComponents";
import { Picture, Stats } from "../components/Profile/ProfileComponents";
import { UserContext } from "../context/UserContext";
import { fetchUserPosts } from "../utils/apiCalls";
import { useMount, useTitle } from "../utils/customHooks";
import { capitalize } from "../utils/helper";

const Profile = () => {
	const { state } = useContext(UserContext);
	let { dpUrl, name, email, followers, following, postsCount } =
		state || JSON.parse(localStorage.getItem("user"));
	const [posts, setPosts] = useState([]);
	useTitle(`${capitalize(name)} - Instagram`);
	const isMounted = useMount();
	useEffect(() => {
		fetchUserPosts()
			.then((res) => {
				if (isMounted) {
					setPosts(res.data);
				}
			})
			.catch((err) => console.error(err));
	}, [isMounted]);
	useEffect(() => console.log(posts), [posts]);
	return (
		<div className="profile">
			<header className="profile__head">
				<Picture dpUrl={dpUrl} name={name} />
				<Main name={name} showFollow={false} showEdit={true} />
				<h2 className="profile__email">{email}</h2>
				<Stats
					postsCount={postsCount}
					followers={followers}
					following={following}
				/>
			</header>
			<PhotoPosts posts={posts || []} />
		</div>
	);
};

export default Profile;
// const [image, setImage] = useState("");

// useEffect(() => {
// 	if (image) {
// 		const data = new FormData();
// 		data.append("file", image);
// 		data.append("upload_preset", "insta-clone");
// 		data.append("cloud_name", "cnq");
// 		fetch("https://api.cloudinary.com/v1_1/cnq/image/upload", {
// 			method: "post",
// 			body: data,
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				fetch("/updatepic", {
// 					method: "put",
// 					headers: {
// 						"Content-Type": "application/json",
// 						Authorization: "Bearer " + localStorage.getItem("jwt"),
// 					},
// 					body: JSON.stringify({
// 						pic: data.url,
// 					}),
// 				})
// 					.then((res) => res.json())
// 					.then((result) => {
// 						console.log(result);
// 						localStorage.setItem(
// 							"user",
// 							JSON.stringify({ ...state, pic: result.pic })
// 						);
// 						dispatch({ type: "UPDATEPIC", payload: result.pic });
// 						//window.location.reload()
// 					});
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}
// }, [dispatch, image, state]);
// const updatePhoto = (file) => {
// 	setImage(file);
// };
// const deleteLater = () => {
// 	updatePhoto();
// 	updateProfile();
// };
// function updateProfile() {
// 	fetch("/mypost", {
// 		headers: {
// 			Authorization: "Bearer " + localStorage.getItem("jwt"),
// 		},
// 	})
// 		.then((res) => res.json())
// 		.then((result) => {
// 			console.log(result);
// 			setPics(result.mypost);
// 		});
// }
//	false && <button onClick={() => false && deleteLater()}>caution</button>;
// <div className="profile-posts-container">
// 	{data?.length &&
// 		data.map((el) => (
// 			<div key={el[0]} className="profile-posts-columns">
// 				{el.map((inEl) => (
// 					<div key={inEl} className="profile-posts-row">
// 						{
// 							<img
// 								className="profile-posts"
// 								src={"imgUrl"}
// 								alt={"post by" + name}
// 							/>
// 						}
// 					</div>
// 				))}
// 			</div>
// 		))}
// </div>;
