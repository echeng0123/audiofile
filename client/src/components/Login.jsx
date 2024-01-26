import { useState } from "react";
import { login } from "../../fetching/local";
import { useNavigate } from "react-router-dom";

export default function Login({ token, setToken, setUserId }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorText, setErrorText] = useState(false);
	const nav = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("entering handle submit");
		console.log(username, password);
		try {
			const response = await login(username, password);
			console.log("response in handle submit", response);
			setToken(response.token);
			setUserId(response.user.users_id);

			console.log("response.token in Login function: ", response.token);
			console.log("response", response);
			localStorage.setItem("token", response.token);
			localStorage.setItem("userId", response.user.users_id);
			// if (response) {
			// 	myFunction();
			// }
			nav("/");
		} catch (error) {
			setErrorText(true);
			console.error("can't login", error);
		}
	};

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
				{errorText && (
					<div>
						<br />
						<h3>Incorrect username or password.</h3>
					</div>
				)}
				<br />
				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
			<a href="/register">Create new account</a>
		</section>
	);
}
