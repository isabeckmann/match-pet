import axios from "axios";
import { API, getList, http } from "../lib/http";
import { createMyPet } from "./petsService";
import type { Match, Pet } from "../types/pet";
import type { PetFormData } from "../lib/schemas";

const cacheKey = (uid: string) => `matchpet:matches:${uid}`;

const read = (uid: string): Match[] => {
  try {
    return JSON.parse(localStorage.getItem(cacheKey(uid)) ?? "[]");
  } catch {
    return [];
  }
};
const write = (uid: string, m: Match[]) => localStorage.setItem(cacheKey(uid), JSON.stringify(m));

type MatchRecord = Omit<Match, "id" | "remoteId"> & { id: string; petId: string; userId: string };

export const matchedIds = (uid: string) => read(uid).map((m) => m.id);

// GET (só os matches deste usuário)
export async function getMatches(uid: string): Promise<Match[]> {
  const data = await getList<MatchRecord>(`${API}/matches`, { userId: uid });
  const matches: Match[] = data
    .filter((r) => r.userId === uid && r.petId) 
    .map(({ id, petId, userId: _u, ...pet }) => ({ ...pet, id: petId, remoteId: id }));
  write(uid, matches);
  return matches;
}

// POST
export async function addMatch(uid: string, pet: Pet): Promise<Match> {
  const { id: petId, ...rest } = pet;
  const { data } = await http.post(`${API}/matches`, { ...rest, petId, userId: uid });
  const match = { ...pet, remoteId: data.id };
  write(uid, [match, ...read(uid).filter((m) => m.id !== pet.id)]);
  return match;
}

// DELETE
export async function removeMatch(uid: string, match: Match): Promise<void> {
  try {
    await http.delete(`${API}/matches/${match.remoteId}`);
  } catch (e) {
    if (!(axios.isAxiosError(e) && e.response?.status === 404)) throw e;
  }
  write(uid, read(uid).filter((m) => m.id !== match.id));
}

// POST (cadastro de pet, vinculado ao usuário)
export const registerPet = (uid: string, form: PetFormData): Promise<Pet> => createMyPet(uid, form);