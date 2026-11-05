import { useCallback, useEffect, useState } from "react";
import { friendlyError } from "../lib/http";
import { getPets } from "../services/petsService";
import type { Pet } from "../types/pet";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setPets(await getPets());
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Carrega os pets inicialmente
    load();

    // Atualiza a lista quando um novo pet é cadastrado
    window.addEventListener("matchpet:pets-updated", load);

    return () => {
      window.removeEventListener("matchpet:pets-updated", load);
    };
  }, [load]);

  return { pets, loading, error, retry: load };
}