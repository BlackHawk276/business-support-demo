import { Skeleton } from "./skeleton"

export function SkeletonActivity({ count = 5 }: { count?: number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="divide-y divide-slate-200">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 flex items-start gap-3">
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
