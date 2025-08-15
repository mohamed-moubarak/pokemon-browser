import PaginatedList from 'pages/paginated-list';
import { Suspense } from 'react';
import { fetchPokemonList } from 'services/fetch-pokemon-list';

type PageProps = {
  searchParams?: { limit?: string; page?: string };
};

const PokemonListPaginatedPage: React.FC<PageProps> = async ({ searchParams }) => {
  const page = Number(searchParams?.page ?? 1);
  const limit = Number(searchParams?.limit ?? 20);

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-6 gap-5 ">
      <header className="flex flex-col gap-3 justify-center items-center w-full">
        <h1 className="text-3xl font-bold">Pokédex</h1>

        <p className="text-sm text-gray-500">Discover and explore Pokémon with </p>
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Suspense fallback={<p className="text-gray-500">Loading Pokémon...</p>}>
          <PaginatedList page={page} limit={limit} />
        </Suspense>
      </main>
    </div>
  );
};

export default PokemonListPaginatedPage;
