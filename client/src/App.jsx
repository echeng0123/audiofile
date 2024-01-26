import "./App.css";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MobileSideNav from "./components/MobileSideNav";
import { useEffect, useState } from "react";

function App() {
	//get tokens where other components can use them
	const [spotifyToken, setSpotifyToken] = useState(null);
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [isMobile, setIsMobile] = useState(false);
	// let width = window.innerWidth;

	useEffect(() => {
		setToken(window.localStorage.getItem("token"));
		setUserId(window.localStorage.getItem("userId"));
		setSpotifyToken(window.localStorage.getItem("spotifyToken"));

		// set state for correct navbar display
		// if (width <= 568) {
		// 	setIsMobile(true);
		// } else {
		// 	setIsMobile(false);
		// }
	}, []);

	return (
		<section id="app-container">
			<h1>APP</h1>
			<NavBar token={token} userId={userId} />
			{/* {!isMobile && <NavBar token={token} userId={userId} />} */}
			{/* {isMobile && <MobileSideNav token={token} />} */}
			<MobileSideNav token={token} />
			<MainSection
				spotifyToken={spotifyToken}
				setSpotifyToken={setSpotifyToken}
				token={token}
				setToken={setToken}
				userId={userId}
				setUserId={setUserId}
			/>
			<Footer />
		</section>
	);
}

export default App;
