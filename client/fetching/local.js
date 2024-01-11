const base_url = "http://localhost:8080/api";

// grabs all users from local database
export const fetchAllUsers = async () => {
	try {
		const response = await fetch(`${base_url}/users`);
		const result = await response.json();
		console.log("result from fetchAllUser ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

// REGISTER
export const register = async (userObj) => {
	try {
		const response = await fetch(`${base_url}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userObj),
		});
		const result = await response.json();
		console.log(result);
		return result;
	} catch (err) {
		console.error(err);
	}
};

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
