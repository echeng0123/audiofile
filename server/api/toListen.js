// this file links the API requests for the to listen table

const express = require("express");
const router = express.Router();

const {
	createToListen,
	getAllToListen,
	getToListenById,
	getToListenByUserId,
	deleteToListen,
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

// GET - /api/to_listen/user/:user_id - get to_listen by USER id
router.get("/user/:user_id", async (req, res, next) => {
	try {
		console.log("entering api/to_listen/user/:user_id router");
		const to_listen = await getToListenByUserId(req.params.user_id);
		res.send(to_listen);
	} catch (error) {
		next(error);
	}
});

// POST - /api/to_listen - create a new to_listen
router.post("/", async (req, res, next) => {
	try {
		console.log("entering api/to_listen create new to listen item router");
		const newToListen = await createToListen(req.body);
		res.send(newToListen);
	} catch (error) {
		next(error);
	}
});

//DELETE - /api/to_listen/:to_listen_id - delete to_listen item

router.delete("/:to_listen_id", async (req, res, next) => {
	try {
		console.log("entering delete to listen item router");
		const toListen = await deleteToListen(req.params.to_listen_id);
		res.send(toListen);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
