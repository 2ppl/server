import { Knex } from 'knex';

export const migration: Knex.Migration = {
  up: (knex: Knex) => knex.schema
    .createTable('examples', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('title', 255);
      table.text('content');
      table.integer('createdAt').notNullable();
      table.integer('updatedAt').notNullable();
    }),
  down: (knex: Knex) => knex.schema
    .dropTable('examples'),
};
