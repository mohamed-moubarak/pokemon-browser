import React from 'react';
import Image from 'next/image';
import { padNumber } from 'utils';
import Link from 'next/link';

type PokemonBriefCardProps = {
  name: string;
  imageUrl: string;
  number: number;
};

const BriefCard: React.FC<PokemonBriefCardProps> = ({ name, imageUrl, number }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <Link href={`/pokemon/${number}`} className="block cursor-pointer">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className="w-full object-cover bg-gray-50 px-8 py-4 rounded-lg mb-2"
        />

        <h2 className="text-lg font-bold text-center capitalize">{name}</h2>

        <p className="text-sm text-gray-500 text-center">#{padNumber(number, 3)}</p>
      </Link>
    </div>
  );
};

export default BriefCard;
