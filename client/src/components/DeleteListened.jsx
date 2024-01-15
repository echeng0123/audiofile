// deletes item from user's Listened list
import { deleteListened } from "../../fetching/local";
import { useNavigate } from "react-router-dom";

export default function DeleteListened({ listened_id }) {
	const nav = useNavigate();
	async function handleSubmit(event) {
		event.preventDefault();
		try {
			listened_id && (await deleteListened(listened_id));
			nav(0);
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div>
			<button onClick={handleSubmit}>Remove from Listened</button>
		</div>
	);
}
