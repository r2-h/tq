import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  /*  кешировать запросы при пагинации */
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000, // 1 мин
    },
  },
});
