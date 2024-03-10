import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export interface ISearchSkeletonProps {
  count: number
}

export const SearchSkeleton: React.FC<ISearchSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array(count).fill(count).map((_, index) => (
        <li key={`__skeleton-${index}`}>
          <div className="flex justify-between m-1 p-1 gap-8 cursor-pointer w-[100%] items-center">
            <Skeleton className="w-[15%] h-8" />
            <Skeleton className="w-[65%] h-8" />
            <Skeleton className="w-[20%] h-8" />
          </div>
          <Separator />
        </li>
      ))}
    </>
  )
}