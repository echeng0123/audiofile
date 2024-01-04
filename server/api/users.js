const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_SECRET } = require("../secrets.js");
const SALT_ROUNDS = 10;

const {
	getAllUsers,
	getUserById,
	getUserByUsername,
	createUser,
	// updateUser,
	// deleteUser,
} = require("../db/helpers/users");

// GET - /api/users - get all users
router.get("/", async (req, res, next) => {
	try {
		const users = await getAllUsers();
		res.send(users);
	} catch (error) {
		console.log("error from router get", error);
		next(error);
	}
});

module.exports = router;
