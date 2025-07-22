// subgraphs/to-do-list/resolvers.ts
interface SubgraphInstance {
    operationalStore: any;
  }
  
  export const createResolvers = (subgraphInstance: SubgraphInstance) => ({
    Query: {
      todoList: async () => {
        const items = await subgraphInstance.operationalStore.getAll("todo_items");
        const total = items.length;
        const checked = items.filter((item: any) => item.checked).length;
        const unchecked = total - checked;
        
        return {
          total,
          checked,
          unchecked
        };
      },
      
      todoItems: async (parent: any, { checked }: any) => {
        let query = subgraphInstance.operationalStore.select("*").from("todo_items");
        
        if (checked !== undefined) {
          query = query.where("checked", checked);
        }
        
        const items = await query.orderBy("created_at", "asc");
        return items;
      },
      
      todoItemsCount: async (parent: any, { checked }: any) => {
        let query = subgraphInstance.operationalStore.count("* as count").from("todo_items");
        
        if (checked !== undefined) {
          query = query.where("checked", checked);
        }
        
        const result = await query.first();
        return result?.count || 0;
      }
    }
  });