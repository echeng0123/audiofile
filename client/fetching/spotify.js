const base_url = "https://api.spotify.com/v1/search?q=";

// continually fetches token from spotify to allow API access
export const fetchToken = async () => {
	try {
		console.log("...starting to fetch token");
		const response = await fetch(`https://accounts.spotify.com/api/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: "grant_type=client_credentials&client_id=8e7117e564634a948b48e068961f1a9c&client_secret=8bddd6cabc7448abb65fe3e47ba2d48f",
		});
		console.log("response from fetch token", response);
		const result = await response.json();
		console.log("result from fetch token", result);
		return result;
	} catch (error) {
		console.error("Cannot get token!");
	}
};

fetchToken();

// grabs album object from spotify search endpoint
export const fetchAlbumSearch = async (albumInput, spotifyToken) => {
	console.log("spotifyToken in fetch album search", spotifyToken);
	try {
		console.log("...starting to fetch album");
		const response = await fetch(`${base_url}${albumInput}&type=album`, {
			method: "GET",
			headers: {
				// "Content-Type": "application/json",
				Authorization: `Bearer ${spotifyToken}`,
			},
		});
		const result = await response.json();
		console.log("result from fetch album search", result);
		return result;
		// console.log("result.albums.items", result.albums.items);
		// const genreArray = result.albums.items[0].genres;
		// console.log("genreArray", genreArray);
		// return genreArray;
	} catch (error) {
		console.error("Cannot fetch albumSearch", error);
	}
};
