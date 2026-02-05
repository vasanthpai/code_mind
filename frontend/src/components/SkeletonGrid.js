export default function SkeletonGrid({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          className="bg-gray-700 animate-pulse rounded-lg aspect-[2/3]"
        />
      ))}
    </>
  )
}
