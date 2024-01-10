import search from "../assets/search.png";
import { fetchAlbumSearch, fetchToken } from "../../fetching/spotify.js";
import { useEffect, useState } from "react";

export default function Search() {
	const [albums, setAlbums] = useState({});
	// const [album6, setAlbum6] = useState({});
	// const [album7, setAlbum7] = useState({});
	// const [album8, setAlbum8] = useState({});
	// const [album9, setAlbum9] = useState({});
	// const [album10, setAlbum10] = useState({});

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

		if (albumInput) {
			setResults(!results);
		} else {
			console.log("can't get results");
		}
		console.log("album is", albumInput);
	};

	// pull album search from spotify API
	useEffect(() => {
		let albumsTemp = [];
		async function getAlbumSearch() {
			console.log("spotifyToken in getAlbumSearch fn", spotifyToken);
			console.log("albumInput in getAlbumSearch fn", albumInput);

			const albumResponse = await fetchAlbumSearch(
				albumInput,
				spotifyToken
			);
			console.log("albumResponse is ", albumResponse);
			if (albumResponse) {
				for (let i = 0; i < albumResponse.albums.items.length; i++) {
					if (albumResponse.albums.items[i].album_type === "album") {
						albumsTemp.push(albumResponse.albums.items[i]);
					}
				}

				// setAlbum1(albumResponse.albums.items[0]);
				// setAlbum2(albumResponse.albums.items[1]);
				// setAlbum3(albumResponse.albums.items[2]);
				// setAlbum4(albumResponse.albums.items[3]);
				// setAlbum5(albumResponse.albums.items[4]);
				// setAlbum6(albumResponse.albums.items[5]);
				// setAlbum7(albumResponse.albums.items[6]);
				// setAlbum8(albumResponse.albums.items[7]);
				// setAlbum9(albumResponse.albums.items[8]);
				// setAlbum10(albumResponse.albums.items[9]);
				setAlbums(albumsTemp.slice(0, 5));
				console.log("albums from search are ", albumsTemp.slice(0, 5));
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
				// show first 5 results from spotify API
				<div id="search-dropdown">
					<p>search result here</p>
					{albums && (
						<div className="search-result">
							<img src={albums[0].images[2].url} alt="" />
							<p>{albums[0].name}</p>
						</div>
					)}
					{albums && (
						<div className="search-result">
							<img src={albums[1].images[2].url} alt="" />
							<p>{albums[1].name}</p>
						</div>
					)}
					{albums && (
						<div className="search-result">
							<img src={albums[2].images[2].url} alt="" />
							<p>{albums[2].name}</p>
						</div>
					)}
				</div>
			)}
		</section>
	);
}
