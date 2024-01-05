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

// GET - /api/users/:userId - get user by id
router.get("/:userId", async (req, res, next) => {
	try {
		const user = await getUserById(req.params.userId);
		res.send(user);
	} catch (error) {
		next(error);
	}
});

// GET - /api/users/user/:username - get user by username
router.get("/user/:username", async (req, res, next) => {
	try {
		const user = await getUserByUsername(req.params.username);
		res.send(user);
	} catch (error) {
		next(error);
	}
});

// POST - /api/users/register - create a new user
router.post("/register", async (req, res, next) => {
	try {
		console.log("req.body", req.body);
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		console.log("hash", hashedPassword);
		const user = await createUser({ username, password: hashedPassword });
		console.log("user", user);
		delete user.password;

		const token = jwt.sign(user, JWT_SECRET);

		res.cookie("token", token, {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});

		delete user.password;
		// res.cookie(COOKIE_SECRET);
		res.send({ token, user });
	} catch (error) {
		next(error);
	}
});

// LOGIN

router.post("/login", async (req, res, next) => {
	// console.log("entering router post for login");
	try {
		const { username, password } = req.body;
		console.log({ username, password });
		const user = await getUserByUsername(username);
		console.log("user in router post", user);
		const validPassword = await bcrypt.compare(password, user.password);

		if (validPassword) {
			const token = jwt.sign(user, JWT_SECRET);
			console.log("token in login ", token);

			res.cookie("token", token, {
				sameSite: "strict",
				httpOnly: true,
				signed: true,
			});

			delete user.password;

			res.send({ token, user });
			return token;
		} else {
			console.log("invalid password");
		}
	} catch (error) {
		next(error);
	}
});

// LOGOUT
router.post("/logout", async (req, res, next) => {
	try {
		res.clearCookie("token", {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});
		res.send({
			loggedIn: false,
			message: "Logged Out",
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
