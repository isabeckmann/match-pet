import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import GoogleButton from "../components/GoogleButton";
import { AlertIcon, LockIcon, MailIcon } from "../components/icons";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginData } from "../lib/authSchemas";
import { btnPrimary, inputCls } from "../lib/styles";
import { authError, login, resetPassword } from "../services/authService";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? "/";
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  if (user) return <Navigate to={from} replace />;

  const props = (k: keyof LoginData) => ({
    id: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    ...register(k),
  });

  const onSubmit = async (d: LoginData) => {
    setError("");
    setInfo("");
    try {
      await login(d.email, d.password);
      navigate(from, { replace: true });
    } catch (e) {
      setError(authError(e));
    }
  };

  const forgot = async () => {
    setError("");
    setInfo("");
    const email = getValues("email");
    if (!loginSchema.shape.email.safeParse(email).success) {
      setError("Digite seu e-mail no campo acima para receber o link de redefinição.");
      return;
    }
    try {
      await resetPassword(email);
      setInfo("Enviamos um link de redefinição para o seu e-mail. Confira também o spam.");
    } catch (e) {
      setError(authError(e));
    }
  };

  return (
    <AuthLayout title="Entrar na sua conta">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Field id="email" label="E-mail" icon={<MailIcon />} error={errors.email?.message}>
          <input {...props("email")} type="email" autoComplete="email" placeholder="voce@email.com" className={inputCls} />
        </Field>
        <Field id="password" label="Senha" icon={<LockIcon />} error={errors.password?.message}>
          <input {...props("password")} type="password" autoComplete="current-password" className={inputCls} />
        </Field>
        <button type="button" onClick={forgot} className="self-end font-medium text-ink underline">Esqueceu a senha?</button>
        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-primary bg-primary/10 p-3 text-ink">
            <span className="mt-0.5 text-primary-dark"><AlertIcon /></span>
            <p>{error}</p>
          </div>
        )}
        {info && <p role="status" className="rounded-xl bg-tag/30 p-3 font-medium">{info}</p>}
        <button type="submit" disabled={isSubmitting} className={btnPrimary}>{isSubmitting ? "Entrando..." : "Entrar"}</button>
      </form>
      <GoogleButton onSuccess={() => navigate(from, { replace: true })} />
      <p className="text-center">Ainda não tem conta? <Link to="/criar-conta" className="font-bold underline">Criar conta</Link></p>
    </AuthLayout>
  );
}
