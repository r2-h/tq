import { useVirtualizedTodoList } from "./useVirtualizedTodoList";

export const TodoListVirtualized = () => {
  const { cursorJsx, response, error, isPending } = useVirtualizedTodoList();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-10 ">
      <h1 className="font-bold text-3xl underline mb-10 text-center">Tasks</h1>

      <ul className="flex flex-col gap-5">
        {response?.map((todo) => <li key={todo?.id}>{todo?.text}</li>)}
      </ul>
      {cursorJsx}
    </div>
  );
};
