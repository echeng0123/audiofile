// this file links the API requests for the drinks table

const express = require("express");
const router = express.Router();

const {
	createToListen,
	getAllToListen,
	getToListenById,
	getToListenByUserId,
} = require("../db/helpers/toListen");

// GET - /api/to_listen - get all on the "to listen" list
router.get("/", async (req, res, next) => {
	try {
		console.log("entering api/to_listen router");
		const toListen = await getAllToListen();
		res.send(toListen);
	} catch (error) {
		console.log("error getting all to listen list from router", error);
		res.send([]);
		next(error);
	}
});

// GET - /api/to_listen/:to_listen_id - get to_listen by id
router.get("/:to_listen_id", async (req, res, next) => {
	try {
		console.log("entering api/to_listen/:to_listen_id router");
		const to_listen = await getToListenById(req.params.to_listen_id);
		res.send(to_listen);
	} catch (error) {
		next(error);
	}
});

// GET - /api/to_listen/user/:user_id - get to_listen by user id
router.get("/user/:user_id", async (req, res, next) => {
	try {
		console.log("entering api/to_listen/user/:user_id router");
		const to_listen_user = await getToListenByUserId(req.params.user_id);
		res.send(to_listen_user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
