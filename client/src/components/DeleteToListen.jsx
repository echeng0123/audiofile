// deletes item from user's to listen list
import { deleteToListen } from "../../fetching/local";
import { useNavigate } from "react-router-dom";

export default function DeleteToListen({ to_listen_id }) {
	const nav = useNavigate();
	async function handleSubmit(event) {
		event.preventDefault();
		try {
			to_listen_id && (await deleteToListen(to_listen_id));
			nav(0);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<button onClick={handleSubmit} className="album-info">
				Remove from To Listen
			</button>
		</div>
	);
}
