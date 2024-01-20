import Search from "./Search";
import { Link } from "react-router-dom";

export default function NavBar({ token, userId }) {
	return (
		<section id="navbar-container">
			<Link to="/" className="nav-link">
				<h1 id="app-title">audiofile</h1>
			</Link>
			<div className="dropdown-content">
				<Link to="/">home</Link>
				<Link to="/to-listen" className="nav-link">
					to listen
				</Link>
				<Link to="listened" className="nav-link">
					listened
				</Link>
				<Link to="profile" className="nav-link">
					profile
				</Link>
				<Link to="/search">search</Link>
				{token ? (
					<>
						<Link to="/logout" className="nav-link">
							logout
						</Link>
					</>
				) : (
					<Link to="/login" className="nav-link">
						login
					</Link>
				)}
			</div>
		</section>
	);
}
