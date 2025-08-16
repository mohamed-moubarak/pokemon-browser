import { Suspense } from 'react';
import PaginatedList from 'pages/paginated-list/paginated-list';
import PaginatedGridSkeleton from 'components/PokemonGridSkeleton/pokemon-grid.skeleton';
import Link from 'next/link';
import ReactQueryProvider from 'providers/react-query.provider';
import ScrollList from 'pages/scroll-list/scroll-list';
import { PAGINATED_PAGE_SIZE } from 'constants/page-sizes';

type Search = {
  limit?: string;
  page?: string;
  mode?: string; // 'pagination' or 'infinite-scroll'
};

const PokemonListPaginatedPage = async ({ searchParams }: { searchParams?: Promise<Search> }) => {
  const { page: searchPage, limit: searchLimit, mode: searchMode } = (await searchParams) || {};
  const page = Number(searchPage ?? 1);
  const limit = Number(searchLimit ?? PAGINATED_PAGE_SIZE);
  const mode = searchMode ?? 'pagination';

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen  min-w-screen p-6 gap-5 ">
      <header className="flex flex-col gap-3 justify-center items-center w-full">
        <h1 className="text-3xl font-bold">Pokédex</h1>

        <p className="text-sm text-gray-500">
          Discover and explore Pokémon with <span className="font-bold capitalize">{mode}</span>
        </p>
      </header>

      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-600">Mode:</span>

        <Link
          href={`?page=${page}&limit=${limit}&mode=pagination`}
          className={`px-3 py-1 text-sm rounded ${mode === 'pagination' ? 'bg-black text-white' : 'bg-[#FBFEFD] text-black hover:bg-black hover:text-white'}`}
        >
          Pagination
        </Link>

        <Link
          href={`?mode=infinite-scroll`}
          className={`px-3 py-1 text-sm rounded ${mode === 'infinite-scroll' ? 'bg-black text-white' : 'bg-[#FBFEFD] text-black hover:bg-black hover:text-white'}`}
        >
          Infinite Scroll
        </Link>
      </div>

      <main className="flex flex-col gap-8 items-center w-full xl:px-50 lg:px-30 md:px-16 px-12 flex-1">
        <Suspense fallback={<PaginatedGridSkeleton limit={limit} />}>
          {mode === 'pagination' && <PaginatedList page={page} limit={limit} />}

          <ReactQueryProvider>{mode === 'infinite-scroll' && <ScrollList />}</ReactQueryProvider>
        </Suspense>
      </main>
    </div>
  );
};

export default PokemonListPaginatedPage;
