import "./App.css";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
	//get tokens where other components can use them
	const [spotifyToken, setSpotifyToken] = useState(null);

	return (
		<section id="app-container">
			<h1>APP</h1>
			<NavBar
				spotifyToken={spotifyToken}
				setSpotifyToken={setSpotifyToken}
			/>
			<MainSection />
		</section>
	);
}

export default App;
