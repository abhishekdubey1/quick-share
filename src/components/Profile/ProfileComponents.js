import FollowBtn from "../FollowBtn";

export function Picture(props) {
	return (
		<div className="profile__picture">
			<img src={props.dpUrl} alt={`Display of ${props.name.toUpperCase()}`} />
		</div>
	);
}
export function Main(props) {
	return (
		<div className="profile__main">
			<h1 className="profile__name">{props.name}</h1>
			{false && (
				<button onClick={() => console.log("editted")}>Edit Profile</button>
			)}
			{props.showFollow && (
				<FollowBtn
					userid={props.userid}
					isFollowed={props.isFollowed}
					postsCount={props.postsCount}
					setUser={props.setUser}
				/>
			)}
		</div>
	);
}
export function Stats(props) {
	return (
		<ul className="profile__stats">
			<li>
				<b>{props.postsCount || 0}</b> posts
			</li>
			<li>
				<b>{props.followers.length}</b> followers
			</li>
			<li>
				<b>{props.following.length}</b> followings
			</li>
		</ul>
	);
}
export function PhotoPosts(props) {
	return (
		<div id="photos" style={{ margin: "80px 20px" }}>
			{props.posts.map((postEl) => (
				<img
					src={postEl.postUrl}
					alt={postEl.caption}
					key={postEl._id}
					className="abcd"
				/>
			))}
		</div>
	);
}
