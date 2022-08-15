import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // create users table
  await knex.schema.createTable("users", (table) => {
    table.uuid("id", { primaryKey: true }).unique();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // create user_details table
  await knex.schema.createTable("user_details", (table) => {
    table.bigIncrements("id", { primaryKey: true });
    table.uuid("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.string("username").notNullable();
    table.string("phone_number").defaultTo(null);
    table.string("profile_photo").defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  // Delete user_details table
  await knex.schema.dropTableIfExists("user_details");

  // Delete users table
  await knex.schema.dropTableIfExists("users");
}
