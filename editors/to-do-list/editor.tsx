import { useState } from "react";
import type { EditorProps } from "document-model";
import {
  actions,
  type ToDoItem,
} from "../../document-models/to-do-list/index.js";
import { InputField } from "./components/inputField.js";
import { Checkbox } from "./components/checkbox.js";
import { useSelectedDocument } from "@powerhousedao/reactor-browser";
import { isTodoDocument } from "../../utils.js";

export default function Editor(props: EditorProps) {
  const { context } = props;
  const [document, dispatch] = useSelectedDocument();
  const [selectedItem, setSelectedItem] = useState<string>();
  const [inputText, setInputText] = useState<string>("");

  if (!isTodoDocument(document)) {
    return null;
  }

  const { items, stats } = document.state.global;
  const sortedItems = items.toSorted((a, b) => (a.checked ? 1 : -1));

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
                {
                  <>
                    <div style={{ flex: 1 }}>
                      <InputField
                        label="Add a new item"
                        input={inputText}
                        handleInputChange={(e) => {
                          setInputText(e.target.value);
                        }}
                        value={inputText}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            dispatch(
                              actions.addTodoItem({
                                id: Math.random().toString(),
                                text: inputText,
                              }),
                            );
                            setInputText("");
                            setSelectedItem(undefined);
                          }
                        }}
                      />
                    </div>
                    <button
                      style={{
                        margin: "27px 0 0 0",
                        padding: "0px 20px",
                        height: "36px",
                        minWidth: "80px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatch(
                          actions.addTodoItem({
                            id: Math.random().toString(),
                            text: inputText,
                          }),
                        );
                        setInputText("");
                        setSelectedItem(undefined);
                      }}
                    >
                      Add
                    </button>
                  </>
                }
              </div>
            </div>
            {items.length >= 2 && (
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
                        {stats.total}
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
                        {stats.checked}
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
                        {stats.unchecked}
                      </div>
                    </div>
                  </div>
                </div>

                {
                  <button
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
                      items.forEach((item) => {
                        dispatch(
                          actions.deleteTodoItem({
                            id: item.id,
                          }),
                        );
                      });
                    }}
                  >
                    Remove All
                  </button>
                }
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
                  <>
                    <Checkbox
                      value={item.checked}
                      onChange={(e: boolean) => {
                        dispatch(
                          actions.updateTodoItem({ id: item.id, checked: e }),
                        );
                      }}
                    />
                    <button
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
                          actions.deleteTodoItem({
                            id: item.id,
                          }),
                        );
                      }}
                    >
                      Remove
                    </button>
                  </>
                </div>

                <div style={{ flex: 1 }}>
                  {selectedItem === item.id ? (
                    <InputField
                      input={inputText}
                      value={inputText}
                      handleInputChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            actions.updateTodoItem({
                              id: item.id,
                              text: inputText,
                            }),
                          );
                          setSelectedItem(undefined);
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
                        setSelectedItem(item.id);
                        setInputText(item.text);
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
