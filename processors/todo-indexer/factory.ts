import { type ProcessorRecord } from "document-drive/processors/types";
import { type IProcessorHostModule } from "document-drive/processors/types";
import { TodoIndexerProcessor } from "./index.js";
import { type DB } from "./schema.js";

export const todoIndexerProcessorFactory =
  (module: IProcessorHostModule) =>
  (driveId: string): ProcessorRecord[] => {
    const processor = new TodoIndexerProcessor(
      driveId,
      module.operationalStore,
    );
    return [
      {
        processor,
        filter: processor.filter,
      },
    ];
  };
