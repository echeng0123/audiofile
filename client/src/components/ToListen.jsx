import { useState, useEffect } from "react";
import {
	fetchToListenByUserId,
	createNewListened,
	fetchListenedByUserId,
} from "../../fetching/local";
import { useNavigate } from "react-router-dom";
import DeleteToListen from "./DeleteToListen";

export default function ToListen({ token, userId }) {
	const [toListen, setToListen] = useState([]);
	const [toListenList, setToListenList] = useState([]);
	const [exists, setExists] = useState(false);
	const [userListened, setUserListened] = useState({});
	const [num, setNum] = useState(null);

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

	// sort alphabetically by album name
	useEffect(() => {
		console.log("toListen in UE", toListen);
		const sortedToListen = toListen.sort(function (a, b) {
			if (a.album_name < b.album_name) {
				return -1;
			}
			if (a.album_name > b.album_name) {
				return 1;
			}
			return 0;
		});
		// setToListenList(toListen);
		setToListenList(sortedToListen);
	}, [toListen]);

	useEffect(() => {
		async function getListenedByUserId() {
			try {
				const response = await fetchListenedByUserId(userId);
				// console.log("response from FLBUI", response);
				setUserListened(response);
			} catch (error) {
				console.error(error);
			}
		}
		getListenedByUserId();
	}, [userId]);

	function checkUniqueListened() {
		const found = userListened.find(
			(album) =>
				album.album_name == toListen.album_name &&
				album.artist == toListen.artist
		);
		// console.log("found", found);
		setExists(found);
		return found;
	}

	function getDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		return today;
	}

	// routes to single album page when search result is clicked
	// async function handleClick(n) {
	// 	event.preventDefault();
	// 	setNum(n);
	// }

	async function handleListened(album) {
		event.preventDefault();
		let users_id = userId;
		let artist = album.artist;
		let album_name = album.album_name;
		let image_url = album.image_url;
		let release_date = album.release_date;
		let rating = null;
		let review = "";
		let date_listened = getDate();

		console.log(
			"info",
			users_id,
			artist,
			album_name,
			image_url,
			release_date,
			review,
			rating,
			date_listened
		);

		try {
			checkUniqueListened();
			if (!exists) {
				await createNewListened(
					users_id,
					artist,
					album_name,
					image_url,
					release_date,
					review,
					rating,
					date_listened
				);
				alert("added to listened list");
			} else {
				alert("This album is already on your Listened list.");
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<section id="to-listen-container">
			<h1>TO LISTEN LIST</h1>
			{/* <button>sort a-z</button>
			<button>sort by date added</button> */}
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
								<h3 className="album-info">
									{album.album_name}
								</h3>
								<button onClick={() => handleListened(album)}>
									Add to Listened
								</button>
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
