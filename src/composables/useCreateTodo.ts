import { createTodo, type Todo } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  const {
    mutate, // 触发 mutation 的函数
    isPending, // 是否正在进行
    isError,
    error,
  } = useMutation({
    mutationFn: (newTodo: Todo) => createTodo(newTodo),
    onSuccess: () => {
      //// 核心：让 'todos' 列表的缓存失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      alert("添加成功");
    },

    onError: (error) => {
      alert(`${error}`);
    },
  });

  return {
    createTodo: mutate, // 重命名，语义更清晰
    isCreating: isPending, // 重命名
    isError,
    error,
  };
}
