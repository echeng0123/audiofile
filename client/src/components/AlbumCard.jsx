export default function AlbumCard({ albums }) {
	console.log("we are in albumcard");
	console.log("albums in albumcard", albums);

	return (
		<section id="album-card-container">
			<div id="album-info-review">
				<div id="album-info">
					<img src={albums.images[1].url} alt="album art" />
					<div>
						<h2>{albums.name}</h2>
						<p>
							Released <b>{albums.release_date.slice(0, 4)}</b>
						</p>
						<p>
							By <b>{albums.artists[0].name}</b>
						</p>
					</div>
				</div>
				<div id="album-review">
					<h3>Your review here, if it exists.</h3>
				</div>
			</div>
			<div id="album-icons">
				<div>
					<p>listen</p>
					<p>favorite</p>
					<p>to listen</p>
				</div>
				<div>
					<p>RATE/RATING HERE</p>
				</div>
				<div>
					<p>Add new review</p>
				</div>
			</div>
		</section>
	);
}
