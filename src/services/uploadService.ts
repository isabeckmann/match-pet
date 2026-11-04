import api from "../lib/axios";
import type { UploadResponse } from "../types/upload.ts";

export async function uploadFoto(foto: File): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("foto", foto);

  const response = await api.post<UploadResponse>(
    "/upload/foto",
    formData
  );

  return response.data;
}