import { useState, useEffect } from "react";
import { fetchToListenByUserId } from "../../fetching/local";
import { useNavigate } from "react-router-dom";

export default function ToListen({ token, userId }) {
	const [toListen, setToListen] = useState({});
	console.log("userId in ToListen", userId);

	const navigate = useNavigate();

	if (!token) {
		navigate("/login");
	}

	useEffect(() => {
		async function getToListenByUserId() {
			const toListenResponse = await fetchToListenByUserId(userId);
			console.log("to listen response", toListenResponse);
			if (toListenResponse) {
				setToListen(toListenResponse);
				return toListenResponse;
			} else {
				console.log("error fetching drinks");
			}
		}
		getToListenByUserId();
	}, [userId]);

	return (
		<section id="to-listen-container">
			<h1>TO LISTEN LIST HERE</h1>
		</section>
	);
}
