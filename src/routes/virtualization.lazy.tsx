import { createLazyFileRoute } from "@tanstack/react-router";
import { TodoListVirtualized } from "../modules/todo-list/TodoListVirtualized";

export const Route = createLazyFileRoute("/virtualization")({
  component: TodoListVirtualized,
});
