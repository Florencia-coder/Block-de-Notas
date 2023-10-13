import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export function useGetNotes() {
  return useQuery("notes", async () => {
    const response = await axios.get("http://localhost:5000/notes");
    return response.data;
  });
}

export function usePostNote() {
  const queryClient = useQueryClient();

  const postNoteMutation = useMutation(
    async ({ title, description, categories }) => {
      const response = await axios.post("http://localhost:5000/notes", {
        title,
        description,
        categories,
      });
      return response.data;
    }
  );

  const postNote = async ({ title, description, categories }) => {
    await postNoteMutation.mutateAsync({ title, description, categories });

    queryClient.invalidateQueries("notes");
    queryClient.invalidateQueries("categories");
  };

  return {
    postNote,
    isLoading: postNoteMutation.isLoading,
    isError: postNoteMutation.isError,
  };
}

export function usePutNote() {
  const queryClient = useQueryClient();

  const putNoteMutation = useMutation(
    async ({ id, title, description, archived }) => {
      const response = await axios.put(`http://localhost:5000/notes/${id}/`, {
        title,
        description,
        archived,
      });
      return response.data;
    }
  );

  const putNote = async ({ id, title, description, archived }) => {
    await putNoteMutation.mutateAsync({ id, title, description, archived });

    queryClient.invalidateQueries("notes");
  };

  return {
    putNote,
    isLoading: putNoteMutation.isLoading,
    isError: putNoteMutation.isError,
    refresh: putNoteMutation.reset,
  };
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation(async (noteId) => {
    const response = await axios.delete(
      `http://localhost:5000/notes/${noteId}`
    );
    return response.data;
  });

  const deleteNote = async (noteId) => {
    await deleteNoteMutation.mutateAsync(noteId);
    queryClient.invalidateQueries("notes");
  };

  return {
    deleteNote,
    isLoading: deleteNoteMutation.isLoading,
    isError: deleteNoteMutation.isError,
  };
}

export function useGetCategories() {
  return useQuery("categories", async () => {
    const response = await axios.get("http://localhost:5000/categories");
    return response.data;
  });
}

export function useGetNotesCategory() {
  const noteCategoryMutation = useMutation(async (id) => {
    const response = await axios.get(
      `http://localhost:5000/categories/${id}/notes/`
    );
    return response.data;
  });

  const noteCategory = async (id) => {
    return await noteCategoryMutation.mutateAsync(id);
  };

  return {
    noteCategory,
    isLoading: noteCategoryMutation.isLoading,
    isError: noteCategoryMutation.isError,
  };
}

export function usePostCategory() {
  const postCategoryMutation = useMutation(async ({ name }) => {
    const response = await axios.post("http://localhost:5000/categories", {
      name,
    });
    return response.data;
  });

  const postCategory = async ({ name }) => {
    await postCategoryMutation.mutateAsync({ name });
  };

  return {
    postCategory,
    isLoading: postCategoryMutation.isLoading,
    isError: postCategoryMutation.isError,
  };
}
