import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Award,
  Calendar,
  Flame,
  Layers,
  Search,
  Shuffle,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuizCard } from "@/components/QuizCard";
import { CategoryCard } from "@/components/CategoryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, platformStats, quizzes } from "@/data/quizzes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuizMaster – Spannende Quizze zu jedem Thema" },
      {
        name: "description",
        content:
          "QuizMaster ist die moderne Quiz-Plattform: tausende Quizze, Ranglisten, Erfolge und tägliche Challenges. Spiele Quizze zu Fußball, Wissen, Geografie und mehr.",
      },
      { property: "og:title", content: "QuizMaster – Spannende Quizze zu jedem Thema" },
      {
        property: "og:description",
        content: "Tausende Quizze, Ranglisten und tägliche Challenges. Jetzt spielen!",
      },
    ],
  }),
  component: Home,
});

const topPlayers = [
  { name: "QuizKönig_DE", points: 184250, emoji: "👑", country: "🇩🇪" },
  { name: "BrainStorm", points: 162910, emoji: "🧠", country: "🇦🇹" },
  { name: "Trivia_Tina", points: 151430, emoji: "⭐", country: "🇨🇭" },
  { name: "MrKnowItAll", points: 139870, emoji: "🎯", country: "🇩🇪" },
  { name: "SmartCookie", points: 128640, emoji: "🍪", country: "🇳🇱" },
  { name: "FactMachine", points: 117200, emoji: "🤖", country: "🇩🇪" },
];

function formatStat(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} Mio.`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return `${n}`;
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const dailyQuiz = quizzes.find((q) => q.isDaily) ?? quizzes[0];
  const newQuizzes = quizzes.filter((q) => q.isNew);
  const popular = [...quizzes].sort((a, b) => b.plays - a.plays);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return popular;
    return popular.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(q) ||
        quiz.category.toLowerCase().includes(q) ||
        quiz.description.toLowerCase().includes(q),
    );
  }, [query, popular]);

  const playRandom = () => {
    const random = quizzes[Math.floor(Math.random() * quizzes.length)];
    navigate({ to: "/quiz/$quizId", params: { quizId: random.id } });
  };

  const stats = [
    { icon: <Layers className="h-5 w-5" />, value: formatStat(platformStats.quizzes), label: "Quizze" },
    { icon: <Users className="h-5 w-5" />, value: formatStat(platformStats.players), label: "Spieler" },
    { icon: <TrendingUp className="h-5 w-5" />, value: formatStat(platformStats.played), label: "Gespielt" },
    { icon: <Sparkles className="h-5 w-5" />, value: formatStat(platformStats.questions), label: "Fragen" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative px-3 pt-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border">
          <img
            src={heroBg}
            alt=""
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="relative px-5 py-14 text-center sm:px-10 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-brand-teal" /> Über 1.200 Quizze · täglich neue
              Challenges
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Werde zum <span className="text-gradient">QuizMaster</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Spiele tausende Quizze zu Fußball, Wissen, Geografie und mehr. Sammle Punkte, steige im
              Level auf und erobere die weltweite Rangliste.
            </p>

            <div id="suche" className="mx-auto mt-7 flex max-w-xl items-center gap-2 rounded-2xl glass p-2 scroll-mt-24">
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quiz oder Kategorie suchen…"
                className="w-full bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-white">
                Los
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={playRandom}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                <Shuffle className="h-4 w-4" /> Zufälliges Quiz
              </button>
              <a
                href="#taeglich"
                className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-semibold"
              >
                <Calendar className="h-4 w-4 text-brand-teal" /> Tägliches Quiz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-3 pt-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-2xl glass p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl gradient-brand-soft text-brand-purple">
                {s.icon}
              </span>
              <div>
                <p className="text-xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-3 pt-14">
        {/* Beliebte / Suchergebnisse */}
        <section>
          <SectionHeading
            id="beliebt"
            icon={<Flame className="h-7 w-7 text-brand-purple" />}
            title={query ? `Ergebnisse für „${query}“` : "Beliebte Quizze"}
            subtitle={
              query ? `${filtered.length} Quizze gefunden` : "Die meistgespielten Quizze gerade jetzt"
            }
          />
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl glass p-10 text-center text-muted-foreground">
              Keine Quizze gefunden. Versuche einen anderen Suchbegriff.
            </div>
          )}
        </section>

        {/* Kategorien */}
        <section className="pt-16">
          <SectionHeading
            id="kategorien"
            icon={<Layers className="h-7 w-7 text-brand-teal" />}
            title="Kategorien"
            subtitle="Finde Quizze zu deinem Lieblingsthema"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </section>

        {/* Neue Quizze */}
        {newQuizzes.length > 0 && (
          <section className="pt-16">
            <SectionHeading
              icon={<Sparkles className="h-7 w-7 text-brand-blue" />}
              title="Neue Quizze"
              subtitle="Frisch veröffentlicht – sei der Erste"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </section>
        )}

        {/* Tägliches + Zufälliges Quiz */}
        <section className="pt-16">
          <SectionHeading
            id="taeglich"
            icon={<Calendar className="h-7 w-7 text-brand-purple" />}
            title="Tägliches & Zufälliges Quiz"
            subtitle="Jeden Tag ein neues Highlight"
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl glass p-6">
              <span className="inline-flex items-center gap-1.5 rounded-full gradient-brand px-3 py-1 text-xs font-bold text-white">
                <Calendar className="h-3.5 w-3.5" /> Quiz des Tages
              </span>
              <div className="mt-4 flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-2xl gradient-brand-soft text-4xl">
                  {dailyQuiz.emoji}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{dailyQuiz.title}</h3>
                  <p className="text-sm text-muted-foreground">{dailyQuiz.category}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{dailyQuiz.description}</p>
              <button
                onClick={() =>
                  navigate({ to: "/quiz/$quizId", params: { quizId: dailyQuiz.id } })
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                <Flame className="h-4 w-4" /> Jetzt spielen
              </button>
            </div>

            <div className="relative flex flex-col items-start justify-center overflow-hidden rounded-3xl gradient-brand p-6 text-white">
              <Shuffle className="h-10 w-10" />
              <h3 className="mt-4 text-2xl font-bold">Lust auf Überraschung?</h3>
              <p className="mt-2 max-w-sm text-sm text-white/85">
                Starte ein zufälliges Quiz aus allen Kategorien und teste dein Wissen ohne langes
                Suchen.
              </p>
              <button
                onClick={playRandom}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-purple transition-transform hover:scale-105"
              >
                <Shuffle className="h-4 w-4" /> Zufälliges Quiz starten
              </button>
            </div>
          </div>
        </section>

        {/* Top Spieler */}
        <section className="pt-16">
          <SectionHeading
            id="top-spieler"
            icon={<Trophy className="h-7 w-7 text-warning" />}
            title="Top-Spieler"
            subtitle="Die weltweite Rangliste dieser Woche"
          />
          <div className="overflow-hidden rounded-3xl glass">
            {topPlayers.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center gap-4 border-b border-border px-5 py-4 last:border-0"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${
                    i === 0
                      ? "gradient-brand text-white"
                      : i < 3
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-2xl">{p.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {p.name} <span className="ml-1">{p.country}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{p.points.toLocaleString("de-DE")} Punkte</p>
                </div>
                {i === 0 && <Award className="h-5 w-5 text-warning" />}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
