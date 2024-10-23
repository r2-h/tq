import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { FormEvent } from "react";
import { queryClient } from "../../shared/api/query-client";
import { todoListApi } from "./api";

export const useCreateTodoHandler = () => {
  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    createTodoMutation.mutate({
      id: nanoid(),
      done: false,
      text: String(data.text),
      userId: "1",
    });

    e.currentTarget.reset();
  };

  return { onSubmit };
};
