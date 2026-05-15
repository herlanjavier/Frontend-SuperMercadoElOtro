export default function SkeletonTable({ rows = 4 }) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="soft-card h-20 animate-pulse rounded-2xl bg-white" />
      ))}
    </div>
  );
}
