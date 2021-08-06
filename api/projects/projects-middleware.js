// add middlewares here related to projects
const { get } = require("./projects-model");

async function validateUserId(req, res, next) {
  get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        next({
          status: 404,
          message: "user not found",
        });
      }
    })
    .catch(next);
}

async function validateUser (req, res, next) {
    if(!req.body.name || !req.body.description) {
            next({
            status: 400,  
            message: "You cannot post this new project"
          });    
    } else {
        next(); 
    }
}

async function validateUser2(req, res, next) {
  if (!req.body.name || !req.body.description || !req.body.completed) {
    res.status(400).json({
      message: "You cannot post this new project",
    });
  } else {
    next();
  }
}


module.exports = {
  validateUserId,
  validateUser,
  validateUser2,
};