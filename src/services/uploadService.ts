export async function uploadFoto(foto: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Configurações do Cloudinary não encontradas.");
  }

  // Verifica se o arquivo é uma imagem
  if (!foto.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem válido.");
  }

  // Limita o tamanho da imagem a 5 MB
  if (foto.size > 5 * 1024 * 1024) {
    throw new Error("A imagem deve ter no máximo 5 MB.");
  }

  const formData = new FormData();

  formData.append("file", foto);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "matchpet/pets");

  const resposta = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.error?.message || "Não foi possível enviar a imagem.",
    );
  }

  return dados.secure_url;
}
