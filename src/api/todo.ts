import request from ".";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = (): Promise<Todo[]> => {
  return request.get("/todos");
};

export const createTodo = (data: Todo): Promise<Todo> => {
  return request.post("/todos", data);
};
