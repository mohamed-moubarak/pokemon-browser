import { BriefCard } from 'components';
import Link from 'next/link';
import { fetchPokemonList } from 'services/fetch-pokemon-list';

type PageProps = {
  page: number;
  limit: number;
};

const getId = (u: string) => Number(u.match(/\/pokemon\/(\d+)\/?$/)![1]);
const img = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const PaginatedList: React.FC<PageProps> = async ({ page, limit }) => {
  const { count, results, next, previous } = await fetchPokemonList(page, limit);
  const totalPages = Math.ceil(count / limit);
  const offset = (page - 1) * limit;

  const pokemonList = results?.map((pokemon) => {
    const id = getId(pokemon.url);

    return { id, name: pokemon.name, image: img(id) };
  });

  if (!pokemonList || pokemonList.length === 0) {
    return <p className="text-gray-500">No Pokémon found.</p>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 text-sm/6 text-center sm:text-left w-full">
        {pokemonList.map((pokemon, index) => (
          <li key={pokemon.name} className="text-gray-800 dark:text-gray-200">
            <BriefCard
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={pokemon.image}
              number={offset + index + 1}
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-between w-full mt-6">
        <Link
          href={`/pokemon-list/?page=${previous ? page - 1 : 1}&limit=${limit}`}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${!previous ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </Link>

        <div className="flex items-center space-x-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/pokemon-list/?page=${pageNum}&limit=${limit}`}
              className={`px-3 py-2 rounded ${
                page === pageNum
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {pageNum}
            </Link>
          ))}

          {totalPages > 5 && (
            <>
              <span className="text-gray-500">...</span>
              <Link
                href={`/pokemon-list/?page=${totalPages}&limit=${limit}`}
                className={`px-3 py-2 rounded ${
                  page === totalPages
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {totalPages}
              </Link>
            </>
          )}
        </div>
        <Link
          href={`/pokemon-list/?page=${next ? page + 1 : 1}&limit=${limit}`}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${!next ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Page {page} of {totalPages} ({limit} Pokémon shown)
      </p>
    </div>
  );
};

export default PaginatedList;
