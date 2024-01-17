import { useState, useEffect } from "react";
import { fetchListenedByUserId } from "../../fetching/local";
import { useNavigate } from "react-router-dom";
import DeleteListened from "./DeleteListened";
import EditListened from "./EditListened";
import Rating from "@mui/material/Rating";

export default function Listened({ token, userId }) {
	const [listened, setListened] = useState([]);
	const [listenedList, setListenedList] = useState([]);

	useEffect(() => {
		console.log("userId in listened", userId);
		console.log("token in listened", token);
	}, []);

	const navigate = useNavigate();

	if (!token) {
		navigate("/login");
	}

	useEffect(() => {
		async function getListenedByUserId() {
			console.log("userId in getListenedByUserId", userId);
			const ListenedResponse = await fetchListenedByUserId(userId);
			console.log("listened response", ListenedResponse);
			try {
				if (ListenedResponse) {
					setListened(ListenedResponse);
				}
				return ListenedResponse;
			} catch (error) {
				console.error("error fetching listened list");
			}
		}
		getListenedByUserId();
	}, [userId]);

	useEffect(() => {
		console.log("listened in UE", listened);
		setListenedList(listened);
	}, [listened]);

	return (
		<section id="listened-container">
			<h1>LISTENED LIST</h1>
			{listenedList ? (
				<div id="to-listen-gallery">
					{listenedList.map((album) => {
						return (
							<div
								id="album-card-to-listen"
								key={album.listened_id}
							>
								<img
									src={album.image_url}
									alt="album art"
									className="to-listen"
								/>
								<h2>{album.album_name}</h2>
								<h3>{album.artist}</h3>
								<Rating
									name="half-rating-read"
									defaultValue={album.rating}
									precision={0.5}
									readOnly
								/>
								{/* {"⭐".repeat(album.rating)} */}
								<p>{album.review}</p>
								<EditListened listened_id={album.listened_id} />
								<br />
								<DeleteListened
									listened_id={album.listened_id}
								/>
							</div>
						);
					})}
				</div>
			) : (
				<>
					<p>
						No items in your Listened list.{" "}
						<a href="/search">Add something?</a>
					</p>
				</>
			)}
		</section>
	);
}
