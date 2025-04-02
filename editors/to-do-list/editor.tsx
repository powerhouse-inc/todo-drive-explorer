import type { EditorProps } from "document-model";
import { useState } from "react";
import {
  type ToDoDocument,
  actions,
  type ToDoItem,
} from "../../document-models/to-do/index.js";
import { Button } from "@powerhousedao/design-system";

export type IProps = EditorProps<ToDoDocument>;

export default function Editor(props: IProps) {
  const { document, dispatch, context } = props;
  const {
      state: { global: state },
  } = document;

  const [todoItem, setTodoItem] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  // Sort items by checked status
  const sortedItems: ToDoItem[] = [...state.items].sort((a, b) => {
      return (b.checked ? 1 : 0) - (a.checked ? 1 : 0);
  });

  return (
      <>
          <div>
              <div>
                  <h1>To-do List</h1>
                  <br />
                  <input
                      key="doc-title"
                      placeholder="Insert task here..."
                      onChange={(value) => {
                          setTodoItem(value.target.value);
                      }}
                      value={todoItem}
                      onKeyPress={(event) => {
                          if (event.key === 'Enter') {
                              dispatch(
                                  actions.addTodoItemInput({
                                      id: Math.random().toString(),
                                      text: todoItem,
                                  })
                              );
                              setTodoItem('');
                          }
                      }}
                  />
                  <button
                      onClick={() => {
                          dispatch(
                              actions.addTodoItemInput({
                                  id: Math.random().toString(),
                                  text: todoItem,
                              }),
                          );
                          setTodoItem('');
                      }}
                  >
                      Add
                  </button>
                  <br />
                  <div
                      style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                      }}
                  >
                      <div style={{ flex: 2, marginTop: '20px' }}>
                          {sortedItems.map((item: ToDoItem, index: number) => (
                              <ul key={index}>
                                  <li
                                      style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                      }}
                                  >
                                      <input
                                          type="checkbox"
                                          checked={item.checked}
                                          onClick={() => {
                                              dispatch(
                                                  actions.updateTodoItemInput({
                                                      id: item.id,
                                                      checked:
                                                          !item.checked,
                                                  }),
                                              );
                                          }}
                                      />
                                      <button
                                          style={{
                                              color: 'red',
                                              padding: '0px 5px 0px 5px',
                                          }}
                                          onClick={() => {
                                              dispatch(
                                                  actions.deleteTodoItemInput({
                                                      id: item.id,
                                                  }),
                                              );
                                          }}
                                      >
                                          Remove
                                      </button>
                                      {editingItemId === item.id ? (
                                          <input
                                              style={{ width: '100%' }}
                                              type="text"
                                              value={editedText}
                                              onChange={(e) => setEditedText(e.target.value)}
                                              onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                      dispatch(
                                                          actions.updateTodoItemInput({
                                                              id: item.id,
                                                              text: editedText,
                                                          }),
                                                      );
                                                      setEditingItemId(null);
                                                  }
                                              }}
                                              autoFocus
                                          />
                                      ) : (
                                          <span
                                              style={{
                                                  fontSize: '15px',
                                                  marginLeft: '10px',
                                                  cursor: 'pointer',
                                              }}
                                              onClick={() => {
                                                  setEditingItemId(item.id);
                                                  setEditedText(item.text);
                                              }}
                                          >
                                              {item.text}
                                          </span>
                                      )}
                                  </li>
                              </ul>
                          ))}
                      </div>
                      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                          {state.items.length >= 2 && (
                              <button
                                  style={{
                                      backgroundColor: '#ff4d4d',
                                      color: 'white',
                                      border: 'none',
                                      padding: '5px 10px',
                                      cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                      state.items.forEach(item => {
                                          dispatch(
                                              actions.deleteTodoItemInput({
                                                  id: item.id,
                                              })
                                          );
                                      });
                                  }}
                              >
                                  Remove All Todos
                              </button>
                          )}
                      </div>

                      <div style={{ flex: 1, paddingLeft: '10px' }}>
                          <span>Total: {state.stats.total}</span>
                          <br />
                          <span>Checked: {state.stats.checked}</span>
                          <br />
                          <span>Unchecked: {state.stats.unchecked}</span>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}
