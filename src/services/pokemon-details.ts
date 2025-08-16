import { Pokemon } from 'types/pokemon';

const getPokemon = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon');
  }

  const data: Pokemon = await response.json();

  return data;
};

export default getPokemon;
