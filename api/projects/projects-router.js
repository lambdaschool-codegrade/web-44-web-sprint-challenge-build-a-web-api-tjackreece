const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
const {
	validateUserId,
	validateUser,
	validateUser2,
} = require("./projects-middleware");

router.get("/", async (req, res, next) => {
	try {
		const projects = await Projects.get();
		res.json(projects);
	} catch (err) {
		res.status(500).json({
			message: "There are no projects to return",
		});
	}
});

router.get("/:id", validateUserId, async (req, res, next) => {
	await Projects.get(req.params.id)
		.then((project) => res.json(project))
		.catch(next);
});

router.post("/", validateUserId, validateUser, async (req, res, next) => {
	const newPost = req.body;
	await Projects.insert(newPost)
		.then((post) => {
			res.json(post);
		})
		.catch(next);
});

router.put("/:id", validateUserId, validateUser2, async (req, res, next) => {
	try {
		await Projects.update(req.params.id, req.body);
		res.status(200).json(req.body);
	} catch (error) {
		next(error);
	}
});
//  tried to fix but i cant figure this out feedback neede please and thank you^^^^^

router.delete("/:id", validateUserId, (req, res, next) => {
	Projects.remove(req.params.id)
		.then((project) => res.json())
		.catch(next);
});

router.get("/:id/actions", validateUserId, (req, res, next) => {
	Projects.getProjectActions(req.params.id)
		.then((project) => res.json(project))
		.catch(next);
});

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		custom: "Projects router issue",
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;
