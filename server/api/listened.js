// this file links the API requests for the drinks table

const express = require("express");
const router = express.Router();

const {
	createListened,
	getAllListened,
	getListenedById,
	getListenedByUserId,
} = require("../db/helpers/listened");

// GET - /api/listened - get all on the "to listen" list
router.get("/", async (req, res, next) => {
	try {
		console.log("entering api/listened router");
		const listened = await getAllListened();
		res.send(listened);
	} catch (error) {
		console.log("error getting all to listen list from router", error);
		res.send([]);
		next(error);
	}
});

// GET - /api/listened/:listened_id - get listened by id
router.get("/:listened_id", async (req, res, next) => {
	try {
		console.log("entering api/listened/:listened_id router");
		const listened = await getListenedById(req.params.listened_id);
		res.send(listened);
	} catch (error) {
		next(error);
	}
});

// GET - /api/listened/user/:user_id - get listened by user id
router.get("/user/:user_id", async (req, res, next) => {
	try {
		console.log("entering api/listened/user/:user_id router");
		const listened_user = await getListenedByUserId(req.params.user_id);
		res.send(listened_user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
