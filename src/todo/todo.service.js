const knex = require("../db/connection");
const table = "todo";

function list() {
  return knex(table).select();
}

function read(id) {
  return knex(table).select().where({ id }).first();
}

function create(newTodo) {
  return knex
    .insert(newTodo)
    .into(table)
    .returning("*")
    .then((rows) => {
      return rows[0];
    });
}

function update(id, newTodo) {
  return knex(table).where({ id }).update(newTodo).returning("*");
}

function destroy(id) {
  return knex(table).where({ id }).delete();
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy
};
