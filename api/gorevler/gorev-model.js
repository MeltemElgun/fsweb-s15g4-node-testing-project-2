const db = require("../../data/db-config");
//Crud işlemeler // delete keyword fonksiyona yazamadık
async function getAll() {
  return await db("Gorevler");
}
async function getById(gorevId) {
  return await db("Gorevler").where("GorevId", gorevId).first();
}
async function create(gorev) {
  //obje geldi
  const sonuc = await db("Gorevler").insert(gorev); //array dönüyor
  return getById(sonuc[0]);
}
async function update(gorevId, gorev) {
  await db("Gorevler").where("GorevId", gorevId).update(gorev);
  return getById(gorevId);
}
async function remove(gorevId) {
  await db("Gorevler").where("GorevId", gorevId).del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
