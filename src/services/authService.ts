import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../lib/firebase";

export async function signup(name: string, email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  return user;
}

export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

// Envia o e-mail de redefinição. Se o e-mail não existir, não revelamos isso
// (evita descobrir quais e-mails têm conta): a tela mostra a mesma mensagem.
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    if (e instanceof FirebaseError && e.code === "auth/user-not-found") return;
    throw e;
  }
}

// Confere o código do link (sem consumir) e devolve o e-mail da conta
export const checkResetCode = (code: string) => verifyPasswordResetCode(auth, code);

// Define a nova senha com o código do link (uso único, expira em 1h)
export const confirmReset = (code: string, newPassword: string) => confirmPasswordReset(auth, code, newPassword);

export const logout = () => signOut(auth);

export function authError(e: unknown): string {
  if (e instanceof FirebaseError) {
    const m: Record<string, string> = {
      "auth/email-already-in-use": "Este e-mail já está cadastrado.",
      "auth/invalid-credential": "E-mail ou senha incorretos.",
      "auth/user-not-found": "E-mail ou senha incorretos.",
      "auth/wrong-password": "E-mail ou senha incorretos.",
      "auth/weak-password": "A senha é muito fraca (mínimo 6 caracteres).",
      "auth/too-many-requests": "Muitas tentativas. Aguarde um pouco e tente de novo.",
      "auth/network-request-failed": "Sem conexão com a internet.",
      "auth/popup-closed-by-user": "Login com Google cancelado.",
      "auth/unauthorized-domain": "Domínio não autorizado no Firebase (veja Authorized domains).",
      "auth/operation-not-allowed": "Este método de login não está ativado no Firebase.",
      "auth/expired-action-code": "Este link expirou. Peça um novo link de redefinição.",
      "auth/invalid-action-code": "Link inválido ou já utilizado. Peça um novo link de redefinição.",
      "auth/user-disabled": "Esta conta está desativada.",
    };
    return m[e.code] ?? `Erro de autenticação (${e.code}).`;
  }
  return "Erro inesperado. Tente novamente.";
}
