import { useState, useEffect } from "react";

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
				<a href="/">Home</a>
				<a href="/search"></a>
				{token && <a href="/to-listen">to listen</a>}
				{token && <a href="/listened">listened</a>}
				{token && <a href="/profile">profile</a>}
				{!token && <a href="/login">login</a>}
				{token && <a href="/logout">logout</a>}
			</div>
		</div>
	);
}
