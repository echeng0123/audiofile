import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ToListen from "./ToListen";
import Listened from "./Listened";

export default function MainSection() {
	return (
		<section id="main-section-container">
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/to-listen" element={<ToListen />}></Route>
				<Route path="/listened" element={<Listened />}></Route>
			</Routes>
		</section>
	);
}
