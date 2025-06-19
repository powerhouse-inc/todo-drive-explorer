/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddTodoItemInput,
  type UpdateTodoItemInput,
  type DeleteTodoItemInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/base-operations/creators.js";
import type { ToDoListDocument } from "../../gen/types.js";

describe("BaseOperations Operations", () => {
  let document: ToDoListDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addTodoItem operation", () => {
    const input: AddTodoItemInput = generateMock(z.AddTodoItemInputSchema());

    const updatedDocument = reducer(document, creators.addTodoItem(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_TODO_ITEM");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateTodoItem operation", () => {
    const input: UpdateTodoItemInput = generateMock(
      z.UpdateTodoItemInputSchema(),
    );

    const updatedDocument = reducer(document, creators.updateTodoItem(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("UPDATE_TODO_ITEM");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteTodoItem operation", () => {
    const input: DeleteTodoItemInput = generateMock(
      z.DeleteTodoItemInputSchema(),
    );

    const updatedDocument = reducer(document, creators.deleteTodoItem(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("DELETE_TODO_ITEM");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
