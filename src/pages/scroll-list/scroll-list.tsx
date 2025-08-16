'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { BriefCard, InfiniteLoader, PaginatedGridSkeleton } from 'components';
import { INFINITE_PAGE_SIZE } from 'constants/page-sizes';
import { getPokemonListQuery } from 'services';

export default function ScrollList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useInfiniteQuery({
    queryKey: ['pokemon', 'infinite', INFINITE_PAGE_SIZE],
    queryFn: getPokemonListQuery,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
    staleTime: 10 * 1000,
  });

  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '600px 0px 600px 0px' },
    );

    intersectionObserver.observe(el);
    return () => intersectionObserver.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') {
    return <PaginatedGridSkeleton limit={INFINITE_PAGE_SIZE} />;
  }

  if (status === 'error') {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {(error as Error).message}
      </div>
    );
  }

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 text-sm/6 text-center sm:text-left w-full flex-1">
        {items.map((pokemon) => (
          <li key={pokemon.name} className="text-gray-800 dark:text-gray-200">
            <BriefCard
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={pokemon.image}
              number={pokemon.id}
            />
          </li>
        ))}
      </ul>

      <div ref={triggerRef} className="py-8 text-center">
        {isFetchingNextPage ? (
          <InfiniteLoader />
        ) : hasNextPage ? (
          <span className="text-slate-500">Scroll to load more…</span>
        ) : (
          <span className="text-slate-500">No more Pokémons</span>
        )}
      </div>
    </>
  );
}
