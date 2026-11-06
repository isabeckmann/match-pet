import type { ReactNode } from "react";

interface Props {
  id: string;
  label: string;
  error?: string;
  icon?: ReactNode;
  required?: boolean; // padrão: obrigatório (mostra *)
  children: ReactNode;
}

export default function Field({
  id,
  label,
  error,
  icon,
  required = true,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/70">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm font-medium text-primary-dark"
        >
          {error}
        </p>
      )}
    </div>
  );
}
