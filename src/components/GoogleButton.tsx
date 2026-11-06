import { useState } from "react";
import { authError, loginWithGoogle } from "../services/authService";
import { GoogleIcon } from "./icons";

export default function GoogleButton({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState("");
  const click = async () => {
    setError("");
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (e) {
      setError(authError(e));
    }
  };
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={click}
        className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-ink bg-white px-6 py-3 text-lg font-semibold text-ink hover:bg-cream"
      >
        <GoogleIcon /> Continuar com Google
      </button>
      {error && (
        <p role="alert" className="font-medium text-primary-dark">
          {error}
        </p>
      )}
    </div>
  );
}
