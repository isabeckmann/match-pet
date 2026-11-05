import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import { AlertIcon, LockIcon } from "../components/icons";
import { useAuth } from "../hooks/useAuth";
import { changePasswordSchema, type ChangePasswordData } from "../lib/authSchemas";
import { btnPrimary, inputCls } from "../lib/styles";
import { authError, changePassword, hasPasswordLogin } from "../services/authService";

export default function ChangePassword() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const props = (k: keyof ChangePasswordData) => ({
    id: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    ...register(k),
  });

  // Conta criada com Google: a senha é gerenciada pela Google
  if (user && !hasPasswordLogin(user)) {
    return (
      <AuthLayout title="Alterar senha">
        <p>Sua conta usa o login com Google, então a senha é gerenciada pela sua conta Google.</p>
      </AuthLayout>
    );
  }

  const onSubmit = async (d: ChangePasswordData) => {
    setError("");
    setInfo("");
    try {
      await changePassword(d.current, d.password);
      reset();
      setInfo("Senha alterada com sucesso.");
    } catch (e) {
      const wrong = e instanceof FirebaseError && ["auth/invalid-credential", "auth/wrong-password"].includes(e.code);
      setError(wrong ? "Senha atual incorreta." : authError(e));
    }
  };

  return (
    <AuthLayout title="Alterar senha">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Field id="current" label="Senha atual" icon={<LockIcon />} error={errors.current?.message}>
          <input {...props("current")} type="password" autoComplete="current-password" className={inputCls} />
        </Field>
        <Field id="password" label="Nova senha (mÃ­n. 8 caracteres, com letra e nÃºmero)" icon={<LockIcon />} error={errors.password?.message}>
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
        {info && <p role="status" className="rounded-xl bg-tag/30 p-3 font-medium">{info}</p>}
        <button type="submit" disabled={isSubmitting} className={btnPrimary}>{isSubmitting ? "Salvando..." : "Alterar senha"}</button>
      </form>
    </AuthLayout>
  );
}
