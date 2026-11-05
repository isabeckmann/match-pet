import { http } from "../lib/http";
import type { Pet } from "../types/pet";

interface Breed {
  id: number | string;
  name: string;
  temperament?: string;
  bred_for?: string;
  description?: string;
  weight?: { metric: string };
  reference_image_id?: string;
  city: string;
  gender?: "male" | "female";
}

const NAMES = ["Thor", "Luna", "Mel", "Bob", "Nina", "Pipoca", "Mike", "Lola", "Bela", "Simba", "Amora", "Fred"];
const CITIES = ["Santa Maria", "Porto Alegre", "Pelotas", "Caxias do Sul", "Canoas", "Passo Fundo"];
const PEOPLE = ["Ana Souza", "Carlos Lima", "Marina Reis", "João Pires"];
const KEY = "matchpet:myPets";

const dogKey = import.meta.env.VITE_DOG_API_KEY as string | undefined;
const catKey = import.meta.env.VITE_CAT_API_KEY as string | undefined;

const sizeOf = (w = ""): Pet["size"] => {
  const n = parseFloat(w);
  return n < 10 ? "small" : n < 25 ? "medium" : "large";
};

function toPet(b: Breed, species: Pet["species"], i: number): Pet {
  const n = i + (species === "cat" ? 5 : 0);
  return {
    id: `${species}-${b.id}`,
    name: NAMES[n % NAMES.length],
    species,
    breed: b.name,
    gender: n % 2 === 0 ? "male" : "female",
    ageYears: (n * 3) % 12,
    size: sizeOf(b.weight?.metric),
    temperament: (b.temperament ?? "Dócil, Carinhoso").split(",").map((t) => t.trim()).slice(0, 4),
    photoUrl: `https://cdn2.the${species}api.com/images/${b.reference_image_id}.jpg`,
    description: b.description ?? b.bred_for ?? "Um companheiro cheio de energia esperando por um lar.",
    contactName: PEOPLE[n % PEOPLE.length],
    contactPhone: `(55) 99${String(100 + n).padStart(3, "0")}-${String(1000 + n * 7)}`,
    city: CITIES[n % CITIES.length] || b.city,
  };
}

export function getMyPets(): Pet[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveMyPet(pet: Pet) {
  localStorage.setItem(KEY, JSON.stringify([pet, ...getMyPets()]));

  // Avisa que a lista de pets foi atualizada
  window.dispatchEvent(new Event("matchpet:pets-updated"));
}

export async function getPets(): Promise<Pet[]> {
  const [dogs, cats] = await Promise.all([
    http.get<Breed[]>("https://api.thedogapi.com/v1/breeds", {
      params: { limit: 12 },
      headers: dogKey ? { "x-api-key": dogKey } : {},
    }),
    http.get<Breed[]>("https://api.thecatapi.com/v1/breeds", {
      params: { limit: 12 },
      headers: catKey ? { "x-api-key": catKey } : {},
    }),
  ]);
  const fromApi = (list: Breed[], s: Pet["species"]) =>
    list.filter((b) => b.reference_image_id).map((b, i) => toPet(b, s, i));
  const d = fromApi(dogs.data, "dog");
  const c = fromApi(cats.data, "cat");
  const mixed = Array.from({ length: Math.max(d.length, c.length) }, (_, i) => [d[i], c[i]])
    .flat()
    .filter(Boolean);
  return [...getMyPets(), ...mixed];
}
