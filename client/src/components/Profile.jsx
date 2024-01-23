import { fetchUserByUserId, fetchListenedByUserId } from "../../fetching/local";
import { useState, useEffect } from "react";
import Listened from "./Listened";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import EditListened from "./EditListened";
import DeleteListened from "./DeleteListened";

export default function Profile({ token, userId }) {
	const [username, setUsername] = useState("");
	const [userIdNo, setUserIdNo] = useState(null);
	const sortedListened = [];

	useEffect(() => {
		async function getUserInfoByUserId() {
			const response = await fetchUserByUserId(userId);
			console.log("response from user id", response);
			setUsername(response.username);
			setUserIdNo(response.users_id);
		}
		getUserInfoByUserId();
	}, [userId]);

	const [listened, setListened] = useState([]);
	const [listenedList, setListenedList] = useState([]);

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
	}, [userId, userIdNo]);

	useEffect(() => {
		console.log("listened in UE", listened);
		setListenedList(listened);
	}, [listened]);

	// useEffect(() => {
	// 	console.log("listened in UE", sortedListened);
	// 	if (sortedListened.length > 0) {
	// 		setListenedList(sortedListened);
	// 	} else {
	// 		setListenedList(listened);
	// 	}
	// 	// setListenedList(sortedListened);
	// }, [listened, sortedListened]);

	function handleAlphabetize(inputArray) {
		sortedListened.push(
			inputArray.sort(function (a, b) {
				if (a.album_name < b.album_name) {
					return -1;
				}
				if (a.album_name > b.album_name) {
					return 1;
				}
				return 0;
			})
		);
		return sortedListened;
	}

	function handleSortByDate(inputArray) {
		sortedListened.push(
			inputArray.sort(function (a, b) {
				if (a.date_listened < b.date_listened) {
					return -1;
				}
				if (a.date_listened > b.date_listened) {
					return 1;
				}
				return 0;
			})
		);
		return sortedListened;
	}

	return (
		<section>
			{username && (
				<div style={{ display: "flex", justifyContent: "flex-start" }}>
					<h2
						style={{
							border: "1px solid goldenrod",
							marginRight: "1rem",
							padding: "1rem",
						}}
					>
						icon
					</h2>
					<h2
						style={{
							marginRight: "1rem",
							padding: "1rem",
						}}
					>
						{username}
					</h2>
				</div>
			)}
			<div>
				<h4 style={{ textAlign: "left" }}>RECENT ACTIVITY</h4>
				{listenedList ? (
					<div id="profile-gallery">
						{listenedList
							.slice(listenedList.length - 6, listenedList.length)
							.map((album) => {
								return (
									<div key={album.listened_id}>
										<img
											src={album.image_url}
											alt="album art"
											className="profile-album-art"
										/>
										<h4>{album.album_name}</h4>
										<Rating
											name="half-rating-read"
											defaultValue={album.rating}
											precision={0.5}
											readOnly
										/>
									</div>
								);
							})}
					</div>
				) : (
					<></>
				)}
				<h4 style={{ textAlign: "left" }}>RECENT REVIEWS:</h4>
				{/* <button onClick={() => handleAlphabetize(listened)}>
					sort a-z
				</button> */}
				{/* <button onClick={() => handleSortByDate(listened)}>
					sort by date added
				</button> */}
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
												<b>by {album.artist}.</b> added
												to list on {album.date_listened}
											</p>
											<Rating
												name="half-rating-read"
												defaultValue={album.rating}
												precision={0.5}
												readOnly
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
			</div>
		</section>
	);
}
