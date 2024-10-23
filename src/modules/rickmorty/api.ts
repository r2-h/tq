import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { rickmortyApiInstance } from "../../shared/api/rickmorty-api-instance";

type InfoDto = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

type OriginOrLocationDto = {
  name: string;
  url: string;
};

export type CharacterDto = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginOrLocationDto;
  location: OriginOrLocationDto;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type ResponseDto = {
  info: InfoDto;
  results: CharacterDto[];
};

export const rickmortyApi = {
  getCharacters: (page: number) => {
    return queryOptions({
      queryKey: ["characters", "charactersList", { page }],
      queryFn: async ({ signal }) => {
        return rickmortyApiInstance<ResponseDto>(`/character/?page=${page}`, {
          signal,
        });
      },
      placeholderData: keepPreviousData,
    });
  },

  getCharacter: async (id: string) => {
    return rickmortyApiInstance<CharacterDto>(`/character/${id}`);
  },
};
