import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, fetchAllUsers } from "../../fetching/local";

export default function Register() {
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	const [text1, setText1] = useState(false);
	const [text2, setText2] = useState(false);
	const [text3, setText3] = useState(false);
	const [text4, setText4] = useState(false);

	const navigate = useNavigate();

	const userObj = {
		username: username,
		password: password,
	};

	// function myFunction() {
	// 	var x = document.getElementById("snackbar");
	// 	x.className = "show";
	// 	setTimeout(function () {
	// 		x.className = x.className.replace("show", "");
	// 	}, 3000);
	// }

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const userResponse = await fetchAllUsers();

			if (password !== password2) {
				setText1(true);
			} else if (
				userResponse.filter((user) => user.username === username)
					.length > 0
			) {
				setText1(false);
				setText2(true);
			} else if (username.length >= 3) {
				const response = await register(userObj);
				console.log("response", response);
				if (response) {
					setSuccessMessage("Sign up successful");
					// myFunction();
					navigate("/login");
				} else {
					setText3(true);
				}
			} else {
				setText1(false);
				setText2(false);
				setText3(false);
				setText4(true);
				setUsername("");
				setPassword("");
			}
		} catch (error) {
			setError(error.message);
		}
	}

	const pw = document.getElementsByClassName("password");

	function showPassword() {
		if (pw[0].type === "password" && pw[1].type === "password") {
			pw[0].type = "text";
			pw[1].type = "text";
		} else {
			pw[0].type = "password";
			pw[1].type = "password";
		}
	}

	return (
		<section>
			<div id="login-container">
				<div id="create-user-container">
					<h1>CREATE NEW ACCOUNT</h1>
					<br />
					<form
						onSubmit={(event) => {
							handleSubmit(event);
						}}
						id="register-form"
					>
						<div id="login-text">
							<label>
								Username:{" "}
								<input
									id="username"
									placeholder="enter username"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</label>
							<br />
							<label>
								Password:{" "}
								<input
									id="password"
									className="password"
									type="password"
									placeholder="enter password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</label>
							<br />
							<label>
								Confirm Password:{" "}
								<input
									id="password"
									className="password"
									type="password"
									placeholder="enter password"
									value={password2}
									onChange={(e) =>
										setPassword2(e.target.value)
									}
								/>
							</label>
							<br />
							<label style={{ "font-size": "1rem" }}>
								Show Password{" "}
								<input
									type="checkbox"
									onClick={() => showPassword()}
								/>
							</label>
						</div>
						{text1 && <h3>Passwords do not match.</h3>}
						{text2 && (
							<h3>
								Username already exists. Please choose another
								username.
							</h3>
						)}
						{text3 && <h3>Can't create new account.</h3>}
						{text4 && <h3>Username too short.</h3>}
						<br />
						<button className="submit-button">Submit</button>
					</form>
					{/* <div id="snackbar">
						<h1>You are registered!</h1>
					</div> */}
				</div>
			</div>
		</section>
	);
}
