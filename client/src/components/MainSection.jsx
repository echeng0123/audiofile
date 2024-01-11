import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ToListen from "./ToListen";
import Listened from "./Listened";
import AlbumCard from "./AlbumCard";
import Search from "./Search";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function MainSection({
	spotifyToken,
	setSpotifyToken,
	token,
	setToken,
	userId,
	setUserId,
}) {
	return (
		<section id="main-section-container">
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/to-listen" element={<ToListen />}></Route>
				<Route path="/listened" element={<Listened />}></Route>
				<Route path="/search" element={<Search />}></Route>
				<Route path="/card" element={<AlbumCard />}></Route>
				<Route
					path="/login"
					element={
						<Login
							token={token}
							setToken={setToken}
							userId={userId}
							setUserId={setUserId}
						/>
					}
				/>
				<Route
					path="/logout"
					element={<Logout token={token} setToken={setToken} />}
				/>
				<Route path="/register" element={<Register />}></Route>
			</Routes>
		</section>
	);
}
