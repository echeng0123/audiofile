import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchListenedById, editListened } from "../../fetching/local";

export default function EditListened({ listened_id }) {
	const [isOpen, setIsOpen] = useState(false);
	const [listened, setListened] = useState({});

	const navigate = useNavigate();

	const listenedId = listened_id;

	function handleClick() {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		async function getListenedById() {
			try {
				const response = await fetchListenedById(listenedId);
				console.log("fetched listened data: ", response);
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
			rating: listened.rating,
			date_listened: listened.date_listened,
		};

		try {
			await editListened(listenedData, listened_id);
			navigate(0);
		} catch (err) {
			console.error("can't edit listened", err);
		}
	}

	return (
		<section>
			<button>Add review</button>
			{isOpen && (
				<div>
					<h1>Add review</h1>
					<form onSubmit={handleEdit}>
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
					</form>
				</div>
			)}
		</section>
	);
}
