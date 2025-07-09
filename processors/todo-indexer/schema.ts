export interface Todo {
  completed: boolean | null;
  name: string;
}

export interface DB {
  todo: Todo;
}
