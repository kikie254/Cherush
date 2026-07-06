/** Skeleton shimmer utility components for loading states */

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

/** Base shimmer skeleton block */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-primary/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent',
        className
      )}
      aria-hidden="true"
    />
  )
}

/** Room card skeleton */
export function RoomCardSkeleton() {
  return (
    <div className="rounded-[24px] bg-white overflow-hidden shadow-soft">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-8 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/** Review card skeleton */
export function ReviewSkeleton() {
  return (
    <div className="rounded-[24px] bg-white p-8 shadow-soft space-y-4">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => <Skeleton key={n} className="h-4 w-4 rounded-full" />)}
      </div>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-5 w-3/4" />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

/** Booking widget skeleton */
export function BookingWidgetSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
      <div className="bg-white rounded-[32px] p-14 shadow-premium space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-64 rounded-[32px]" />
    </div>
  )
}

/** Page hero skeleton */
export function HeroSkeleton() {
  return (
    <div className="h-[100svh] w-full bg-primary/5 flex items-end pb-20">
      <div className="container mx-auto px-8 space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </div>
  )
}
