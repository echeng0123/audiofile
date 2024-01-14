const base_url = "http://localhost:8080/api";

// USER ROUTES =================================== //

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

// TO LISTEN ROUTES =========================== //
export const fetchAllToListen = async () => {
	try {
		const response = await fetch(`${base_url}/to_listen`);
		const result = await response.json();
		console.log("result from fetchAllToListen", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchToListenByUserId = async (user_id) => {
	try {
		const response = await fetch(`${base_url}/to_listen/user/${user_id}`);
		const result = await response.json();
		console.log("result from fetchToListenByUserId", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const createNewToListen = async (
	users_id,
	artist,
	album_name,
	image_url,
	release_date
) => {
	try {
		console.log("...starting to create new to listen");
		// console.log(
		// 	"info in localjs createNewToListen",
		// 	users_id,
		// 	artist,
		// 	album_name,
		// 	image_url,
		// 	release_date
		// );
		const response = await fetch(`${base_url}/to_listen`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				users_id: users_id,
				artist: artist,
				album_name: album_name,
				image_url: image_url,
				release_date: release_date,
			}),
		});
		const result = await response.json();
		console.log("result from createNewToListen", result);
		return result;
	} catch (error) {
		console.error("Cannot post new to listen", error);
	}
};

export const deleteToListen = async (to_listen_id) => {
	try {
		console.log("...removing to listen item from list");
		const response = await fetch(`${base_url}/to_listen/${to_listen_id}`, {
			method: "DELETE",
		});
		const result = await response.json();
		console.log("removed to listen item");
		return result;
	} catch (error) {
		console.log(error);
	}
};
