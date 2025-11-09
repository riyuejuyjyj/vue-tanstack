import { fetchBooks } from "@/api/book";
import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query";

export function useFetchBooks() {
  const {
    isLoading,
    isError,
    data: books,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5,
  });

  return {
    isLoading,
    isError,
    books,
    error,
    isFetching,
  };
}

export function createBooks() {
  const queryClient = useQueryClient();
  const {} = useMutation({});
}
