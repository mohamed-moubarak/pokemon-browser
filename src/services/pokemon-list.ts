import { PokemonListResponse } from 'types/pokemon';

export const getPokemonList = async (page: number, limit: number): Promise<PokemonListResponse> => {
  const offset = (page - 1) * limit;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }

  const data: PokemonListResponse = await response.json();

  return data;
};
