import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ToListen from "./ToListen";
import Listened from "./Listened";
import AlbumCard from "./AlbumCard";
import Search from "./Search";

export default function MainSection() {
	return (
		<section id="main-section-container">
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/to-listen" element={<ToListen />}></Route>
				<Route path="/listened" element={<Listened />}></Route>
				<Route path="/search" element={<Search />}></Route>
				<Route path="/card" element={<AlbumCard />}></Route>
			</Routes>
		</section>
	);
}
