import { categoryPillClass } from "@/lib/category-style";

export function CategoryBadge({ category }: { category: string }) {
  return <span className={categoryPillClass(category)}>{category}</span>;
}
