import { useState } from "react";
import type { EditorProps } from "document-model";
import {
  type ToDoDocument,
  actions,
  type ToDoItem,
} from "../../document-models/to-do/index.js";
import { InputField } from "./components/inputField.js";
import { Button } from "@powerhousedao/design-system";
import { Checkbox } from "./components/checkbox.js";
export type IProps = EditorProps<ToDoDocument>;

export default function Editor(props: IProps) {
  const { document, dispatch, context } = props;
  const {
    state: { global: state },
  } = document;

  const [todoItem, setTodoItem] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

  // Sort items by checked status
  const sortedItems: ToDoItem[] = [...state.items].sort((a, b) => {
    return (b.checked ? 1 : 0) - (a.checked ? 1 : 0);
  });

  return (
    <>
      <div>
        <div>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2em",
              marginBottom: "20px",
            }}
          >
            My To-Do List
          </h1>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              width: "100%",
              gap: "20px",
            }}
          >
            <div
              style={{
                flex: "1 1 300px",
                minWidth: "300px",
                maxWidth: "600px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Add a new item"
                    input={todoItem}
                    handleInputChange={(e) => {
                      setTodoItem(e.target.value);
                    }}
                    value={todoItem}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        dispatch(
                          actions.addTodoItemInput({
                            id: Math.random().toString(),
                            text: todoItem,
                          })
                        );
                        setTodoItem("");
                      }
                    }}
                  />
                </div>
                <Button
                  style={{
                    margin: "27px 0 0 0",
                    padding: "0px 20px",
                    height: "36px",
                    minWidth: "80px",
                    cursor: "pointer",
                  }}
                  size="small"
                  onClick={() => {
                    dispatch(
                      actions.addTodoItemInput({
                        id: Math.random().toString(),
                        text: todoItem,
                      })
                    );
                    setTodoItem("");
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            {state.items.length >= 2 && (
              <div
                style={{
                  flex: "1 1 300px",
                  minWidth: "300px",
                  maxWidth: "400px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "27px",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    minWidth: "180px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginBottom: "2px",
                        }}
                      >
                        Total
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        {state.stats.total}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginBottom: "2px",
                        }}
                      >
                        Checked
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#16a34a",
                        }}
                      >
                        {state.stats.checked}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          marginBottom: "2px",
                        }}
                      >
                        Pending
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#ea580c",
                        }}
                      >
                        {state.stats.unchecked}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  size="small"
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    height: "36px",
                    alignSelf: "center",
                  }}
                  onClick={() => {
                    state.items.forEach((item) => {
                      dispatch(
                        actions.deleteTodoItemInput({
                          id: item.id,
                        })
                      );
                    });
                  }}
                >
                  Remove All
                </Button>
              </div>
            )}
          </div>
        </div>

        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            {sortedItems.map((item: ToDoItem, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  marginBottom: "8px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    minWidth: "100px",
                  }}
                >
                  <Checkbox
                    value={item.checked}
                    onChange={(e: boolean) => {
                      dispatch(
                        actions.updateTodoItemInput({ id: item.id, checked: e })
                      );
                    }}
                  />
                  <Button
                    style={{
                      color: "#ff4d4d",
                      padding: "4px 8px",
                      minWidth: "auto",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(
                        actions.deleteTodoItemInput({
                          id: item.id,
                        })
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>

                <div style={{ flex: 1 }}>
                  {editingItemId === item.id ? (
                    <InputField
                      input={editedText}
                      value={editedText}
                      handleInputChange={(e) => setEditedText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            actions.updateTodoItemInput({
                              id: item.id,
                              text: editedText,
                            })
                          );
                          setEditingItemId(null);
                        }
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: "15px",
                        cursor: "pointer",
                        textDecoration: item.checked ? "line-through" : "none",
                        color: item.checked ? "#94a3b8" : "#1e293b",
                      }}
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditedText(item.text);
                      }}
                    >
                      {item.text}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
