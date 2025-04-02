import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import { type ToDoState, type ToDoLocalState } from "./types.js";
import { type ToDoAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import ToDo_BaseOperations from "./base-operations/object.js";

export * from "./base-operations/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface ToDo extends ToDo_BaseOperations {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class ToDo extends BaseDocumentClass<ToDoState, ToDoLocalState, ToDoAction> {
  static fileExtension = ".phdm";

  constructor(
    initialState?: Partial<
      ExtendedState<PartialState<ToDoState>, PartialState<ToDoLocalState>>
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, ToDo.fileExtension, name);
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(ToDo, [ToDo_BaseOperations]);

export { ToDo };
