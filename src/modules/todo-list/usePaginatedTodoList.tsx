import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const usePaginatedTodoList = (page: number) => {
  const {
    data: response,
    error,
    isPending,
    isPlaceholderData,
  } = useQuery({ ...todoListApi.getPaginatedTodoList(page) });

  return { response, error, isPending, isPlaceholderData };
};
