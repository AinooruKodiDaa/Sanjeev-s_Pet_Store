import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import axios from "axios";
import { Pet } from "../types/petsTypes";

export const fetchPetsApi = async () =>
  await axios.get("http://localhost:3001/pets?_embed=state&_embed=category");

export const addPetApi = async (pet: any) =>
  await axios.post("http://localhost:3001/pets", pet);

export const editPetApi = async (petId: any, payload: Omit<Pet, "state">) =>
    await axios.put(`http://localhost:3001/pets/${petId}`, payload);

export const deletePetApi = async (petId: string) =>
  await axios.delete(`http://localhost:3001/pets/${petId}`);
