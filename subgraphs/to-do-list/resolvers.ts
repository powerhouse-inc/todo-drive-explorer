/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { actions } from "../../document-models/to-do-list/index.js";
import { generateId } from "document-model";

const DEFAULT_DRIVE_ID = "powerhouse";

export const getResolvers = (subgraph: Subgraph): Record<string, any> => {
  const reactor = subgraph.reactor;

  return ({
    Query: {
      ToDoList: async (_: any, args: any, ctx: any) => {
        return {
          getDocument: async (args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docId: string = args.docId || "";
            const doc = await reactor.getDocument(driveId, docId);
             return {
              id: docId,
              driveId: driveId,
              ...doc,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.revision.global,
            };
          },
          getDocuments: async (args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc = await reactor.getDocument(driveId, docId);
                return {
                  id: docId,
                  driveId: driveId,
                  ...doc,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.revision.global,
                };
              }),
            );

            return docs.filter(
              (doc) => doc.documentType === "powerhouse/todolist",
            );
          },
        };
      },
    },
    Mutation: {

      ToDoList_createDocument: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId = generateId();
        
        await reactor.addDriveAction(driveId, addFile({
          id: docId,
          name: args.name,
          documentType: "powerhouse/todolist",
          synchronizationUnits:[
            { 
              branch: "main", 
              scope: "global", 
              syncId: generateId(), 
            },
            { 
              branch: "main", 
              scope: "local", 
              syncId: generateId(), 
            }
          ],
        }));

        return docId;
      },

        ToDoList_addTodoItem: async (_: any, args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docId: string = args.docId || "";
            const doc = await reactor.getDocument(driveId, docId);

            await reactor.addAction(
                driveId,
                docId,
                actions.addTodoItem({...args.input})
            );
            
            return doc.revision.global + 1;
        },

        ToDoList_updateTodoItem: async (_: any, args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docId: string = args.docId || "";
            const doc = await reactor.getDocument(driveId, docId);

            await reactor.addAction(
                driveId,
                docId,
                actions.updateTodoItem({...args.input})
            );
            
            return doc.revision.global + 1;
        },

        ToDoList_deleteTodoItem: async (_: any, args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docId: string = args.docId || "";
            const doc = await reactor.getDocument(driveId, docId);

            await reactor.addAction(
                driveId,
                docId,
                actions.deleteTodoItem({...args.input})
            );
            
            return doc.revision.global + 1;
        },


    },
  });
};
