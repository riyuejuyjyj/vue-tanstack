import { fetchTodos } from "@/api/todo";
import { useQuery } from "@tanstack/vue-query";

export function useTodos() {
  const {
    isLoading,
    isError,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos"], // 查询键
    queryFn: fetchTodos, // 使用我们封装的 API 函数
    staleTime: 1000 * 60 * 5,
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  return {
    isLoading,
    isError,
    todos,
    error,
    isFetching,
  };
}
