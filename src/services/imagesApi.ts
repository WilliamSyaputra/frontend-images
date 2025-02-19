const API_URL = "http://localhost:3001/api/v1";

type ApiResponse<T> = Promise<T>;

export const getImages = async (): ApiResponse<string[]> => {
  const response = await fetch(`http://localhost:3001/api/v1/images`);
  return response.json();
};

export const uploadImage = async (
  file: File
): ApiResponse<{ message: string; filename: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const deleteImage = async (
  name: string
): ApiResponse<{ message: string }> => {
  const response = await fetch(`${API_URL}/images/${name}`, {
    method: "DELETE",
  });

  return response.json();
};
