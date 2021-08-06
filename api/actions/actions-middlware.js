// add middlewares here related to actions
const  { get } = require("./actions-model");

async function validateActionId(req, res, next) {
  get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({
          status: 404,
          message: "action not found",
        });
      }
    })
    .catch(next);
}

async function validateAction3(req, res, next) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    res.status(400).json({
      message: "You cannot post this new project",
    });
  } else {
    next();
  }
}

async function validateAction(req, res, next) {
  if (!req.body.notes && !req.body.description && !req.body.project_id && !req.body.completed) {
    res.status(400).json({
      message: "You cannot post this new project",
    });
  } else {
    next();
  }
}

async function validateIdExists(req, res, next) {
  if(!req.body.project_id){
    res.json({
      message:  "This project id does not belong to an existing project "
    })
  } else {
    next()
  }
}

module.exports = {
  validateActionId,
  validateAction,
  validateIdExists,
  validateAction3
};