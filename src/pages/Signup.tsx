import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import GoogleButton from "../components/GoogleButton";
import { AlertIcon, LockIcon, MailIcon, UserIcon } from "../components/icons";
import { useAuth } from "../hooks/useAuth";
import { signupSchema, type SignupData } from "../lib/authSchemas";
import { btnPrimary, inputCls } from "../lib/styles";
import { authError, signup } from "../services/authService";

export default function Signup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  if (user) return <Navigate to="/" replace />;

  const props = (k: keyof SignupData) => ({
    id: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    ...register(k),
  });

  const onSubmit = async (d: SignupData) => {
    setError("");
    try {
      await signup(d.name, d.email, d.password);
      navigate("/", { replace: true });
    } catch (e) {
      setError(authError(e));
    }
  };

  return (
    <AuthLayout title="Criar sua conta">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <Field
          id="name"
          label="Nome"
          icon={<UserIcon />}
          error={errors.name?.message}
        >
          <input {...props("name")} autoComplete="name" className={inputCls} />
        </Field>
        <Field
          id="email"
          label="E-mail"
          icon={<MailIcon />}
          error={errors.email?.message}
        >
          <input
            {...props("email")}
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            className={inputCls}
          />
        </Field>
        <Field
          id="password"
          label="Senha (mín. 6 caracteres)"
          icon={<LockIcon />}
          error={errors.password?.message}
        >
          <input
            {...props("password")}
            type="password"
            autoComplete="new-password"
            className={inputCls}
          />
        </Field>
        <Field
          id="confirm"
          label="Confirmar senha"
          icon={<LockIcon />}
          error={errors.confirm?.message}
        >
          <input
            {...props("confirm")}
            type="password"
            autoComplete="new-password"
            className={inputCls}
          />
        </Field>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-primary bg-primary/10 p-3 text-ink"
          >
            <span className="mt-0.5 text-primary-dark">
              <AlertIcon />
            </span>
            <p>{error}</p>
          </div>
        )}
        <button type="submit" disabled={isSubmitting} className={btnPrimary}>
          {isSubmitting ? "Criando..." : "Criar conta"}
        </button>
      </form>
      <GoogleButton onSuccess={() => navigate("/", { replace: true })} />
      <p className="text-center">
        Já tem conta?{" "}
        <Link to="/login" className="-my-2 inline-block py-2 font-bold underline">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
