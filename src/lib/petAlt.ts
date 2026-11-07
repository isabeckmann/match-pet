import type { Pet } from "../types/pet";

export function petPhotoAlt(pet: Pick<Pet, "name" | "species" | "breed">): string {
  const species = pet.species === "dog" ? "cachorro" : "gato";
  const breed = pet.breed?.trim();
  const breedText = !breed || /^srd$/i.test(breed) ? "sem raça definida" : `da raça ${breed}`;
  return `Foto de ${pet.name}, ${species} ${breedText}`;
}