import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import { AlertIcon, LockIcon } from "../components/icons";
import { resetPasswordSchema, type ResetPasswordData } from "../lib/authSchemas";
import { btnPrimary, inputCls } from "../lib/styles";
import { authError, checkResetCode, confirmReset } from "../services/authService";

type Status = "checking" | "ready" | "done" | "invalid";

// Página aberta pelo link do e-mail do Firebase (?mode=resetPassword&oobCode=...)
export default function ResetPassword() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  // Lê o código uma única vez; depois ele é removido da URL
  const [code] = useState(() => {
    const p = new URLSearchParams(search);
    return p.get("mode") === "resetPassword" ? p.get("oobCode") : null;
  });
  const [status, setStatus] = useState<Status>(code ? "checking" : "invalid");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    // O código é uma credencial: tira da barra de endereço e do histórico
    if (search) navigate(pathname, { replace: true });
    if (!code) return;
    checkResetCode(code)
      .then((mail) => {
        setEmail(mail);
        setStatus("ready");
      })
      .catch((e) => {
        setError(authError(e));
        setStatus("invalid");
      });
    // roda só na abertura da página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const props = (k: keyof ResetPasswordData) => ({
    id: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    ...register(k),
  });

  const onSubmit = async (d: ResetPasswordData) => {
    if (!code) return;
    setError("");
    try {
      await confirmReset(code, d.password);
      setStatus("done");
    } catch (e) {
      setError(authError(e));
      if (["auth/expired-action-code", "auth/invalid-action-code"].some((c) => String(e).includes(c))) setStatus("invalid");
    }
  };

  if (status === "checking") {
    return (
      <AuthLayout title="Redefinir senha">
        <p role="status">Verificando o link...</p>
      </AuthLayout>
    );
  }

  if (status === "invalid") {
    return (
      <AuthLayout title="Link inválido">
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-primary bg-primary/10 p-3 text-ink">
          <span className="mt-0.5 text-primary-dark"><AlertIcon /></span>
          <p>{error || "Este link de redefinição é inválido ou já foi usado. Peça um novo na tela de login."}</p>
        </div>
        <Link to="/login" className={`${btnPrimary} block text-center`}>Voltar para o login</Link>
      </AuthLayout>
    );
  }

  if (status === "done") {
    return (
      <AuthLayout title="Senha alterada">
        <p role="status" className="rounded-xl bg-tag/30 p-3 font-medium">Pronto! Sua senha foi redefinida. Entre com a nova senha.</p>
        <Link to="/login" className={`${btnPrimary} block text-center`}>Ir para o login</Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Criar nova senha">
      <p>Defina uma nova senha para <strong>{email}</strong>.</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Field id="password" label="Nova senha (mín. 8 caracteres, com letra e número)" icon={<LockIcon />} error={errors.password?.message}>
          <input {...props("password")} type="password" autoComplete="new-password" className={inputCls} />
        </Field>
        <Field id="confirm" label="Confirmar nova senha" icon={<LockIcon />} error={errors.confirm?.message}>
          <input {...props("confirm")} type="password" autoComplete="new-password" className={inputCls} />
        </Field>
        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-primary bg-primary/10 p-3 text-ink">
            <span className="mt-0.5 text-primary-dark"><AlertIcon /></span>
            <p>{error}</p>
          </div>
        )}
        <button type="submit" disabled={isSubmitting} className={btnPrimary}>{isSubmitting ? "Salvando..." : "Salvar nova senha"}</button>
      </form>
    </AuthLayout>
  );
}
