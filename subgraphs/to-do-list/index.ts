// subgraphs/to-do-list/index.ts
import { typeDefs } from './schema.js';
import { createResolvers } from './resolvers.js';

export default class ToDoListSubgraph {
  // Define the API endpoint where this subgraph will be accessible
  // Users can query this at: http://localhost:4001/graphql/to-do-list
  path = '/to-do-list';
  
  // GraphQL schema definition (what queries are available)
  typeDefs = typeDefs;
  
  // Query handlers (how to fetch the data)
  resolvers: any;
  
  // Database interface (injected by Powerhouse framework)
  operationalStore: any;
  
  constructor() {
    // Connect the resolvers to this subgraph instance
    // This gives resolvers access to the database through this.operationalStore
    this.resolvers = createResolvers(this);
  }

  // Called once when the subgraph starts up
  async onSetup() {
    await this.createOperationalTables();
  }

  // Create the database tables we need for storing todo items
  async createOperationalTables() {
    await this.operationalStore.schema.createTableIfNotExists(
      "todo_items", // Table name
      (table: any) => {
        table.string("id").primary();           // Unique identifier for each todo item
        table.string("text").notNullable();     // The actual todo task text
        table.boolean("checked").defaultTo(false); // Completion status (unchecked by default)
        table.timestamp("created_at").defaultTo(this.operationalStore.fn.now()); // When item was created
        table.timestamp("updated_at").defaultTo(this.operationalStore.fn.now()); // When item was last modified
      }
    );
  }

  // Event processor: Keeps subgraph data synchronized with document model changes
  // When users add/update/delete todos in Connect, this method handles the updates
  async process(event: any) {
    // Handle new todo item creation
    if (event.type === "ADD_TODO_ITEM") {
      await this.operationalStore.insert("todo_items", {
        id: event.input.id,
        text: event.input.text,
        checked: false,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      console.log(`Added todo item: ${event.input.text}`);
    }
    
    // Handle todo item updates (text changes, checking/unchecking)
    if (event.type === "UPDATE_TODO_ITEM") {
      const updateData: any = {
        updated_at: new Date() // Always update the timestamp
      };
      
      // Only update fields that were actually changed
      if (event.input.text !== undefined) {
        updateData.text = event.input.text;
      }
      if (event.input.checked !== undefined) {
        updateData.checked = event.input.checked;
      }
      
      await this.operationalStore.update("todo_items")
        .where("id", event.input.id)
        .update(updateData);
      
      console.log(`Updated todo item: ${event.input.id}`);
    }
    
    // Handle todo item deletion
    if (event.type === "DELETE_TODO_ITEM") {
      await this.operationalStore.delete("todo_items")
        .where("id", event.input.id);
      
      console.log(`Deleted todo item: ${event.input.id}`);
    }
  }
}