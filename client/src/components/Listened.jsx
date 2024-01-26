import { useState, useEffect } from "react";
import { fetchListenedByUserId, fetchUserByUserId } from "../../fetching/local";
import { useNavigate } from "react-router-dom";
import DeleteListened from "./DeleteListened";
import EditListened from "./EditListened";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Listened({ token, userId }) {
	const [listened, setListened] = useState([]);
	const [listenedList, setListenedList] = useState([]);
	const [username, setUsername] = useState("");
	const [userIdNo, setUserIdNo] = useState(null);

	const navigate = useNavigate();

	if (!token) {
		navigate("/login");
	}

	useEffect(() => {
		async function getUserInfoByUserId() {
			const response = await fetchUserByUserId(userId);
			console.log("response from user id", response);
			setUsername(response.username);
			setUserIdNo(response.users_id);
		}
		getUserInfoByUserId();
	}, [userId]);

	useEffect(() => {
		async function getListenedByUserId() {
			console.log("userId in getListenedByUserId", userIdNo);
			const ListenedResponse = await fetchListenedByUserId(userIdNo);
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
	}, [userIdNo]);

	useEffect(() => {
		console.log("listened in UE", listened);
		setListenedList(listened);
	}, [listened]);

	return (
		<section id="listened-container">
			<h1 id="listened-header">LISTENED LIST</h1>
			{listenedList ? (
				<div id="to-listen-gallery">
					{listenedList.map((album) => {
						return (
							<div
								id="album-card-to-listen"
								key={album.listened_id}
							>
								<div className="album-art-name">
									<img
										src={album.image_url}
										alt="album art"
										className="album-art"
									/>
									<div className="listened-album-info">
										<h2>
											<b>{album.album_name} </b>
											{album.release_date.slice(0, 4)}
											<br />
										</h2>
										<p>
											<b>by {album.artist}.</b> added to
											list on {album.date_listened}
										</p>
										<Rating
											name="half-rating-read"
											defaultValue={album.rating}
											precision={0.5}
											readOnly
											emptyIcon={
												<StarBorderIcon
													style={{
														opacity: 0.55,
														color: "white",
													}}
													fontSize="inherit"
												/>
											}
										/>
										<p>{album.review}</p>
									</div>
								</div>
								<div></div>
								<div className="listened-buttons-container">
									<EditListened
										listened_id={album.listened_id}
									/>
									<br />
									<DeleteListened
										listened_id={album.listened_id}
									/>
								</div>
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
