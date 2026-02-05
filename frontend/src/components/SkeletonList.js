export default function SkeletonList({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-list-${idx}`}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 animate-pulse"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster skeleton */}
            <div className="flex-shrink-0">
              <div className="w-32 h-48 bg-gray-700 rounded-lg" />
            </div>
            
            {/* Content skeleton */}
            <div className="flex-1 space-y-4">
              {/* Title and badge */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="h-8 bg-gray-700 rounded w-3/4" />
                <div className="h-6 bg-gray-700 rounded-full w-20" />
              </div>
              
              {/* Details */}
              <div className="flex gap-6">
                <div className="h-4 bg-gray-700 rounded w-24" />
                <div className="h-4 bg-gray-700 rounded w-16" />
              </div>
              
              {/* Providers */}
              <div className="flex items-center gap-3">
                <div className="h-4 bg-gray-700 rounded w-20" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-md" />
                  <div className="w-8 h-8 bg-gray-700 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
