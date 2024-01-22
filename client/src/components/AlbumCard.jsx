import { createNewToListen, createNewListened } from "../../fetching/local";

export default function AlbumCard({ userId, albums }) {
	console.log("we are in albumcard");
	console.log("albums in albumcard", albums);

	async function handleToListen(event) {
		event.preventDefault();
		let users_id = userId;
		let artist = albums.artists[0].name;
		let album_name = albums.name;
		let image_url = albums.images[1].url;
		let release_date = albums.release_date;

		console.log(
			"info here",
			JSON.stringify({
				users_id,
				artist,
				album_name,
				image_url,
				release_date,
			})
		);
		try {
			await createNewToListen(
				users_id,
				artist,
				album_name,
				image_url,
				release_date
			);
		} catch (error) {
			console.error(error);
		}
	}

	function getDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + "/" + dd + "/" + yyyy;
		return today;
	}
	// console.log(getDate());

	async function handleListened(event) {
		event.preventDefault();
		let users_id = userId;
		let artist = albums.artists[0].name;
		let album_name = albums.name;
		let image_url = albums.images[1].url;
		let release_date = albums.release_date;
		let review = "";
		let rating = null;
		let date_listened = getDate();

		console.log(
			"info here",
			JSON.stringify({
				users_id,
				artist,
				album_name,
				image_url,
				release_date,
				review,
				rating,
				date_listened,
			})
		);
		try {
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
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<section id="album-card-container">
			<div id="album-info-review">
				<div id="album-info-art">
					<img src={albums.images[1].url} alt="album art" />
					<div id="album-info">
						<h2>{albums.name}</h2>
						<div>
							<p>
								Released{" "}
								<b>{albums.release_date.slice(0, 4)}</b>
							</p>
							<p>
								By <b>{albums.artists[0].name}</b>
							</p>
						</div>
					</div>
					<div id="album-icons">
						<div>
							<button
								className="album-button"
								onClick={handleListened}
							>
								listen
							</button>
							<button className="album-button">favorite</button>
							<button
								className="album-button"
								onClick={handleToListen}
							>
								to listen
							</button>
						</div>
						<div>
							<button className="album-button">
								RATE/RATING HERE
							</button>
						</div>
						<div>
							<button className="album-button">
								Add new review
							</button>
						</div>
					</div>
				</div>

				<div id="album-review">
					<h3>Your review here, if it exists.</h3>
					<p>
						Generated Lorem Ipsum Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Sit amet
						nisl suscipit adipiscing bibendum est ultricies. Arcu
						non sodales neque sodales ut etiam sit. Eget duis at
						tellus at urna condimentum mattis pellentesque.{" "}
					</p>
				</div>
			</div>
		</section>
	);
}
