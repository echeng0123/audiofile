const client = require("../client");

const createListened = async ({
	users_id,
	artist,
	album_name,
	image_url,
	release_date,
	review,
	rating,
	date_listened,
}) => {
	try {
		const {
			rows: [album],
		} = await client.query(
			`INSERT INTO listened(users_id, artist, album_name, image_url,release_date, review, rating, date_listened
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;
            `,
			[
				users_id,
				artist,
				album_name,
				image_url,
				release_date,
				review,
				rating,
				date_listened,
			]
		);
		return album;
	} catch (error) {
		throw error;
	}
};

const getAllListened = async () => {
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

const getListenedById = async (to_listen_id) => {
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

const getListenedByUserId = async (userId) => {
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

module.exports = {
	createListened,
	getAllListened,
	getListenedById,
	getListenedByUserId,
};
