import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("skeleton-shimmer rounded-md", className)}
      {...props}
    />
  )
}

function SkeletonText({ className, lines = 1, lastLineShort = false, ...props }: React.ComponentProps<"div"> & { lines?: number, lastLineShort?: boolean }) {
  return (
    <div className={cn("space-y-2 w-full", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 w-full",
            lastLineShort && i === lines - 1 ? "w-2/3" : ""
          )}
        />
      ))}
    </div>
  )
}

function SkeletonImage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton className={cn("w-full h-full min-h-[200px] rounded-lg", className)} {...props} />
  )
}

function SkeletonButton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton className={cn("h-12 w-32 rounded-xl", className)} {...props} />
  )
}

function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm", className)} {...props}>
      <Skeleton className="w-full aspect-[4/5] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-end mt-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  )
}

function SkeletonTableRow({ className, cols = 4, ...props }: React.ComponentProps<"div"> & { cols?: number }) {
  return (
    <div className={cn("flex items-center space-x-4 py-4 border-b border-gray-100", className)} {...props}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
      </div>
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-24 hidden sm:block" />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonImage, SkeletonButton, SkeletonCard, SkeletonTableRow }
