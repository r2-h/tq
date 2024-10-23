import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { usePaginatedTodoList } from "../modules/todo-list/usePaginatedTodoList";

type PageParams = {
  page: number;
};

export const Route = createFileRoute("/paginated")({
  component: TodoListPaginated,
  validateSearch: (search: Record<string, unknown>): PageParams => {
    return {
      page: Number(search?.page ?? 1),
    };
  },
});

function TodoListPaginated() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { page } = Route.useSearch();
  const { response, error, isPending, isPlaceholderData } =
    usePaginatedTodoList(Number(page));

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-10 ">
      <h1 className="font-bold text-3xl underline mb-10 text-center">Tasks</h1>
      <ul
        className={`flex flex-col gap-5 ${
          isPlaceholderData ? "opacity-30" : ""
        }`}
      >
        {response?.data.map((todo) => <li key={todo.id}>{todo.text}</li>)}
      </ul>

      <div className="flex gap-10 mt-10">
        <button
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }),
            })
          }
          className="shadow-md "
        >
          Previous
        </button>
        <button
          onClick={() =>
            navigate({
              search: (prev) => ({
                ...prev,
                page: Math.min(prev.page + 1, response?.last || 100),
              }),
            })
          }
          className="shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
