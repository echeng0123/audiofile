import { useState } from "react";
import { login } from "../../fetching/local";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const nav = useNavigate();

	return (
		<section id="login-container">
			<h1>LOGIN</h1>
			<form
				onSubmit={(event) => {
					handleSubmit(event);
				}}
			>
				<div id="login-text">
					<label>
						Username: {""}
						<input
							id="username"
							placeholder="enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
					<br />
					<label>
						Password: {""}
						<input
							id="password"
							type="password"
							placeholder="enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
					{/* <label style={{ "font-size": "1rem" }}>
						Show Password{" "}
						<input type="checkbox" onClick={() => showPassword()} />
					</label> */}
				</div>
				<br />
				<button type="submit" className="clear-button">
					Submit
				</button>
			</form>
		</section>
	);
}
