import { Link } from "@tanstack/react-router";
import type { Category } from "@/data/quizzes";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/"
      hash="beliebt"
      className="group flex flex-col items-center gap-2 rounded-2xl glass p-4 text-center card-hover"
    >
      <span
        className="grid h-14 w-14 place-items-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(135deg, oklch(0.6 0.18 ${category.hue} / 0.25), oklch(0.65 0.2 ${
            (category.hue + 80) % 360
          } / 0.25))`,
        }}
      >
        {category.emoji}
      </span>
      <span className="text-sm font-semibold leading-tight">{category.name}</span>
      <span className="text-xs text-muted-foreground">{category.quizCount} Quizze</span>
    </Link>
  );
}
