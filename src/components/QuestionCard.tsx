import { Link } from "react-router-dom";
import type { Question } from "@/data/mockData";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Link to={`/thread/${question.id}`} className="block">
      <article className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-lg bg-secondary px-3 py-1 text-base font-semibold">
            {question.topicEmoji} {question.topic.charAt(0).toUpperCase() + question.topic.slice(1)}
          </span>
          {question.solved && (
            <span className="inline-flex items-center rounded-lg bg-safe px-3 py-1 text-base font-semibold text-safe-foreground">
              Solved ✓
            </span>
          )}
        </div>

        <h2 className="mb-2 text-xl font-bold leading-snug text-foreground">
          {question.title}
        </h2>

        <p className="mb-4 line-clamp-2 text-base text-muted-foreground">
          {question.body}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground">
          <span>💬 {question.replies} {question.replies === 1 ? "Reply" : "Replies"}</span>
          <span>By {question.authorName}</span>
          <span>{question.createdAt}</span>
        </div>
      </article>
    </Link>
  );
};

export default QuestionCard;
