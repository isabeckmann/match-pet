export interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat";
  breed: string;
  ageYears: number;
  size: "small" | "medium" | "large";
  gender: "male" | "female";
  temperament: string[];
  photoUrl: string;
  description: string;
  contactName: string;
  contactPhone: string;
  city: string;
}
export type Match = Pet & { remoteId: string | number };
