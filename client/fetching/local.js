const base_url = "http://localhost:8080/api";

// LOGIN
export const login = async (username, password) => {
	try {
		const response = await fetch(`${base_url}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});
		const result = await response.json();
		console.log("result from login fn", result);
		return result;
	} catch (err) {
		console.error(err);
	}
};

// LOGOUT
export const logout = async () => {
	try {
		const response = await fetch(`${base_url}/users/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		console.log("successfully logged out...");
		return result;
	} catch (error) {
		console.error(error);
	}
};
