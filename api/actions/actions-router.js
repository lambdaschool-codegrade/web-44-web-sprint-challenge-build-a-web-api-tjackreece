const express = require("express");
const Action = require("./actions-model");
// Write your "actions" router here!
const router = express.Router();

// [GET]
router.get("/api/actions", (req, res, next) => {
	Action.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => next(err));
});

router.get("/api/actions/:id", (req, res, next) => {
	res.status(200).json(req.action);
});

// [POST]
router.post("/api/actions", (req, res, next) => {
	Action.insert(req.body)
		.then((action) => {
			res.status(201).json(action);
		})
		.catch((err) => next(err));
});

// [PUT]
router.put("/api/actions/:id", (req, res, next) => {
	Action.update(req.params.id, req.body)
		.then((updatedAction) => {
			res.status(200).json(updatedAction);
		})
		.catch((err) => next(err));
});

// [DELETE]
router.delete("/api/actions/:id", (req, res, next) => {
	Action.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: "Action deleted" });
		})
		.catch((err) => next(err));
});

module.exports = router;
