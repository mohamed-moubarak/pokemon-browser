import Image from 'next/image';
import { getPokemonDetails } from 'services';
import Link from 'next/link';
import { padNumber } from 'utils';

type Params = { id: string };

export default async function PokemonDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const pokemon = await getPokemonDetails(id);

  const img =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default ??
    '';

  return (
    <main className="mx-auto max-w-4xl p-6">
      <header className="mb-6 flex items-end justify-between">
        <Link
          href={`/pokemon-list/`}
          className="px-4 py-2 bg-[#FBFEFD] text-black hover:bg-black hover:text-white rounded cursor-pointer"
        >
          &larr; Back to List
        </Link>
      </header>

      <section className="grid grid-cosdals-1 rounded-md">
        <header className="flex flex-col gap-4 p-4 justify-center w-full text-center bg-linear-to-r from-[#AA54F4] to-[#E8499E] rounded-t-md">
          <h1 className="text-3xl font-semibold capitalize text-white">{pokemon.name}</h1>

          <span className="text-xl text-white">#{padNumber(pokemon.id, 3)}</span>
        </header>

        <article className="rounded-b-md border border-slate-200 bg-white p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative flex flex-col w-full">
            <div className="relative aspect-square w-full">
              <Image
                src={img}
                alt={pokemon.name}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="w-full object-contain bg-gray-100 px-8 py-4 rounded-full mb-2"
                priority
              />
            </div>

            <div className="flex flex-col justify-center items-center p-4">
              <h2 className="mb-2 text-lg font-semibold">Abilities</h2>

              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-3 py-1 bg-white border border-black text-black text-sm font-medium rounded-full capitalize"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-gray-100 p-4 rounded-lg flex-1 text-center">
                <h3 className="text-sm  text-gray-600 mb-1">Height</h3>
                <p className="text-lg font-extrabold">{(pokemon.height / 10).toFixed(1)} m</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg flex-1 text-center">
                <h3 className="text-sm  text-gray-600 mb-1">Weight</h3>
                <p className="text-lg font-extrabold">{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 flex flex-col gap-4">
            <h3 className="text-xl font-extrabold text-black mb-4">Base Stats</h3>

            <ul className="space-y-2 text-sm">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name} className="flex items-center flex-col w-full gap-1">
                  <div className="flex flex-row justify-between w-full">
                    <span className="w-24 shrink-0 capitalize text-slate-700">{s.stat.name}</span>

                    <span className="w-10 text-right tabular-nums">{s.base_stat}</span>
                  </div>

                  <div className="h-2 flex-1 rounded bg-slate-200 w-full">
                    <div
                      className="h-2 rounded bg-slate-700"
                      style={{ width: `${Math.min(100, (s.base_stat / 180) * 100)}%` }}
                      aria-label={`${s.stat.name} ${s.base_stat}`}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col justify-center items-start">
              <h2 className="mb-2 text-lg font-semibold">Abilities</h2>

              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 bg-white border border-black text-black text-sm font-medium rounded-full capitalize"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <h2 className="mb-2 text-lg font-semibold">Base Experience</h2>

              <div className="flex flex-wrap gap-2 text-[#8B56C7] font-extrabold text-xl">
                {pokemon.base_experience} XP
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
