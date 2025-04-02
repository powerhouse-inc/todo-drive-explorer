/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddTodoItemInputInput,
  type UpdateTodoItemInputInput,
  type DeleteTodoItemInputInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/base-operations/creators.js";
import type { ToDoDocument } from "../../gen/types.js";

describe("BaseOperations Operations", () => {
  let document: ToDoDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addTodoItemInput operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: AddTodoItemInputInput = generateMock(
      z.AddTodoItemInputInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addTodoItemInput(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "ADD_TODO_ITEM_INPUT",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateTodoItemInput operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: UpdateTodoItemInputInput = generateMock(
      z.UpdateTodoItemInputInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.updateTodoItemInput(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "UPDATE_TODO_ITEM_INPUT",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteTodoItemInput operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: DeleteTodoItemInputInput = generateMock(
      z.DeleteTodoItemInputInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.deleteTodoItemInput(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "DELETE_TODO_ITEM_INPUT",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
