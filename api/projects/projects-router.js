const express = require("express");
const Project = require("./projects-model");
// Write your "projects" router here!
const router = express.Router();

// [GET]
router.get("/api/projects", (req, res, next) => {
	Project.get()
		.then((projects) => {
			if (projects === null) {
				res.status(404).send([]);
			} else {
				res.status(200).json(projects);
			}
		})
		.catch((err) => next(err));
});

router.get("/api/projects/:id", (req, res) => {
	res.status(200).json(req.project);
});

router.get("/:id/actions", (req, res, next) => {
	Project.getProjectActions(req.params.id)
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => next(err));
});

// [POST]
router.post("/api/projects", (req, res, next) => {
	Project.insert(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => next(err));
});

// [PUT]
router.put("/api/projects/:id", (req, res, next) => {
	Project.update(req.params.id, req.body)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => next(err));
});

// [DELETE]
router.delete("api/projects/:id", (req, res, next) => {
	Project.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: "Project deleted" });
		})
		.catch((err) => next(err));
});

router.get("/api/projects/:id/actions", (req, res, next) => {
	res.status(200).json(req.project);
});

module.exports = router;
