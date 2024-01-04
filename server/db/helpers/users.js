const client = require("../client");

const createUser = async ({ username, password }) => {
	try {
		const {
			rows: [user],
		} = await client.query(
			`INSERT INTO users(username, password)
            VALUES ($1, $2)
            RETURNING *;
            `,
			[username, password]
		);
		return user;
	} catch (error) {
		throw error;
	}
};

const getAllUsers = async () => {
	try {
		console.log("entering all users");
		const { rows } = await client.query(
			`
            SELECT *
            FROM users;
            `
		);
		console.log("users in get all", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

const getUserById = async (users_id) => {
	try {
		console.log("entering users by id");
		const {
			rows: [user],
		} = await client.query(`
        SELECT * FROM users
        WHERE users_id = ${users_id}
        `);
		return user;
	} catch (error) {
		throw error;
	}
};

const getUserByUsername = async (username) => {
	try {
		console.log("entering user by name");
		console.log(username);
		const {
			rows: [user],
		} = await client.query(`
        SELECT * FROM users
        WHERE username = '${username}'
        `);
		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = { createUser, getAllUsers, getUserById, getUserByUsername };
