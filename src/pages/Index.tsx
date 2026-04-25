import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocalThreadsContext } from "@/contexts/LocalThreadsContext";
import { getRecentThreads, getUserById, getFirstName } from "@/lib/silverlink-data";
import { CategoryBadge } from "@/components/CategoryBadge";
import { OfficialTipsSection } from "@/components/OfficialTipsSection";

const STRIP = [
  { key: "Scams & Safety", emoji: "⚠️", label: "Scams & Safety", count: "1,240 questions answered" },
  { key: "Passwords & Accounts", emoji: "🔐", label: "Passwords & Accounts", count: "980 questions answered" },
  { key: "Video Calls", emoji: "📹", label: "Video Calls", count: "743 questions answered" },
  { key: "Apps & Phone Settings", emoji: "📱", label: "Apps & Phone Settings", count: "1,105 questions answered" },
  { key: "Health & News", emoji: "❤️", label: "Health & News", count: "621 questions answered" },
] as const;

const WHY = [
  {
    title: "Real people, not robots",
    emoji: "🤖",
    body: "Every answer comes from a real community member. No automated responses.",
  },
  {
    title: "Nothing is too basic",
    emoji: "🌱",
    body: "Every question is welcome. We remember what it felt like to not know.",
  },
  {
    title: "Safety built in",
    emoji: "🛡️",
    body: "We flag suspicious advice, warn about scams, and verify our most trusted helpers.",
  },
];

const Index = () => {
  const { allThreads } = useLocalThreadsContext();
  const recent = getRecentThreads(allThreads, 5);

  return (
    <main className="bg-white text-[#2C2C2A]">
      <section className="border-b border-[#E8E7E0] px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="mb-2 text-lg text-[#5F5E5A]">👋 Welcome to SilverLink</p>
          <h1 className="mb-4 text-3xl font-medium leading-tight text-[#2C2C2A] md:text-4xl md:leading-tight">
            Get help with your phone, tablet, or computer — friendly answers to all your questions
          </h1>
          <p className="mb-8 text-lg font-normal leading-[1.75] text-[#5F5E5A]">
            ✨ A safe, friendly community where no question is too simple. Free to join.
          </p>
          <div className="mb-6 flex min-h-[3rem] flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="h-auto min-h-11 gap-2 rounded-lg border-0 bg-[#1D9E75] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#1a8f68] shadow-none"
            >
              <Link to="/ask">
                <span aria-hidden>✏️</span> Ask a question
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto min-h-11 gap-2 rounded-lg border border-[#1D9E75] bg-transparent px-6 py-3 text-base font-medium text-[#1D9E75] transition-colors duration-200 hover:bg-[#1D9E75]/5 shadow-none"
            >
              <Link to="/browse">
                <span aria-hidden>🔎</span> Browse answers
              </Link>
            </Button>
          </div>
          <p className="text-sm font-normal leading-[1.75] text-[#5F5E5A]">
            🤝 No spam. No ads in your feed. Real people only. ⭐ Trusted by 12,000+ members.
          </p>
        </div>
      </section>

      <section className="border-b border-[#E8E7E0] px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="sr-only">Browse by topic</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STRIP.map(({ key, emoji, label, count }) => (
              <Link
                key={key}
                to={`/browse?category=${encodeURIComponent(key)}`}
                className="group flex min-h-[8rem] flex-col items-center justify-center gap-2 rounded-xl border border-[#E8E7E0] bg-white p-5 text-center transition-colors duration-200 hover:border-[#1D9E75]/40"
              >
                <span
                  className="text-4xl leading-none transition-transform duration-200 group-hover:scale-110"
                  aria-hidden
                >
                  {emoji}
                </span>
                <span className="text-base font-medium leading-tight text-[#2C2C2A]">{label}</span>
                <span className="text-sm leading-tight text-[#5F5E5A]">📊 {count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OfficialTipsSection compact />

      <section className="px-4 py-10 md:px-6 md:py-16" aria-labelledby="recent-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="recent-heading" className="mb-4 text-2xl font-medium text-[#2C2C2A]">
            💬 Recent questions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {recent.map((t) => {
              const u = getUserById(t.asked_by);
              return (
                <Link
                  key={t.id}
                  to={`/thread/${t.id}`}
                  className="block rounded-xl border border-[#E8E7E0] bg-white p-5 transition-colors duration-200 hover:border-[#1D9E75]/30 md:p-6"
                >
                  <div className="mb-2">
                    <CategoryBadge category={t.category} />
                  </div>
                  <p className="line-clamp-2 text-base font-normal leading-[1.75] text-[#2C2C2A]">
                    {t.question}
                  </p>
                  <p className="mt-2 text-sm text-[#5F5E5A]">
                    👤 {getFirstName(u.name)} · {u.age > 0 ? `${u.age} · ` : ""}
                    {t.date} · 👍 {t.helpful_count} found helpful
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F6] px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-center text-2xl font-medium text-[#2C2C2A]">✨ Why SilverLink</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {WHY.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#E8E7E0] bg-white p-6 md:p-6"
              >
                <div className="mb-3 inline-flex items-center gap-2 text-[#1D9E75]">
                  <span className="text-2xl leading-none" aria-hidden>
                    {item.emoji}
                  </span>
                  <span className="text-base font-medium text-[#2C2C2A]">{item.title}</span>
                </div>
                <p className="text-base leading-[1.75] text-[#5F5E5A]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
