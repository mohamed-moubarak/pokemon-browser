interface Ability {
  name: string;
  url: string;
}

interface AbilityEntry {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other?: {
    ['official-artwork']?: {
      front_default: string | null;
    };
  };
}

interface Stat {
  name: string;
  url: string;
}

interface StatEntry {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface Type {
  name: string;
  url: string;
}

interface TypeEntry {
  slot: number;
  type: Type;
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  stats: StatEntry[];
  abilities: AbilityEntry[];
  sprites: Sprites;
  types: TypeEntry[];
}

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
