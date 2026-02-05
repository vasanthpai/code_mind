export default function SkeletonRail({ count = 9 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          className="flex-shrink-0 w-40 sm:w-44 md:w-48 lg:w-52"
        >
          {/* Use aspect ratio utility for consistent height */}
          <div className="animate-pulse bg-gray-700 rounded-lg w-full aspect-[2/3]"></div>
          <div className="mt-3 h-5 bg-gray-600 rounded w-3/4 animate-pulse"></div>
          <div className="mt-1.5 mb-1 h-4 bg-gray-600 rounded w-1/2 animate-pulse"></div>
        </div>
      ))}
    </>
  )
}
