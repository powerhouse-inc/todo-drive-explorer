import {
  type ProcessorRecord,
  type IProcessorHostModule,
} from "document-drive/processors/types";
import { type RelationalDbProcessorFilter } from "document-drive/processors/relational";
import { TodoIndexerProcessor } from "./index.js";

export const todoIndexerProcessorFactory =
  (module: IProcessorHostModule) =>
  async (driveId: string): Promise<ProcessorRecord[]> => {
    // Create a namespace for the processor and the provided drive id
    const namespace = TodoIndexerProcessor.getNamespace(driveId);

    // Create a namespaced db for the processor
    const store =
      await module.relationalDb.createNamespace<TodoIndexerProcessor>(
        namespace,
      );

    // Create a filter for the processor
    const filter: RelationalDbProcessorFilter = {
      branch: ["main"],
      documentId: ["*"],
      documentType: ["powerhouse/todolist"],
      scope: ["global"],
    };

    // Create the processor
    const processor = new TodoIndexerProcessor(namespace, filter, store);
    return [
      {
        processor,
        filter,
      },
    ];
  };
