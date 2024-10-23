import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "../../shared/useIntersection";
import { todoListApi } from "./api";

export const useVirtualizedTodoList = () => {
  const {
    data: response,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({ ...todoListApi.getInfinityTodoList() });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursorJsx = (
    <div ref={cursorRef}>
      {!hasNextPage && <div>больше нет данных</div>}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );
  return { cursorJsx, response, error, isPending };
};
