// For connections to local database

const client = require("./client");

const { createUser } = require("./helpers/users");
const { createToListen } = require("./helpers/toListen");
const { createListened } = require("./helpers/listened");

const { users, to_listen, listened } = require("./seedData");

// Drop tables
const dropTables = async () => {
	try {
		console.log("Starting to drop tables");
		await client.query(`
        DROP TABLE IF EXISTS users cascade;
        DROP TABLE IF EXISTS to_listen cascade;
        DROP TABLE IF EXISTS listened cascade;
        `);
		console.log("Tables dropped");
	} catch (error) {
		console.log("Error dropping tables");
		throw error;
	}
};

// Create tables
const createTables = async () => {
	console.log("Building tables...");
	await client.query(
		`CREATE TABLE users (
            users_id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        CREATE TABLE to_listen (
            to_listen_id SERIAL PRIMARY KEY,
            users_id INTEGER REFERENCES users(users_id),
            artist TEXT,
            album_name TEXT,
            image_url TEXT,
            release_date TEXT
        );
        CREATE TABLE listened (
            listened_id SERIAL PRIMARY KEY,
            users_id INTEGER REFERENCES users(users_id),
            artist TEXT,
            album_name TEXT,
            image_url TEXT,
            release_date TEXT,
            review TEXT,
            rating FLOAT(25),
            date_listened TEXT
        );
        `
	);
	console.log("Tables built");
};

// Create initial users
const createInitialUsers = async () => {
	try {
		console.log("...starting to create initial users");
		for (const user of users) {
			await createUser(user);
		}
		console.log("initial users created");
		console.log("users", users);
	} catch (error) {
		throw error;
	}
};

// Create initial ToListen
const createInitialToListen = async () => {
	try {
		console.log("...starting to create initial to listen list");
		for (const album of to_listen) {
			await createToListen(album);
		}
		console.log("initial to listen list created");
		console.log("to listen list: ", to_listen);
	} catch (error) {
		throw error;
	}
};

// Create initial Listened
const createInitialListened = async () => {
	try {
		console.log("...starting to create initial listened list");
		for (const album of listened) {
			await createListened(album);
		}
		console.log("initial listened list created");
		console.log("listened list: ", listened);
	} catch (error) {
		throw error;
	}
};

// Call all functions and build database
const rebuildDb = async () => {
	try {
		// connect to local database
		console.log("entering rebuildDB function");
		client.connect();

		// run functions
		await dropTables();
		await createTables();

		// Generating starting data
		console.log("starting to seed data...");
		await createInitialUsers();
		await createInitialToListen();
		await createInitialListened();
	} catch (error) {
		console.error("Can't build DB", error);
	} finally {
		// close connection
		client.end();
	}
};

rebuildDb();
