import { INFINITE_PAGE_SIZE } from 'constants/page-sizes';
import { PokemonListResponse } from 'types/pokemon';

import { artworkUrl, getIdFromUrl } from 'utils';

const getPokemonListQuery = async ({
  pageParam: page = 0,
}): Promise<{
  items: { id: number; name: string; image: string }[];
  nextOffset: number | null;
  total: number;
}> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${INFINITE_PAGE_SIZE}&offset=${page}`,
    { cache: 'no-store' }, // client side; you can also use default
  );
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  const data: PokemonListResponse = await res.json();

  const items = data.results.map((pokemon) => {
    const id = getIdFromUrl(pokemon.url);
    return { id, name: pokemon.name, image: artworkUrl(id) };
  });

  let nextOffset: number | null = null;
  if (data.next) {
    const url = new URL(data.next);
    nextOffset = Number(url.searchParams.get('offset') ?? '0');
  }

  return { items, nextOffset, total: data.count };
};

export default getPokemonListQuery;
