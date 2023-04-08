/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const defGorevler = [{ Adi: "Başarılı Ol", Aciklama: "Zamanını Yönet" }];
const defTasklar = [
  { Adi: "Erken Kalk", Aciklama: "Spor Yap", GorevId: 1 },
  { Adi: "İşe Başla", Aciklama: "Görevleri Kontrol", GorevId: 2 },
];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Gorevler").truncate();
  await knex("Gorevler").insert(defGorevler);
  await knex("Tasklar").truncate();
  await knex("Tasklar").insert(defTasklar);
};
