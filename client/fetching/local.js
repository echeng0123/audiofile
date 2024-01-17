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

// get single user info
export const fetchUserByUserId = async (user_id) => {
	try {
		const response = await fetch(`${base_url}/users/${user_id}`);
		const result = await response.json();
		console.log("result from fetch single user ", result);
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

// LISTENED ROUTES =========================== //
export const fetchAllListened = async () => {
	try {
		const response = await fetch(`${base_url}/listened`);
		const result = await response.json();
		console.log("result from fetchAllListened", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchListenedById = async (listened_id) => {
	try {
		const response = await fetch(`${base_url}/listened/${listened_id}`);
		const result = await response.json();
		console.log("result from fetchListenedById", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const fetchListenedByUserId = async (user_id) => {
	try {
		const response = await fetch(`${base_url}/listened/user/${user_id}`);
		const result = await response.json();
		console.log("result from fetchListenedByUserId", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const createNewListened = async (
	users_id,
	artist,
	album_name,
	image_url,
	release_date,
	review,
	rating,
	date_listened
) => {
	try {
		console.log("...starting to create new listened item");
		const response = await fetch(`${base_url}/listened`, {
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
				review: review,
				rating: rating,
				date_listened: date_listened,
			}),
		});
		const result = await response.json();
		console.log("result from createNewListened", result);
		return result;
	} catch (error) {
		console.error("Cannot post new listened", error);
	}
};

export const deleteListened = async (listened_id) => {
	try {
		console.log("...removing listened item from list");
		const response = await fetch(`${base_url}/listened/${listened_id}`, {
			method: "DELETE",
		});
		const result = await response.json();
		console.log("removed listened item");
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const editListened = async (listenedData, listenedId) => {
	try {
		console.log("entering edit listened in local");
		const response = await fetch(`${base_url}/listened/${listenedId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(listenedData),
		});
		const result = await response.json();
		console.log("Successfully edited listened");
		return result;
	} catch (error) {
		alert(
			"We're sorry, there has been an error during edit. Please try again later."
		);
	}
};
