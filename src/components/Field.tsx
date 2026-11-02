import type { ReactNode } from "react";

interface Props {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export default function Field({ id, label, error, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium">{label} <span aria-hidden="true">*</span></label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-sm font-medium text-primary-dark">{error}</p>}
    </div>
  );
}
