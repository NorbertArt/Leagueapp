

exports.up = function(knex) {
    return knex.schema.createTable('team',(table)=>{
        table.increments('id').primary().notNull()
        table.text('Druzyna')
        table.string('Mecze')
        table.string('Punkty')
        table.text('Liga')
        table.text('Slug')
        table.string('image')
      })
};

exports.down = function(knex) {
  
};
