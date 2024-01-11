import Search from "./Search";

export default function NavBar({ token }) {
	return (
		<section id="navbar-container">
			<a href="/">
				<h1 id="app-title">audiofile</h1>
			</a>
			<div className="dropdown-content">
				<a href="/" className="nav-link">
					home
				</a>
				{/* <a href="/profile">profile</a> */}
				<a href="/to-listen" className="nav-link">
					to listen
				</a>
				<a href="/listened" className="nav-link">
					listened
				</a>
				<a href="/search" className="nav-link">
					search
				</a>
				{!token && (
					<a href="/login" className="nav-link">
						login
					</a>
				)}
				{token && (
					<a href="/logout" className="nav-link">
						logout
					</a>
				)}
			</div>
		</section>
	);
}
