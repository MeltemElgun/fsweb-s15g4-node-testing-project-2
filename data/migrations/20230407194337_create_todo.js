/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable("Gorevler", (tbl) => {
      tbl.increments("GorevId");
      tbl.string("Adi").notNullable();
      tbl.string("Aciklama").notNullable();
    })
    .createTable("Tasklar", (tbl) => {
      tbl.increments("TaskId").notNullable();
      tbl.string("Adi").notNullable();
      tbl.string("Aciklama").notNullable();
      tbl.timestamp("Tarih").defaultTo(knex.fn.now());
      tbl
        .integer("GorevId")
        .references("GorevId")
        .inTable("Gorevler")
        .onDelete("CASCADE") //İLİŞKİLİ OLAN TABLOYU DA SİLİYOR
        .onUpdate("CASCADE");
    });
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Tasklar").dropTableIfExists("Gorevler");
};
