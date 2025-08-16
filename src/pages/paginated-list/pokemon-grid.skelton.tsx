import { BriefCardSkeleton } from 'components';

type PaginatedGridSkeletonProps = {
  limit: number;
};
const PaginatedGridSkeleton: React.FC<PaginatedGridSkeletonProps> = async ({ limit }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 text-sm/6 text-center w-full">
        {Array.from({ length: limit }, (_, index) => (
          <BriefCardSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};

export default PaginatedGridSkeleton;
