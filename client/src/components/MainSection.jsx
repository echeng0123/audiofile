import { Routes, Route } from "react-router-dom";
import Home from "./Home";

export default function MainSection() {
	return (
		<section id="main-section-container">
			<Routes>
				<Route path="/" element={<Home />}></Route>
			</Routes>
		</section>
	);
}
