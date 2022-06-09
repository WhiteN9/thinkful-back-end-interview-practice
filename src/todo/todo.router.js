const router = require("express").Router();
const controller = require("./todo.controller");

router.route("/").get(/* code here */).post(/* code here */);

router
  .route("/:todo_id")
  .get(/* code here */)
  .patch(controller.update)
  .delete(controller.destroy);

module.exports = router;
