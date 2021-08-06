// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const {
  validateActionId,
  validateAction,
  validateIdExists,
  validateAction3,
} = require("./actions-middlware");

router.get("/", async (req, res, next) => {
    try {
        const actions = await Actions.get();
        res.json(actions)
    } catch (err) {
        res.status(500).json({
            message: "There are no actions to return"
        })
    }
});


router.get("/:id", validateActionId, async (req, res, next) => {
    await Actions.get(req.params.id)
    .then((action) => res.json(action))
    .catch(next)
});



router.post("/", validateAction3, async (req, res, next) => {
  const newAction = req.body;
  Actions.insert(newAction)
    .then((action) => res.json(action))
    .catch(next);
});

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((project) => res.json(project))
    .catch(next);
});


// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

router.delete("/:id", async (req, res, next) => {
    Actions.remove(req.params.id)
    .then((action) => res.json())
    .catch(next)
})


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Actions router issue",
    message: err.message,
    stack: err.stack,
  });
});


module.exports = router;