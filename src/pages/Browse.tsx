import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLocalThreadsContext } from "@/contexts/LocalThreadsContext";
import { getUserById, getFirstName, CATEGORY_ORDER } from "@/lib/silverlink-data";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Thread } from "@/types/silverlink";

type SortMode = "helpful" | "recent";

const ALL_LABEL = "All";

function useCategoryFilter() {
  const [search, setSearch] = useSearchParams();
  const raw = search.get("category");
  const valid =
    raw && (CATEGORY_ORDER as readonly string[]).includes(raw)
      ? raw
      : ALL_LABEL;
  return {
    category: valid,
    setCategory: (c: string) => {
      const next = new URLSearchParams(search);
      if (c === ALL_LABEL) next.delete("category");
      else next.set("category", c);
      setSearch(next);
    },
  };
}

function sortThreads(threads: Thread[], mode: SortMode): Thread[] {
  const copy = [...threads];
  if (mode === "helpful") {
    copy.sort((a, b) => b.helpful_count - a.helpful_count);
  }
  return copy;
}

const Browse = () => {
  const { allThreads } = useLocalThreadsContext();
  const { category, setCategory } = useCategoryFilter();
  const [sort, setSort] = useState<SortMode>("recent");

  const categories = [ALL_LABEL, ...CATEGORY_ORDER];

  const filtered = useMemo(() => {
    if (category === ALL_LABEL) return allThreads;
    return allThreads.filter((t) => t.category === category);
  }, [allThreads, category]);

  const display = useMemo(() => sortThreads(filtered, sort), [filtered, sort]);

  return (
    <main className="bg-white px-4 py-10 text-[#2C2C2A] md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-medium text-[#2C2C2A]">Browse questions</h1>
        <p className="mb-8 text-base leading-[1.75] text-[#5F5E5A] max-w-[680px]">
          Every thread is from someone like you. Filter by topic or sort to find the most helpful
          answers.
        </p>

        <div className="mb-6 flex min-h-[3rem] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-[#5F5E5A]">Filter by category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-base font-medium transition-colors duration-200 min-h-[2.5rem]",
                    c === category
                      ? "border-[#1D9E75] bg-[#1D9E75] text-white"
                      : "border-[#E8E7E0] bg-white text-[#2C2C2A] hover:border-[#1D9E75]/50"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-[#5F5E5A]">Sort by</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSort("helpful")}
                className={cn(
                  "h-auto rounded-lg border px-4 py-2 text-base font-medium min-h-[2.5rem] shadow-none",
                  sort === "helpful"
                    ? "border-[#1D9E75] bg-[#E3F5EC] text-[#1D9E75]"
                    : "border-[#E8E7E0] text-[#2C2C2A] hover:bg-[#F8F8F6]"
                )}
              >
                Most helpful
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSort("recent")}
                className={cn(
                  "h-auto rounded-lg border px-4 py-2 text-base font-medium min-h-[2.5rem] shadow-none",
                  sort === "recent"
                    ? "border-[#1D9E75] bg-[#E3F5EC] text-[#1D9E75]"
                    : "border-[#E8E7E0] text-[#2C2C2A] hover:bg-[#F8F8F6]"
                )}
              >
                Most recent
              </Button>
            </div>
          </div>
        </div>

        <ul className="grid list-none grid-cols-1 gap-4 p-0">
          {display.map((t) => {
            const u = getUserById(t.asked_by);
            return (
              <li key={t.id}>
                <Link
                  to={`/thread/${t.id}`}
                  className="block rounded-xl border border-[#E8E7E0] bg-white p-5 transition-colors duration-200 hover:border-[#1D9E75]/30 md:px-6 md:py-5"
                >
                  <div className="mb-2">
                    <CategoryBadge category={t.category} />
                  </div>
                  <h2 className="mb-3 text-lg font-medium leading-[1.75] text-[#2C2C2A] max-w-[680px]">
                    {t.question}
                  </h2>
                  <div className="mb-2 flex min-h-[2.5rem] flex-wrap items-center gap-3">
                    <Avatar className="h-10 w-10 border border-[#E8E7E0]">
                      <AvatarImage src={u.avatar} alt="" />
                      <AvatarFallback>
                        {getFirstName(u.name)
                          .slice(0, 1)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-base font-medium text-[#2C2C2A]">
                      {u.name} · {u.age > 0 ? `${u.age} · ` : ""}
                    </span>
                    <span className="text-base text-[#5F5E5A]">{t.date}</span>
                  </div>
                  <p className="text-base text-[#5F5E5A]">
                    {t.answers.length} {t.answers.length === 1 ? "answer" : "answers"} ·{" "}
                    {t.helpful_count} found this helpful
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        {display.length === 0 && (
          <p className="rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-6 text-center text-base text-[#5F5E5A]">
            No questions in this category yet. Try another filter or ask the first one.
          </p>
        )}
      </div>
    </main>
  );
};

export default Browse;
