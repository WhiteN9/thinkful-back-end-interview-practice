const service = require("./todo.service");

function idIsValid(req, res, next) {
  if (isNaN(parseInt(req.params.todo_id, 10))) {
    next({
      status: 404,
      message: `Invalid id`
    });
  } else {
    next();
  }
}

function isNumberOfValuesValid(req, res, next) {
  const { title, completed } = req.body;
  const todoToUpdate = { title, completed };

  const numberOfValues = Object.values(todoToUpdate).filter(Boolean).length;
  if (numberOfValues) {
    res.locals.update = todoToUpdate;
    next();
  } else {
    next({
      status: 400,
      message: `Request body must content either 'title' or 'completed'`
    });
  }
}

async function update(req, res) {
  const { todo_id } = req.params;
  const updated = await service.update(todo_id, res.locals.update);
  res.status(200).json(updated[0]);
}

async function destroy(req, res) {
  const { todo_id } = req.params;
  await service.destroy(todo_id);
  res.status(204).end();
}

module.exports = {
  update: [idIsValid, isNumberOfValuesValid, update],
  destroy: [idIsValid, destroy]
};
