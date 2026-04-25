import { Link } from "react-router-dom";
import { getSafetyReports } from "@/lib/safety-reports";
import { format } from "date-fns";
import { OfficialTipsSection } from "@/components/OfficialTipsSection";
import { Button } from "@/components/ui/button";

const SafetyHub = () => {
  const reports = getSafetyReports().slice(0, 20);

  return (
    <main className="bg-white px-4 py-10 text-[#2C2C2A] md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-medium text-[#2C2C2A]">🛡️ Safety &amp; trust</h1>
        <p className="mb-10 max-w-[680px] text-base leading-[1.75] text-[#5F5E5A]">
          💙 SilverLink is built for people who want calm, clear help without pressure. Here is how we support that —
          and what you can do on <strong>this device</strong> (reports stay in your browser until we add accounts).
        </p>

        <div className="mb-10 flex min-h-11 flex-wrap gap-3">
          <Button asChild className="min-h-11 gap-2 bg-[#1D9E75] text-white">
            <Link to="/scam-checker">
              <span aria-hidden>🔍</span> Scam message checker
            </Link>
          </Button>
          <Button asChild variant="outline" className="min-h-11 gap-2">
            <Link to="/browse?category=Scams%20%26%20Safety">
              <span aria-hidden>⚠️</span> Scams &amp; Safety forum
            </Link>
          </Button>
        </div>
      </div>

      <OfficialTipsSection />

      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <h2 className="mb-2 text-xl font-medium text-[#2C2C2A]">📬 Your submitted reports (this device only)</h2>
        <p className="mb-4 text-sm text-[#5F5E5A]">
          When you report a thread or answer, a copy is kept here so you can see what you sent. It is not yet synced
          to a moderation team in this demo.
        </p>
        {reports.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#E8E7E0] bg-[#FAFAF8] p-6 text-base text-[#5F5E5A]">
            No reports yet. Use &quot;Report a concern&quot; on a question or answer to add one.
          </p>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-[#E8E7E0] bg-white p-4 text-sm print:break-inside-avoid"
              >
                <p className="font-medium text-[#2C2C2A]">
                  {r.kind === "thread" ? "Thread" : "Answer"} · {r.reason}
                </p>
                <p className="text-[#5F5E5A]">
                  {format(new Date(r.createdAt), "d MMM yyyy, HH:mm")} · {r.threadId}
                  {r.answerId ? ` · ${r.answerId}` : ""}
                </p>
                {r.note && <p className="mt-1 text-[#2C2C2A]">&quot;{r.note}&quot;</p>}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 text-sm text-[#5F5E5A]">
          RSS:{" "}
          <a className="font-medium text-[#1D9E75] underline" href={`${import.meta.env.BASE_URL}rss.xml`}>
            Latest questions (feed)
          </a>
        </p>
      </div>
    </main>
  );
};

export default SafetyHub;
