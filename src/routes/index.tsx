import { createFileRoute } from "@tanstack/react-router";
import { useCreateTodoHandler } from "../modules/todo-list/useCreateTodo";
import { useTodoList } from "../modules/todo-list/useTodoList";

export const Route = createFileRoute("/")({
  component: TodoListPaginated,
});

function TodoListPaginated() {
  const { onSubmit } = useCreateTodoHandler();
  const { error, isPending, response } = useTodoList();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-10 ">
      <h1 className="font-bold text-3xl underline mb-10 text-center">Tasks</h1>

      <form onSubmit={onSubmit} className=" mb-3">
        <input type="text" name="text" className="border p-2" />
        <button type="submit" className="bg-blue-500 p-2 rounded-md">
          Create
        </button>
      </form>

      <ul>{response?.map((todo) => <li key={todo.id}>{todo.text}</li>)}</ul>
    </div>
  );
}
