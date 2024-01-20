import { fetchUserByUserId } from "../../fetching/local";
import { useState, useEffect } from "react";

export default function Profile({ token, userId }) {
	const [username, setUsername] = useState("");
	const [userIdNo, setUserIdNo] = useState(null);

	useEffect(() => {
		async function getUserInfoByUserId() {
			const response = await fetchUserByUserId(userId);
			console.log("response from user id", response);
			setUsername(response.username);
			setUserIdNo(response.users_id);
		}
		getUserInfoByUserId();
	}, []);

	return (
		<section>
			{username && (
				<div
					style={{ display: "flex", justifyContent: "space-evenly" }}
				>
					<h2>avi</h2>
					<h2>{username}</h2>
				</div>
			)}
		</section>
	);
}
