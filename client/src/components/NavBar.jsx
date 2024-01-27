import Search from "./Search";
import { Link, NavLink } from "react-router-dom";

export default function NavBar({ token, userId }) {
	return (
		<section id="navbar-container">
			<Link to="/" className="nav-link">
				<h1 id="app-title">audiofile</h1>
			</Link>
			<div className="dropdown-content">
				<NavLink to="/" className="nav-link">
					home
				</NavLink>
				<NavLink to="/search" className="nav-link">
					search
				</NavLink>
				{token ? (
					<>
						<NavLink to="/to-listen" className="nav-link">
							to listen
						</NavLink>
						<NavLink to="listened" className="nav-link">
							listened
						</NavLink>
						<NavLink to="profile" className="nav-link">
							profile
						</NavLink>
						<NavLink to="/logout" className="nav-link">
							logout
						</NavLink>
					</>
				) : (
					<NavLink to="/login" className="nav-link">
						login
					</NavLink>
				)}
			</div>
		</section>
	);
}
