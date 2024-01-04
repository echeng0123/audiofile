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
			`INSERT INTO to_listen(users_id,         artist, album_name, image_url,release_date
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
		console.log();
	} catch (error) {}
};
