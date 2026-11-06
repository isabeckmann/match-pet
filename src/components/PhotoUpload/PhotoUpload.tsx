import { useEffect, useState } from "react";
import { uploadFoto } from "../../services/uploadService";

interface PhotoUploadProps {
  onUpload: (url: string) => void;
}

export default function PhotoUpload({ onUpload }: PhotoUploadProps) {
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [enviada, setEnviada] = useState(false);
  const [mensagem, setMensagem] = useState<{
    ok: boolean;
    texto: string;
  } | null>(null);

  // Libera a memória do preview anterior ao trocar de foto ou desmontar
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function selecionarFoto(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(arquivo.type)) {
      setMensagem({
        ok: false,
        texto: "Formato inválido. Use JPG, PNG ou WEBP.",
      });
      event.target.value = "";
      return;
    }

    if (arquivo.size > 5 * 1024 * 1024) {
      setMensagem({ ok: false, texto: "A imagem deve ter no máximo 5 MB." });
      event.target.value = "";
      return;
    }

    setFoto(arquivo);
    setPreview(URL.createObjectURL(arquivo));
    setEnviada(false);
    setMensagem(null);
  }

  async function enviarFoto() {
    if (!foto) {
      setMensagem({ ok: false, texto: "Selecione uma foto." });
      return;
    }

    try {
      setCarregando(true);
      setMensagem(null);

      const url = await uploadFoto(foto);

      onUpload(url);
      setEnviada(true);
      setMensagem({ ok: true, texto: "Foto enviada com sucesso!" });
    } catch (error) {
      setMensagem({
        ok: false,
        texto: "Erro ao enviar a foto. Tente novamente.",
      });
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          id="foto"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={selecionarFoto}
          aria-describedby="foto-dica"
          className="peer sr-only"
        />

        <label
          htmlFor="foto"
          className="grid min-h-44 cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-ink/40 bg-white text-center transition-colors hover:border-primary-dark peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
        >
          {preview ? (
            <span className="relative block w-full">
              <img
                src={preview}
                alt="Prévia da foto selecionada"
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                Trocar foto
              </span>
            </span>
          ) : (
            <span className="flex flex-col items-center gap-1 p-6">
              <span aria-hidden="true" className="text-4xl">
                📷
              </span>
              <span className="font-bold">Toque para escolher uma foto</span>
              <span id="foto-dica" className="text-sm opacity-80">
                JPG, PNG ou WEBP, até 5 MB. Uma foto nítida e bem iluminada
                aumenta as chances de adoção.
              </span>
            </span>
          )}
        </label>
      </div>

      {foto && (
        <p className="truncate text-sm opacity-80">
          {foto.name} · {(foto.size / 1024 / 1024).toFixed(1)} MB
        </p>
      )}

      <button
        type="button"
        onClick={enviarFoto}
        disabled={!foto || carregando || enviada}
        className="min-h-12 self-start rounded-full bg-primary-dark px-6 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        {carregando
          ? "Enviando..."
          : enviada
            ? "Foto enviada ✓"
            : "Enviar foto"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={
          mensagem
            ? `rounded-lg p-3 text-sm font-semibold ${mensagem.ok ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`
            : "sr-only"
        }
      >
        {mensagem?.texto}
      </p>
    </div>
  );
}
