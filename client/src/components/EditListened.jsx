import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchListenedById, editListened } from "../../fetching/local";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function EditListened({ listened_id }) {
	const [isOpen, setIsOpen] = useState(false);
	const [listened, setListened] = useState({});
	const [value, setValue] = useState(0);
	const [rating, setRating] = useState(null);

	const navigate = useNavigate();

	const listenedId = listened_id;

	function handleClick() {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		async function getListenedById() {
			try {
				const response = await fetchListenedById(listenedId);
				// console.log("fetched listened data: ", response);
				setListened(response);
			} catch (error) {
				console.error("'problem fetching listened item", error);
			}
		}
		getListenedById();
	}, []);

	async function handleEdit(event) {
		event.preventDefault();

		let listenedData = {
			artist: listened.artist,
			album_name: listened.album_name,
			image_url: listened.image_url,
			release_date: listened.release_date,
			review: listened.review,
			rating: value,
			date_listened: listened.date_listened,
		};

		try {
			await editListened(listenedData, listened_id);
			navigate(0);
		} catch (err) {
			console.error("can't edit listened", err);
		}
	}

	// async function handleRating(event, newValue) {
	// 	event.preventDefault();
	// 	// setValue(newValue);
	// 	// console.log("newValue is currently", newValue);
	// 	// console.log("value is currently", value);
	// 	setValue(newValue);
	// }

	return (
		<section>
			<div>
				<button onClick={handleClick} className="review-button">
					{isOpen ? "close review panel" : "add review"}
				</button>
				{isOpen && (
					<div>
						<h3>Add review</h3>
						<form onSubmit={handleEdit}>
							<div id="rating">
								<Stack spacing={1}>
									<Rating
										name="listened-half-rating"
										defaultValue={0}
										precision={0.5}
										value={value}
										onChange={(event, newValue) => {
											setValue(newValue);
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
							<br />
							<textarea
								autoFocus
								value={listened.review ? listened.review : ""}
								onChange={(e) =>
									setListened({
										...listened,
										review: e.target.value,
									})
								}
							></textarea>
							<br />
							<br />
							<button type="submit" className="submit-button">
								Submit
							</button>
						</form>
					</div>
				)}
			</div>
		</section>
	);
}
