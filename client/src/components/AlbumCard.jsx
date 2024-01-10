export default function AlbumCard({ albums }) {
	console.log("we are in albumcard");
	console.log("albums in albumcard", albums);

	function handleListen() {
		// code to add to listen
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
							<button className="album-button">listen</button>
							<button className="album-button">favorite</button>
							<button className="album-button">to listen</button>
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
