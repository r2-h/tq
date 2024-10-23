import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useTodoList = () => {
  const {
    data: response,
    error,
    isPending,
  } = useQuery({ ...todoListApi.getTodoList() });

  return { response, error, isPending };
};
