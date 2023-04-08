const db = require("../../data/db-config");

async function getAll() {
  return await db("Tasklar");
}
async function getById(taskId) {
  return await db("Tasklar").where("TaskId", taskId).first();
}
async function create(task) {
  //obje geldi
  const sonuc = await db("Tasklar").insert(task); //array dönüyor
  return getById(sonuc[0]);
}
async function update(taskId, task) {
  await db("Tasklar").where("TaskId", taskId).update(task);
  return getById(taskId);
}
async function remove(taskId) {
  await db("Tasklar").where("TaskId", taskId).del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
