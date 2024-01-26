import search from "../assets/search.png";
import { fetchAlbumSearch, fetchToken } from "../../fetching/spotify.js";
import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard.jsx";
// import { useNavigate } from "react-router-dom";

export default function Search({ userId, token }) {
	const [albums, setAlbums] = useState({});
	const [albumInput, setAlbumInput] = useState("");
	const [results, setResults] = useState(false);
	const [spotifyToken, setSpotifyToken] = useState("");
	const [num, setNum] = useState(null);
	const [albumMessage, setAlbumMessage] = useState(false);

	// const navigate = useNavigate();

	// get token
	useEffect(() => {
		async function getToken() {
			const response = await fetchToken();
			// console.log("spotify token in search component", response);
			if (response) {
				setSpotifyToken(response.access_token);
				// localStorage.setItem("spotifyToken", response.access_token);
			} else {
				console.log("Not authorized on spotify");
			}
		}
		getToken();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		// console.log("handle submit in search function");

		if (albumInput) {
			setResults(!results);
			console.log("album is", albumInput);
		} else {
			console.log("can't get results");
		}
	};

	// pull album search from spotify API
	useEffect(() => {
		let albumsTemp = [];
		async function getAlbumSearch() {
			// console.log("spotifyToken in getAlbumSearch fn", spotifyToken);
			// console.log("albumInput in getAlbumSearch fn", albumInput);

			try {
				const albumResponse = await fetchAlbumSearch(
					albumInput,
					spotifyToken
				);
				// console.log("albumResponse is ", albumResponse);
				if (albumResponse) {
					for (
						let i = 0;
						i < albumResponse.albums.items.length;
						i++
					) {
						if (
							albumResponse.albums.items[i].album_type ===
								"album" ||
							albumResponse.albums.items[i].album_type ===
								"compilation"
						) {
							setAlbumMessage(false);
							albumsTemp.push(albumResponse.albums.items[i]);
						} else {
							setAlbumMessage(true);
						}
					}
					setAlbums(albumsTemp.slice(0, 5));
					console.log(
						"albums from search are ",
						albumsTemp.slice(0, 5)
					);
				} else {
					console.log("can't get album response");
				}
			} catch (error) {
				console.error(error);
			}
		}
		getAlbumSearch();
		// if (results) {
		// 	console.log("results are ", results);
		// 	getAlbumSearch();
		// } else {
		// 	console.log("waiting for search term...");
		// }
	}, [albumInput, spotifyToken, results]);

	// routes to single album page when search result is clicked
	async function handleClick(n) {
		event.preventDefault();
		console.log("n is ", n);
		setNum(n);
	}

	return (
		<section id="search-bar-container">
			{/* <img src={search} alt="magnifying glass" id="search-icon" /> */}
			<div id="search-bar-header-form">
				<h3>Search for albums</h3>
				<form onSubmit={handleSubmit}>
					<label htmlFor="Search"></label>
					<input
						id="musicChoice"
						type="text"
						name="search"
						placeholder="Enter any album from Spotify"
						// onFocus={(event) =>
						// 	setOldInput(
						// 		(event.target.oldvalue = event.target.value)
						// 	)
						// }
						onChange={(event) => setAlbumInput(event.target.value)}
					/>
				</form>
			</div>
			{results && (
				// show first 5 results from spotify API
				<div id="search-dropdown">
					{albumMessage && (
						<h5 id="album-message">
							These are the closest album matches to your query.
						</h5>
					)}
					{albums && (
						<button onClick={() => handleClick(0)}>
							<div className="search-result">
								<img
									src={albums[0].images[2].url}
									alt=""
									className="search-icon"
								/>
								<div className="search-result-details">
									<p>{albums[0].name}</p>
									<p>Album by {albums[0].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums[1] && (
						<button onClick={() => handleClick(1)}>
							<div className="search-result">
								<img
									src={albums[1].images[2].url}
									alt=""
									className="search-icon"
								/>
								<div className="search-result-details">
									<p>{albums[1].name}</p>
									<p>Album by {albums[1].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums[2] && (
						<button onClick={() => handleClick(2)}>
							<div className="search-result">
								<img
									src={albums[2].images[2].url}
									alt=""
									className="search-icon"
								/>
								<div className="search-result-details">
									<p>{albums[2].name}</p>
									<p>Album by {albums[2].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums[3] && (
						<button onClick={() => handleClick(3)}>
							<div className="search-result">
								<img
									src={albums[3].images[2].url}
									alt=""
									className="search-icon"
								/>
								<div className="search-result-details">
									<p>{albums[3].name}</p>
									<p>Album by {albums[3].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums[4] && (
						<button onClick={() => handleClick(4)}>
							<div className="search-result">
								<img
									src={albums[4].images[2].url}
									alt=""
									className="search-icon"
								/>
								<div className="search-result-details">
									<p>{albums[4].name}</p>
									<p>Album by {albums[4].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
				</div>
			)}
			{num != null && (
				<AlbumCard userId={userId} albums={albums[num]} token={token} />
			)}
		</section>
	);
}
