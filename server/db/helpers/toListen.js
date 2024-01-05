const client = require("../client");

const createToListen = async ({
	users_id,
	artist,
	album_name,
	image_url,
	release_date,
}) => {
	try {
		const {
			rows: [album],
		} = await client.query(
			`INSERT INTO to_listen(users_id,artist, album_name, image_url,release_date
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *;
            `,
			[users_id, artist, album_name, image_url, release_date]
		);
		return album;
	} catch (error) {
		throw error;
	}
};

const getAllToListen = async () => {
	try {
		console.log("entering get all to listen list");
		const { rows } = await client.query(
			`
            SELECT *
            FROM to_listen;
            `
		);
		console.log("to listen list in get all", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

const getToListenById = async (to_listen_id) => {
	try {
		console.log("entering to listen by id");
		const {
			rows: [to_listen],
		} = await client.query(`
        SELECT * FROM to_listen
        WHERE to_listen_id = ${to_listen_id}`);
		console.log("to listen in get to listen by id", to_listen);
		return to_listen;
	} catch (error) {
		throw error;
	}
};

const getToListenByUserId = async (userId) => {
	try {
		console.log("entering get to listen list by user id");
		const { rows } = await client.query(`
        SELECT * FROM to_listen
        WHERE users_id = ${userId}`);
		console.log("to listen list in get to listen by user Id", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

const deleteToListen = async (to_listen_id) => {
	try {
		console.log("entering db helper deleteToListen");
		const { rows } = await client.query(`
       DELETE FROM to_listen WHERE to_listen_id=${to_listen_id}
       RETURNING *;
       `);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createToListen,
	getAllToListen,
	getToListenById,
	getToListenByUserId,
	deleteToListen,
};
