import { fetchUserByUserId } from "../../fetching/local";
import { useEffect, useState } from "react";

export default function Home({ token, userId }) {
	console.log("userId in Home", userId);
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

	// converts string to title case/sentence case for later display in rendering
	function titleCase(str) {
		str = str.toLowerCase().split(" ");
		for (let i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		return str.join(" ");
	}

	return (
		<section id="home-container">
			{userId && (
				<div>
					<h1>Welcome, {titleCase(username)}</h1>
					<p>Your user id is {userIdNo}.</p>
				</div>
			)}
		</section>
	);
}
