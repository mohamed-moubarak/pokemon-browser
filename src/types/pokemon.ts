export interface PokemonItem {
  id: number;
  name: string;
  image: string;
}

export interface BasicPokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<BasicPokemon>;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}
