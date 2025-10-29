const UsersListsSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className="flex items-center justify-center lg:justify-start gap-3 p-3
    rounded-lg animate-pulse"
    >
      <div className="size-12 rounded-full bg-zinc-800" />
      <div className="flex-1 hidden lg:block">
        <div className="h-4 w-24 bg-zinc-800 rounded mb-2" />
        <div className="h-3 w-32 bg-zinc-800 rounded" />
      </div>
    </div>
  ));
};

export default UsersListsSkeleton;
