import { Link } from "react-router-dom";
import { useLocalThreadsContext } from "@/contexts/LocalThreadsContext";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";

const MyPosts = () => {
  const { allThreads } = useLocalThreadsContext();
  const localThreads = allThreads.filter((t) => t.asked_by === "local");

  return (
    <main className="bg-white px-4 py-10 text-[#2C2C2A] md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-medium text-[#2C2C2A]">📋 My questions</h1>
        <p className="mb-8 text-base leading-[1.75] text-[#5F5E5A] max-w-[680px]">
          Questions you have posted in this browser appear here. Sign in to sync across devices (coming
          soon).
        </p>

        {localThreads.length === 0 ? (
          <div className="rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-8 text-center">
            <p className="mb-6 text-base text-[#5F5E5A]">You have not asked a question in this session yet.</p>
            <Button
              asChild
              className="rounded-lg bg-[#1D9E75] text-white hover:bg-[#1a8f68] min-h-[2.5rem] px-6 text-base font-medium"
            >
              <Link to="/ask">Ask a question</Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {localThreads.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/thread/${t.id}`}
                  className="block rounded-xl border border-[#E8E7E0] bg-white p-5 transition-colors duration-200 hover:border-[#1D9E75]/30"
                >
                  <div className="mb-2">
                    <CategoryBadge category={t.category} />
                  </div>
                  <p className="text-base font-medium leading-[1.75] text-[#2C2C2A]">{t.question}</p>
                  <p className="mt-2 text-sm text-[#5F5E5A]">
                    {t.date} · {t.answers.length} {t.answers.length === 1 ? "answer" : "answers"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default MyPosts;
