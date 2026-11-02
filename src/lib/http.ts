import axios from "axios";

export const http = axios.create({ timeout: 10000 });

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
