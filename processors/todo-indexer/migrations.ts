import { type DB } from "./schema.js";
import { type IOperationalStore } from "document-drive/processors/types"

export async function up(db: IOperationalStore<DB>): Promise<void> {
  // Create table
  await db.schema
    .createTable("todo")
    .addColumn("name", "varchar(255)")
    .addColumn("completed", "boolean")
    .addPrimaryKeyConstraint("todo_pkey", ["name"])
    .ifNotExists()
    .execute();

  const tables = await db.introspection.getTables();
  console.log(tables);
}

export async function down(db: IOperationalStore<DB>): Promise<void> {
  // drop table
  await db.schema.dropTable("todo").execute();
}
