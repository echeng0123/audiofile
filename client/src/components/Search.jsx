import search from "../assets/search.png";
import { fetchAlbumSearch, fetchToken } from "../../fetching/spotify.js";
import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard.jsx";
// import { useNavigate } from "react-router-dom";

export default function Search({ userId }) {
	const [albums, setAlbums] = useState({});
	const [albumInput, setAlbumInput] = useState("");
	const [results, setResults] = useState(false);
	const [spotifyToken, setSpotifyToken] = useState("");
	const [isAlbum, setIsAlbum] = useState(false);
	const [num, setNum] = useState(null);

	// const navigate = useNavigate();

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
					if (
						albumResponse.albums.items[i].album_type === "album" ||
						albumResponse.albums.items[i].album_type ===
							"compilation"
					) {
						albumsTemp.push(albumResponse.albums.items[i]);
					}
				}
				setAlbums(albumsTemp.slice(0, 5));
				console.log("albums from search are ", albumsTemp.slice(0, 5));
			} else {
				console.log("can't get album response");
			}
		}
		getAlbumSearch();
	}, [albumInput]);

	// routes to single album page when search result is clicked
	async function handleClick(n) {
		event.preventDefault();
		console.log("i'm in handleclick");
		console.log("n is", n);
		setNum(n);
		setIsAlbum(!isAlbum);
	}

	return (
		<section id="search-bar-container">
			{/* <img src={search} alt="magnifying glass" id="search-icon" /> */}
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
			{results && (
				// show first 5 results from spotify API
				<div id="search-dropdown">
					<p>search result here</p>
					{albums && (
						<button onClick={() => handleClick(0)}>
							<div className="search-result">
								<img src={albums[0].images[2].url} alt="" />
								<div className="search-result-details">
									<p>{albums[0].name}</p>
									<p>Album by {albums[0].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums && (
						<button onClick={() => handleClick(1)}>
							<div className="search-result">
								<img src={albums[1].images[2].url} alt="" />
								<div className="search-result-details">
									<p>{albums[1].name}</p>
									<p>Album by {albums[1].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums && (
						<button onClick={() => handleClick(2)}>
							<div className="search-result">
								<img src={albums[2].images[2].url} alt="" />
								<div className="search-result-details">
									<p>{albums[2].name}</p>
									<p>Album by {albums[2].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums && (
						<button onClick={() => handleClick(3)}>
							<div className="search-result">
								<img src={albums[3].images[2].url} alt="" />
								<div className="search-result-details">
									<p>{albums[3].name}</p>
									<p>Album by {albums[3].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
					{albums && (
						<button onClick={() => handleClick(4)}>
							<div className="search-result">
								<img src={albums[4].images[2].url} alt="" />
								<div className="search-result-details">
									<p>{albums[4].name}</p>
									<p>Album by {albums[4].artists[0].name}</p>
								</div>
							</div>
						</button>
					)}
				</div>
			)}
			{isAlbum && num != null && (
				<AlbumCard userId={userId} albums={albums[num]} />
			)}
		</section>
	);
}
