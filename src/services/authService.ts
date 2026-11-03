import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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
export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);
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
    };
    return m[e.code] ?? `Erro de autenticação (${e.code}).`;
  }
  return "Erro inesperado. Tente novamente.";
}
