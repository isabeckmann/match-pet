import { useEffect, useId, useRef, type ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode; // botões extras (ex.: confirmar), exibidos antes do botão de fechar
  closeLabel?: string; // texto do botão de fechar (padrão: "Fechar")
  closeClassName?: string; // estilo do botão de fechar (padrão: vermelho)
}

// <dialog> nativo: já prende o foco e fecha com Esc
export default function Modal({ open, title, onClose, children, actions, closeLabel = "Fechar", closeClassName = "bg-primary-dark text-white" }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId(); // id único: a tela de Matches tem mais de um Modal
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby={titleId} className="m-auto w-[90%] max-w-md rounded-2xl p-6 text-ink backdrop:bg-black/50">
      <h2 id={titleId} className="mb-3 text-xl font-bold">{title}</h2>
      {children}
      <div className="mt-5 flex flex-wrap justify-end gap-3">
        {actions}
        <button type="button" onClick={onClose} className={`rounded-full px-5 py-2 font-medium ${closeClassName}`}>
          {closeLabel}
        </button>
      </div>
    </dialog>
  );
}
