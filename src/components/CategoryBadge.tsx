import { categoryPillClass } from "@/lib/category-style";
import { getCategoryEmoji } from "@/lib/category-emoji";

export function CategoryBadge({ category }: { category: string }) {
  const e = getCategoryEmoji(category);
  return (
    <span className={categoryPillClass(category)}>
      <span className="mr-1" aria-hidden>
        {e}
      </span>
      {category}
    </span>
  );
}
