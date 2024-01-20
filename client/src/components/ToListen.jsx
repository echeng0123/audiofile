import { useState, useEffect } from "react";
import { fetchToListenByUserId } from "../../fetching/local";
import { useNavigate } from "react-router-dom";
import DeleteToListen from "./DeleteToListen";

export default function ToListen({ token, userId }) {
	const [toListen, setToListen] = useState([]);
	const [toListenList, setToListenList] = useState([]);

	useEffect(() => {
		console.log("userId in ToListen", userId);
		console.log("token in ToListen", token);
	}, []);

	const navigate = useNavigate();

	if (!token) {
		navigate("/login");
	}

	useEffect(() => {
		async function getToListenByUserId() {
			console.log("userId in getToListenByUserId", userId);
			const toListenResponse = await fetchToListenByUserId(userId);
			console.log("to listen response", toListenResponse);
			try {
				if (toListenResponse) {
					setToListen(toListenResponse);
				}
				return toListenResponse;
			} catch (error) {
				console.error("error fetching to listen list");
			}
		}
		getToListenByUserId();
	}, [userId]);

	useEffect(() => {
		console.log("toListen in UE", toListen);
		setToListenList(toListen);
	}, [toListen]);

	return (
		<section id="to-listen-container">
			<h1>TO LISTEN LIST</h1>
			{toListenList ? (
				<div id="to-listen-gallery">
					{toListenList.map((album) => {
						return (
							<div
								id="album-card-to-listen"
								key={album.to_listen_id}
							>
								<img
									src={album.image_url}
									alt="album art"
									className="album-art"
								/>
								<h3 className="album-info">{album.artist}</h3>
								<p className="album-info">{album.album_name}</p>
								<DeleteToListen
									to_listen_id={album.to_listen_id}
								/>
							</div>
						);
					})}
				</div>
			) : (
				<>
					<p>
						No items in your To Listen list.{" "}
						<a href="/search">Add something?</a>
					</p>
				</>
			)}
		</section>
	);
}
