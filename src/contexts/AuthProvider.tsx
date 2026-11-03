import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { AuthContext } from "./authContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      }),
    [],
  );

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
