import {
  OperationalProcessor,
  type OperationalProcessorFilter,
} from "document-drive/processors/operational-processor";
import { type InternalTransmitterUpdate } from "document-drive/server/listener/transmitter/internal";
import { up } from "./migrations.js";
import { type DB } from "./schema.js";
import type { ToDoListDocument } from "../../document-models/to-do-list/index.js";

type DocumentType = ToDoListDocument;

export class TodoIndexerProcessor extends OperationalProcessor<DB> {
  get filter(): OperationalProcessorFilter {
    return {
      branch: ["main"],
      documentId: ["*"],
      documentType: ["powerhouse/todolist"],
      scope: ["global"],
    };
  }

  async initAndUpgrade(): Promise<void> {
    await up(this.operationalStore);
  }

  async onStrands(
    strands: InternalTransmitterUpdate<DocumentType>[],
  ): Promise<void> {
    if (strands.length === 0) {
      return;
    }

    for (const strand of strands) {
      if (strand.operations.length === 0) {
        continue;
      }

      for (const operation of strand.operations) {
        console.log(">>> ", operation.type);
        await this.operationalStore
          .insertInto("todo")
          .values({
            name: strand.documentId,
            completed: true,
          })
          .execute();
      }
    }
  }

  async onDisconnect() {}
}
