import "./App.css";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
	//get tokens where other components can use them
	const [spotifyToken, setSpotifyToken] = useState(null);
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		setToken(window.localStorage.getItem("token"));
		setUserId(window.localStorage.getItem("userId"));
		setSpotifyToken(window.localStorage.getItem("spotifyToken"));
	}, []);

	return (
		<section id="app-container">
			<h1>APP</h1>
			<NavBar token={token} userId={userId} />
			<MainSection
				spotifyToken={spotifyToken}
				setSpotifyToken={setSpotifyToken}
				token={token}
				setToken={setToken}
				userId={userId}
				setUserId={setUserId}
			/>
		</section>
	);
}

export default App;
