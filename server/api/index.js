// This file handles routing for the API.

const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", (req, res, next) => {
	res.send("OK");
});

// ROUTER: /api/users
router.use("/users", require("./users"));

// ROUTER: /api/to_listen
router.use("/to_listen", require("./toListen"));

// ROUTER: /api/listened
// router.use("/listened", require("./listened"));

module.exports = router;
