import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { friendlyError } from "../lib/http";
import { getPets } from "../services/petsService";
import type { Pet } from "../types/pet";

export function usePets() {
  const { user } = useAuth();
  const uid = user?.uid ?? "";
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setPets(await getPets(uid));
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    load();

    window.addEventListener("matchpet:pets-updated", load);

    return () => {
      window.removeEventListener("matchpet:pets-updated", load);
    };
  }, [load]);

  return { pets, loading, error, retry: load };
}
