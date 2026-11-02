import axios from "axios";
import { http } from "../lib/http";
import { getMyPets, saveMyPet } from "./petsService";
import type { Match, Pet } from "../types/pet";
import type { PetFormData } from "../lib/schemas";

const API = import.meta.env.VITE_MOCKAPI_URL as string;
const KEY = "matchpet:matches";

const read = (): Match[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
};
const write = (m: Match[]) => localStorage.setItem(KEY, JSON.stringify(m));

export const matchedIds = () => read().map((m) => m.id);

// GET
export async function getMatches(): Promise<Match[]> {
  await http.get(`${API}/matches`, { params: { limit: 1 } });
  return read();
}

// POST
export async function addMatch(pet: Pet): Promise<Match> {
  const { data } = await http.post(`${API}/matches`, {
    petId: pet.id,
    name: pet.name,
    breed: pet.breed,
  });
  const match = { ...pet, remoteId: data.id };
  write([match, ...read().filter((m) => m.id !== pet.id)]);
  return match;
}

// DELETE
export async function removeMatch(match: Match): Promise<void> {
  try {
    await http.delete(`${API}/matches/${match.remoteId}`);
  } catch (e) {
    if (!(axios.isAxiosError(e) && e.response?.status === 404)) throw e;
  }
  write(read().filter((m) => m.id !== match.id));
}

// POST (cadastro de pet)
export async function registerPet(form: PetFormData): Promise<Pet> {
  const { data } = await http.post(`${API}/pets`, form);
  const pet: Pet = {
    ...form,
    id: `api-${data.id ?? Date.now()}`,
    ageYears: Number(form.ageYears),
    temperament: ["Novo por aqui"],
    city: "Santa Maria",
  };
  saveMyPet(pet);
  return pet;
}
export { getMyPets };