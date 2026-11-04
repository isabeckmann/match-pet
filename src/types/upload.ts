export interface UploadResponse {
  mensagem: string;
  arquivo: {
    nome: string;
    caminho: string;
    tamanho: number;
  };
}