import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MobileSideNav({ token }) {
	const buttonX = document.getElementById("buttonX");
	const [isOpen, setIsOpen] = useState(false);
	// console.log("buttonX", buttonX);

	function myFunction(x) {
		// document.querySelector("buttonX").toggle("change");
		x.classList.toggle("change");
		setIsOpen(!isOpen);
	}

	function openNav() {
		document.getElementById("mySidenav").style.width = "250px";
	}

	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}

	useEffect(() => {
		if (isOpen) {
			openNav();
		} else if (!isOpen) {
			closeNav();
		}
	}, [isOpen]);

	return (
		<div>
			<h1 id="main-logo">audiofile</h1>
			<div
				id="buttonX"
				className="container"
				onClick={() => myFunction(buttonX)}
			>
				<div className="bar1"></div>
				<div className="bar2"></div>
				<div className="bar3"></div>
			</div>
			<div id="mySidenav" className="sidenav">
				<Link to="/">home</Link>
				<Link to="/search">search</Link>
				{token && <Link to="/to-listen">to listen</Link>}
				{token && <Link to="/listened">listened</Link>}
				{token && <Link to="/profile">profile</Link>}
				{!token && <Link to="/login">login</Link>}
				{token && <Link to="/logout">logout</Link>}
			</div>
		</div>
	);
}
