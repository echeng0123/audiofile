import {
	createNewToListen,
	createNewListened,
	fetchToListenByUserId,
	fetchListenedById,
	fetchListenedByUserId,
} from "../../fetching/local";
import EditListened from "./EditListened";
import { Stack, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function AlbumCard({ userId, albums, token, num }) {
	// console.log("we are in albumcard");
	// console.log("albums in albumcard", albums);
	const [isOpen, setIsOpen] = useState(false);
	const [newReview, setNewReview] = useState("");
	const [review, setReview] = useState("");
	const [userListened, setUserListened] = useState({});
	const [userToListen, setUserToListen] = useState({});
	const [exists, setExists] = useState(false);
	const [existsToListen, setExistsToListen] = useState(false);
	const [value, setValue] = useState(null);
	const [created, setCreated] = useState(false);
	const [createdToListen, setCreatedToListen] = useState(false);
	const [albumNum, setAlbumNum] = useState(null);

	const nav = useNavigate();

	// load in album num
	useEffect(() => {
		setAlbumNum(num);
	}, [num]);

	// check what album num is on
	useEffect(() => {
		// clear out listened and to listen for new albums
		setCreated(false);
		setCreatedToListen(false);
	}, [albumNum]);

	// TO LISTEN SECTION
	useEffect(() => {
		async function getToListenByUserId() {
			try {
				const response = await fetchToListenByUserId(userId);
				// console.log("response from FLBUI", response);
				setUserToListen(response);
			} catch (error) {
				console.error(error);
			}
		}
		getToListenByUserId();
	}, [userId]);

	// useEffect(() => {
	// 	console.log("usertolisten", userToListen);
	// 	if (userToListen) {
	// 		checkUniqueToListen();
	// 	}
	// }, []);

	function checkUniqueToListen() {
		const foundToListen = userToListen.find(
			(album) =>
				album.album_name == albums.name &&
				album.artist == albums.artists[0].name
		);
		// console.log("foundToListen", found);
		setExistsToListen(foundToListen);
		return foundToListen;
	}

	async function handleToListen(event) {
		event.preventDefault();
		let users_id = userId;
		let artist = albums.artists[0].name;
		let album_name = albums.name;
		let image_url = albums.images[1].url;
		let release_date = albums.release_date;

		if (token) {
			try {
				checkUniqueToListen();
				if (!existsToListen) {
					const newToListen = await createNewToListen(
						users_id,
						artist,
						album_name,
						image_url,
						release_date
					);
					if (newToListen) {
						toListenSnackbar();
						// alert("added album to 'to listen' list");
					}
				} else {
					setCreatedToListen(true);
					alert(
						"You have already added this to your To Listen list."
					);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("Please log in to leave a review or add to lists");
			nav("/login");
		}
	}

	// gets date
	function getDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		return today;
	}

	// LISTENED SECTION
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
				album.album_name == albums.name &&
				album.artist == albums.artists[0].name
		);
		// console.log("found", found);
		setExists(found);
		return found;
	}

	// button for clicking "add to listened"
	async function handleListened(event) {
		event.preventDefault();
		let users_id = userId;
		let artist = albums.artists[0].name;
		let album_name = albums.name;
		let image_url = albums.images[1].url;
		let release_date = albums.release_date;
		let rating = value;
		let date_listened = getDate();

		if (token) {
			try {
				checkUniqueListened();
				if (!exists) {
					const newListenedCreated = await createNewListened(
						users_id,
						artist,
						album_name,
						image_url,
						release_date,
						review,
						rating,
						date_listened
					);
					if (newListenedCreated) {
						setCreated(true);
						listenedSnackbar();
						// alert("added to listened list");
					}
				} else {
					alert("This album is already on your Listened list.");
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("Please log in to leave a review or add to lists");
			nav("/login");
		}
	}

	function handleOpen() {
		if (token) {
			setIsOpen(!isOpen);
		} else {
			alert("Please log in to leave a review or add to lists");
			nav("/login");
		}
	}

	async function handleReview(event) {
		reviewSnackbar();
		setReview(newReview);
		nav("/search");
	}

	async function handleRating(event, newValue) {
		event.preventDefault();
		setValue(newValue);
	}

	function toListenSnackbar() {
		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		setCreatedToListen(true);
	}

	function listenedSnackbar() {
		var x = document.getElementById("snackbar2");
		x.className = "show";
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		setCreated(true);
	}

	function reviewSnackbar() {
		var x = document.getElementById("snackbar3");
		x.className = "show";
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		setCreated(true);
	}

	return (
		<section id="album-card-container">
			<div id="snackbar">
				<h3>Added to To Listen list</h3>
			</div>
			<div id="snackbar2">
				<h3>Added to Listened list</h3>
			</div>
			<div id="snackbar3">
				<h3>Review Submitted</h3>
			</div>
			<div id="album-info-review">
				<div id="album-info-art">
					<img
						src={albums.images[1].url}
						alt="album art"
						className="album-card-art"
					/>
					<div id="album-info">
						<h2>{albums.name}</h2>
						<div>
							<p>
								Released{" "}
								<b>{albums.release_date.slice(0, 4)}</b>
							</p>
							<p>
								By{" "}
								<b>
									{albums.artists.map(
										(artist) => `${artist.name} `
									)}
								</b>
							</p>
						</div>
					</div>
					<div id="album-icons">
						<div>
							<button
								className="album-button"
								onClick={handleListened}
								style={
									created
										? {
												borderColor:
													"rgba(35,149,39,0.5)",
												backgroundColor:
													"rgba(35,149,39,0.5)",
										  }
										: { color: "white" }
								}
							>
								<p
									style={
										created
											? { color: "#DEFFDF" }
											: { color: "white" }
									}
								>
									{created ? "listened" : "listen"}
								</p>
							</button>
							{/* <button className="album-button">favorite</button> */}
							<button
								className="album-button"
								onClick={handleToListen}
								style={
									createdToListen
										? {
												borderColor:
													"rgba(233,187,9,0.6)",
												backgroundColor:
													"rgba(233,187,9,0.6)",
												color: "rgba(255,248,219)",
										  }
										: { color: "white" }
								}
							>
								<p>
									{createdToListen
										? "on to listen list"
										: "to listen"}
								</p>
							</button>
						</div>
						<div id="rating">
							<Stack spacing={1}>
								<Rating
									name="album-card-half-rating"
									defaultValue={0}
									precision={0.5}
									value={value}
									onChange={(event, newValue) => {
										handleRating(event, newValue);
									}}
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
							</Stack>
						</div>
						<div>
							<button
								className="album-button"
								onClick={handleOpen}
							>
								{isOpen ? "Close review panel" : "Add review"}
							</button>
							{isOpen && (
								<form onSubmit={handleReview}>
									<textarea
										autoFocus
										// value={}
										onChange={(e) =>
											setNewReview(e.target.value)
										}
									></textarea>
									<br />
									<br />
									<button
										type="submit"
										className="submit-button"
									>
										Submit review
									</button>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
