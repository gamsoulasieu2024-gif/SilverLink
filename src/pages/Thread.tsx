import { useCallback, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalThreadsContext } from "@/contexts/LocalThreadsContext";
import { getUserById, getFirstName } from "@/lib/silverlink-data";
import { CategoryBadge } from "@/components/CategoryBadge";
import { ThumbsUp, BadgeCheck } from "lucide-react";
import type { ThreadAnswer } from "@/types/silverlink";

const Thread = () => {
  const { id } = useParams();
  const { allThreads } = useLocalThreadsContext();
  const [helpDeltas, setHelpDeltas] = useState<Record<string, number>>({});

  const thread = useMemo(
    () => allThreads.find((t) => t.id === id),
    [allThreads, id]
  );

  const sortedAnswers = useMemo(() => {
    if (!thread) return [];
    return [...thread.answers].sort((a, b) => b.helpful_count - a.helpful_count);
  }, [thread]);

  const bumpHelpful = useCallback((answerId: string) => {
    setHelpDeltas((d) => ({ ...d, [answerId]: (d[answerId] ?? 0) + 1 }));
  }, []);

  if (!id || !thread) {
    return (
      <main className="px-4 py-16 text-center md:px-6">
        <h1 className="mb-4 text-2xl font-medium text-[#2C2C2A]">We couldn’t find that question</h1>
        <Button
          asChild
          className="rounded-lg bg-[#1D9E75] text-white hover:bg-[#1a8f68] min-h-[2.5rem] px-6 py-3 text-base font-medium"
        >
          <Link to="/browse">Back to all questions</Link>
        </Button>
      </main>
    );
  }

  const asker = getUserById(thread.asked_by);

  return (
    <main className="bg-white px-4 py-10 text-[#2C2C2A] md:px-6 md:py-16">
      <div className="mx-auto max-w-[680px]">
        <Link
          to="/browse"
          className="mb-8 inline-flex text-base font-medium text-[#1D9E75] transition-colors duration-200 hover:underline"
        >
          ← Browse all questions
        </Link>

        <article className="mb-10 rounded-xl border border-[#E8E7E0] bg-white p-6">
          <div className="mb-3">
            <CategoryBadge category={thread.category} />
          </div>
          <h1 className="mb-4 text-2xl font-medium leading-tight text-[#2C2C2A]">
            {thread.question}
          </h1>
          <div className="mb-2 flex min-h-[2.5rem] flex-wrap items-center gap-3">
            <Avatar className="h-10 w-10 border border-[#E8E7E0]">
              <AvatarImage src={asker.avatar} alt="" />
              <AvatarFallback>
                {getFirstName(asker.name)
                  .slice(0, 1)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-medium">
              {asker.name}
              {asker.age > 0 ? ` · ${asker.age}` : ""}
            </span>
            <span className="text-base text-[#5F5E5A]">{thread.date}</span>
          </div>
          <p className="text-base text-[#5F5E5A]">
            {thread.helpful_count} people found this question helpful
          </p>
        </article>

        <h2 className="mb-4 text-xl font-medium text-[#2C2C2A]">Answers</h2>
        {sortedAnswers.length === 0 ? (
          <p className="rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-5 text-base leading-[1.75] text-[#5F5E5A]">
            There are no replies yet. You’ll be notified when someone responds.
          </p>
        ) : (
          <ul className="space-y-4">
            {sortedAnswers.map((a: ThreadAnswer) => {
              const helper = getUserById(a.answered_by);
              const count = a.helpful_count + (helpDeltas[a.id] ?? 0);
              return (
                <li key={a.id}>
                  <article className="rounded-xl border border-[#E8E7E0] bg-white p-5 md:px-6 md:py-5">
                    <div className="mb-3 flex min-h-[2.5rem] flex-wrap items-center gap-3">
                      <Avatar className="h-10 w-10 border border-[#E8E7E0]">
                        <AvatarImage src={helper.avatar} alt="" />
                        <AvatarFallback>
                          {getFirstName(helper.name)
                            .slice(0, 1)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-medium text-[#2C2C2A]">
                            {helper.name}
                          </span>
                          {a.verified_helper && (
                            <Badge
                              className="inline-flex h-6 min-h-0 max-w-full items-center gap-1 border-0 bg-[#E3F5EC] px-2 text-xs font-medium text-[#1D5A45]"
                            >
                              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                              <span>Verified helper</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#5F5E5A]">{a.date}</p>
                      </div>
                    </div>
                    <p className="mb-4 whitespace-pre-wrap text-base font-normal leading-[1.75] text-[#2C2C2A]">
                      {a.text}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => bumpHelpful(a.id)}
                        className="h-auto min-h-[2.5rem] gap-2 rounded-lg border border-[#E8E7E0] bg-[#F8F8F6] px-4 py-2 text-base font-medium text-[#2C2C2A] shadow-none transition-colors duration-200 hover:bg-[#F0EFEA]"
                      >
                        <ThumbsUp className="h-4 w-4" aria-hidden />
                        <span>This helped me</span>
                        <span className="text-[#5F5E5A]">({count})</span>
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Thread;
