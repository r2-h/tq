import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import { jsonServerApiInstance } from "../../shared/api/json-server-api-instance";

export type PaginatedResponse<T> = {
  data: T[];
  first: number;
  prev: null | number;
  next: null | number;
  last: number;
  pages: number;
  items: number;
};
export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  userId: string;
};

export const todoListApi = {
  baseKey: "tasks",

  getTodoList: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: async ({ signal }) => {
        return jsonServerApiInstance<TodoDto[]>(`/tasks`, {
          signal,
        });
      },
      select: (data) => data?.reverse(),
    });
  },

  getPaginatedTodoListWithoutQueryOptions: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }, // для того чтобы отменять запросы которые уже не нужны (если после первого запроса сразу идёт второй то первый уже не нужен)
  ) => {
    return fetch(`http://localhost:3000/tasks?_page=${page}&_per_page=10`, {
      signal,
    }).then((res) => res.json() as Promise<PaginatedResponse<TodoDto>>);
  },

  getPaginatedTodoList: (page: number) => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list", { page }],
      queryFn: async ({ signal }) => {
        return jsonServerApiInstance<PaginatedResponse<TodoDto>>(
          `/tasks?_page=${page}&_per_page=10`,
          {
            signal,
          },
        );
      },
      placeholderData: keepPreviousData,
    });
  },

  getInfinityTodoList: () => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: async ({ signal, pageParam }) => {
        return jsonServerApiInstance<PaginatedResponse<TodoDto>>(
          `/tasks?_page=${pageParam}&_per_page=10`,
          {
            signal,
          },
        );
      },
      initialPageParam: 1,
      getNextPageParam: (response) => response?.next,
      select: (result) => result.pages.flatMap((page) => page?.data),
    });
  },

  createTodo: async (data: TodoDto) => {
    jsonServerApiInstance<TodoDto>("/tasks", {
      method: "POST",
      json: data,
    });
  },

  updateTodo: async (id: string, data: Partial<TodoDto>) => {
    jsonServerApiInstance<TodoDto>(`/tasks/${id}`, {
      method: "PATCH",
      json: data,
    });
  },

  deleteTodo: async (id: string) => {
    jsonServerApiInstance(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
