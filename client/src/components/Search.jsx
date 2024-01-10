import search from "../assets/search.png";
import { fetchAlbumSearch, fetchToken } from "../../fetching/spotify.js";
import { useEffect, useState } from "react";

export default function Search() {
	const [album, setAlbum] = useState({});
	const [albumInput, setAlbumInput] = useState("");
	const [results, setResults] = useState(false);
	const [spotifyToken, setSpotifyToken] = useState("");

	// get token
	useEffect(() => {
		async function getToken() {
			const response = await fetchToken();
			console.log("spotify token in search component", response);
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
		console.log("handle submit in search function");
		if (albumInput.length > 0) {
			setAlbum(albumInput);
		}

		if (album) {
			setResults(!results);
		} else {
			console.log("can't get results");
		}
		console.log("album is", albumInput);
	};

	// pull album search from spotify API
	useEffect(() => {
		async function getAlbumSearch() {
			console.log("spotifyToken in getAlbumSearch fn", spotifyToken);
			console.log("albumInput in getAlbumSearch fn", albumInput);

			const albumResponse = await fetchAlbumSearch(
				albumInput,
				spotifyToken
			);
			console.log("albumResponse is ", albumResponse);
			if (albumResponse) {
				setAlbum(albumResponse);
			} else {
				console.log("can't get album response");
			}
		}
		getAlbumSearch();
	}, [albumInput]);

	return (
		<section id="search-bar-container">
			{/* <img src={search} alt="magnifying glass" id="search-icon" /> */}
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
			{results && (
				<div id="search-dropdown">
					<p>search result here</p>
				</div>
			)}
		</section>
	);
}
