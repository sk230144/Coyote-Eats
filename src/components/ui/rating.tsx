import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingProps = {
  rating: number;
  maxRating?: number;
  className?: string;
  starClassName?: string;
};

export function Rating({
  rating,
  maxRating = 5,
  className,
  starClassName,
}: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-5 w-5",
            rating > index
              ? "text-primary fill-primary"
              : "text-muted-foreground/50",
            starClassName
          )}
        />
      ))}
    </div>
  );
}
