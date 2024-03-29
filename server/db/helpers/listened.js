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
            FROM listened;
            `
		);
		console.log("to listen list in get all", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

const getListenedById = async (listened_id) => {
	try {
		console.log("entering to listen by id");
		const {
			rows: [listened],
		} = await client.query(`
        SELECT * FROM listened
        WHERE listened_id = ${listened_id}`);
		console.log("listened id in get listened by id", listened);
		return listened;
	} catch (error) {
		throw error;
	}
};

const getListenedByUserId = async (userId) => {
	try {
		console.log("entering get to listen list by user id");
		const { rows } = await client.query(`
        SELECT * FROM listened
        WHERE users_id = ${userId}`);
		console.log("to listen list in get to listen by user Id", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

const deleteListened = async (listened_id) => {
	try {
		console.log("entering db helper delete listened");
		const { rows } = await client.query(`
       DELETE FROM listened WHERE listened_id=${listened_id}
       RETURNING *;
       `);
	} catch (error) {
		throw error;
	}
};

// user will only ever be updating review, rating, or date listened and none of the other parameters will change
const updateListened = async (listened_id, body) => {
	try {
		console.log("entering update listened in db helper");
		const {
			rows: [listened],
		} = await client.query(
			`
            UPDATE listened
            SET artist = $1, album_name = $2, image_url = $3, release_date = $4, review = $5, rating = $6, date_listened = $7
            WHERE listened_id = ${listened_id}
            RETURNING *;
            `,
			[
				body.artist,
				body.album_name,
				body.image_url,
				body.release_date,
				body.review,
				body.rating,
				body.date_listened,
			]
		);
		return listened;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createListened,
	getAllListened,
	getListenedById,
	getListenedByUserId,
	deleteListened,
	updateListened,
};
