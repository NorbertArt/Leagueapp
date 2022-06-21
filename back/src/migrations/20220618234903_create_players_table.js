/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('players',(table)=>{
        table.increments('id').primary().notNull()
        table.text('Nazwa')
        table.string('Pozycja')
        table.string('nr')
        table.text('Team')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
