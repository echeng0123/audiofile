import search from "../assets/search.png";

export default function Search() {
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("handle submit in search function");
	};

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
					// onChange={(event) => setMusicInput(event.target.value)}
				/>
			</form>
		</section>
	);
}
