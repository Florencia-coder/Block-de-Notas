import { PORT } from "./constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export function useGetNotes() {
  return useQuery("notes", async () => {
    const response = await axios.get(`${PORT}/notes`);
    return response.data;
  });
}

export function usePostNote() {
  const queryClient = useQueryClient();

  const postNoteMutation = useMutation(
    async ({ title, description, category }) => {
      const response = await axios.post(`${PORT}/notes`, {
        title,
        description,
        category,
      });
      return response.data;
    }
  );

  const postNote = async ({ title, description, category }) => {
    await postNoteMutation.mutateAsync({ title, description, category });

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
    async ({ id, title, description, archived, category }) => {
      const response = await axios.put(`${PORT}/notes/${id}/`, {
        title,
        description,
        archived,
        category,
      });
      return response.data;
    }
  );

  const putNote = async ({ id, title, description, archived, category }) => {
    await putNoteMutation.mutateAsync({
      id,
      title,
      description,
      archived,
      category,
    });

    queryClient.invalidateQueries("notes");
  };

  return {
    putNote,
    isLoading: putNoteMutation.isLoading,
    isError: putNoteMutation.isError,
    refresh: putNoteMutation.reset,
  };
}

export function usePatchNote() {
  const queryClient = useQueryClient();
  const patchNoteMutation = useMutation(async ({ id, archived }) => {
    const response = await axios.patch(`${PORT}/notes/${id}/`, {
      archived,
    });
    return response.data;
  });

  const patchNote = async ({ id, archived }) => {
    await patchNoteMutation.mutateAsync({
      id,
      archived,
    });
    queryClient.invalidateQueries("notes");
  };

  return {
    patchNote,
    isLoading: patchNoteMutation.isLoading,
    isError: patchNoteMutation.isError,
    refresh: patchNoteMutation.reset,
  };
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation(async (noteId) => {
    const response = await axios.delete(`${PORT}/notes/${noteId}`);
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
    const response = await axios.get(`${PORT}/categories`);
    return response.data;
  });
}

export function useGetCategoryById() {
  const categoryByIdMutation = useMutation(async (id) => {
    const response = await axios.get(`${PORT}/categories/${id}`);
    return response.data;
  });

  const getCategoryById = async (id) => {
    return await categoryByIdMutation.mutateAsync(id);
  };

  return {
    getCategoryById,
    isLoading: categoryByIdMutation.isLoading,
    isError: categoryByIdMutation.isError,
  };
}

export function useGetNotesCategory() {
  const noteCategoryMutation = useMutation(async (id) => {
    const response = await axios.get(`${PORT}/categories/${id}/notes/`);
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
