import { Link } from "@tanstack/react-router";
import { Clock, Play, Star, Users } from "lucide-react";
import { categories, difficultyLabel, type Quiz } from "@/data/quizzes";

const hueByCategory = new Map(categories.map((c) => [c.id, c.hue]));

function coverStyle(hue: number) {
  return {
    backgroundImage: `linear-gradient(135deg, oklch(0.6 0.2 ${hue}), oklch(0.62 0.22 ${
      (hue + 60) % 360
    }), oklch(0.7 0.16 ${(hue + 140) % 360}))`,
  };
}

const difficultyClass: Record<Quiz["difficulty"], string> = {
  easy: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  hard: "bg-destructive/15 text-destructive",
};

function formatPlays(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return `${n}`;
}

export function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link
      to="/quiz/$quizId"
      params={{ quizId: quiz.id }}
      className="group block overflow-hidden rounded-2xl glass card-hover"
    >
      <div
        className="relative flex h-32 items-center justify-center overflow-hidden"
        style={coverStyle(hueByCategory.get(quiz.categoryId) ?? 270)}
      >
        <span className="text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
          {quiz.emoji}
        </span>
        <div className="absolute left-3 top-3 flex gap-1.5">
          {quiz.isNew && (
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-purple">
              Neu
            </span>
          )}
          {quiz.isDaily && (
            <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
              Tagesquiz
            </span>
          )}
        </div>
        <span
          className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur ${difficultyClass[quiz.difficulty]}`}
        >
          {difficultyLabel[quiz.difficulty]}
        </span>
        <span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white/95 opacity-0 shadow-glow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Play className="h-4 w-4 fill-brand-purple text-brand-purple" />
        </span>
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold text-muted-foreground">{quiz.category}</p>
        <h3 className="line-clamp-1 font-bold leading-snug">{quiz.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{quiz.description}</p>
        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {quiz.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {formatPlays(quiz.plays)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {quiz.durationMin} Min
          </span>
        </div>
      </div>
    </Link>
  );
}
