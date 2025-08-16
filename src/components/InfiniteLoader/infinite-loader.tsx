const InfiniteLoader: React.FC = () => {
  return (
    <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600">
      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-slate-400" />
      Loading more…
    </div>
  );
};

export default InfiniteLoader;
