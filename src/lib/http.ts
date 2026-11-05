import axios from "axios";

export const http = axios.create({ timeout: 10000 });
export const API = (import.meta.env.VITE_MOCKAPI_URL as string).replace(/\/+$/, "");
export async function getList<T>(url: string, params: Record<string, string>): Promise<T[]> {
  try {
    return (await http.get<T[]>(url, { params })).data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) return [];
    throw e;
  }
}

export function friendlyError(e: unknown): string {
  if (axios.isAxiosError(e)) {
    if (!e.response) return "Sem conexão com o servidor. Verifique sua internet.";
    const messages: Record<number, string> = {
      400: "Requisição inválida (400).",
      401: "Chave da API inválida ou ausente (401).",
      404: "Recurso não encontrado (404).",
      429: "Muitas requisições (429). Aguarde um instante e tente de novo.",
    };
    if (messages[e.response.status]) return messages[e.response.status];
    if (e.response.status >= 500) return "O servidor está com problemas (500). Tente mais tarde.";
  }
  return "Erro inesperado. Tente novamente.";
}