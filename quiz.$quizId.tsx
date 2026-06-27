import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  Home,
  RotateCcw,
  Shuffle,
  Target,
  Trophy,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { difficultyLabel, getQuiz, quizzes, type Quiz } from "@/data/quizzes";

const QUESTION_TIME = 15; // seconds
const MAX_POINTS = 1000;

export const Route = createFileRoute("/quiz/$quizId")({
  head: ({ params }) => {
    const quiz = getQuiz(params.quizId);
    const title = quiz ? `${quiz.title} – QuizMaster` : "Quiz – QuizMaster";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: quiz?.description ?? "Spiele dieses Quiz auf QuizMaster.",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: quiz?.description ?? "Spiele dieses Quiz." },
      ],
    };
  },
  component: QuizPage,
  notFoundComponent: QuizNotFound,
  errorComponent: QuizNotFound,
});

function QuizNotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Quiz nicht gefunden</h1>
        <p className="mt-2 text-muted-foreground">Dieses Quiz existiert nicht oder wurde entfernt.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-3 text-sm font-semibold text-white"
        >
          <Home className="h-4 w-4" /> Zur Startseite
        </Link>
      </div>
    </div>
  );
}

/** Lightweight Web Audio beeps – no asset files needed. */
function useSound(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const ensure = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    return ctxRef.current;
  };
  return useCallback(
    (type: "correct" | "wrong" | "tick" | "finish") => {
      if (muted) return;
      const ctx = ensure();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      const map = {
        correct: [660, 880],
        wrong: [220, 160],
        tick: [440, 440],
        finish: [523, 784],
      } as const;
      const [f1, f2] = map[type];
      o.type = type === "wrong" ? "sawtooth" : "sine";
      o.frequency.setValueAtTime(f1, now);
      o.frequency.exponentialRampToValueAtTime(f2, now + 0.12);
      g.gain.setValueAtTime(0.12, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      o.start(now);
      o.stop(now + 0.26);
    },
    [muted],
  );
}

interface AnswerRecord {
  selected: number | null;
  correct: boolean;
  points: number;
}

function QuizPage() {
  const { quizId } = Route.useParams();
  const quiz = getQuiz(quizId);
  if (!quiz) return <QuizNotFound />;
  return <QuizRunner quiz={quiz} />;
}

function QuizRunner({ quiz }: { quiz: Quiz }) {
  const navigate = useNavigate();
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "play" | "result">("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [muted, setMuted] = useState(false);
  const play = useSound(muted);

  const question = quiz.questions[index];
  const total = quiz.questions.length;

  const finish = useCallback(
    (finalAnswers: AnswerRecord[], finalScore: number) => {
      setPhase("result");
      const correct = finalAnswers.filter((a) => a.correct).length;
      const accuracy = correct / total;
      play("finish");
      if (accuracy >= 0.8 && typeof window !== "undefined") {
        import("canvas-confetti")
          .then(({ default: confetti }) => {
            confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
            setTimeout(() => confetti({ particleCount: 80, spread: 70, angle: 60, origin: { x: 0 } }), 250);
            setTimeout(() => confetti({ particleCount: 80, spread: 70, angle: 120, origin: { x: 1 } }), 400);
          })
          .catch(() => undefined);
      }
      void finalScore;
    },
    [play, total],
  );

  const advance = useCallback(
    (record: AnswerRecord) => {
      const nextAnswers = [...answers, record];
      const nextScore = score + record.points;
      setAnswers(nextAnswers);
      setScore(nextScore);
      if (index + 1 >= total) {
        finish(nextAnswers, nextScore);
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
        setLocked(false);
        setTimeLeft(QUESTION_TIME);
      }
    },
    [answers, score, index, total, finish],
  );

  const handleAnswer = useCallback(
    (choice: number | null) => {
      if (locked) return;
      setLocked(true);
      setSelected(choice);
      const correct = choice === question.answer;
      const points = correct ? Math.round(MAX_POINTS * 0.4 + MAX_POINTS * 0.6 * (timeLeft / QUESTION_TIME)) : 0;
      play(correct ? "correct" : "wrong");
      const record: AnswerRecord = { selected: choice, correct, points };
      window.setTimeout(() => advance(record), 1300);
    },
    [locked, question, timeLeft, play, advance],
  );

  // Countdown
  useEffect(() => {
    if (phase !== "play" || locked) return;
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, locked, timeLeft, handleAnswer]);

  const start = () => {
    setPhase("play");
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setTimeLeft(QUESTION_TIME);
    setScore(0);
    setAnswers([]);
  };

  const playRandom = () => {
    const other = quizzes.filter((q) => q.id !== quiz.id);
    const random = other[Math.floor(Math.random() * other.length)];
    navigate({ to: "/quiz/$quizId", params: { quizId: random.id } });
    router.invalidate();
    setPhase("intro");
  };

  // ---- INTRO ----
  if (phase === "intro") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="overflow-hidden rounded-3xl glass">
            <div className="flex flex-col items-center gap-4 gradient-brand-soft p-10 text-center">
              <span className="text-7xl">{quiz.emoji}</span>
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <p className="max-w-md text-muted-foreground">{quiz.description}</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border border-y border-border text-center">
              <Stat label="Fragen" value={`${total}`} />
              <Stat label="Zeit/Frage" value={`${QUESTION_TIME}s`} />
              <Stat label="Niveau" value={difficultyLabel[quiz.difficulty]} />
            </div>
            <div className="p-6">
              <button
                onClick={start}
                className="flex w-full items-center justify-center gap-2 rounded-2xl gradient-brand px-6 py-4 text-lg font-bold text-white shadow-glow transition-transform hover:scale-[1.02]"
              >
                <Zap className="h-5 w-5" /> Quiz starten
              </button>
              <Link
                to="/"
                className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <Home className="h-4 w-4" /> Zurück
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- RESULT ----
  if (phase === "result") {
    const correctCount = answers.filter((a) => a.correct).length;
    const accuracy = Math.round((correctCount / total) * 100);
    const maxPossible = total * MAX_POINTS;
    const grade =
      accuracy >= 90 ? "Herausragend! 🏆" : accuracy >= 70 ? "Stark gespielt! 🔥" : accuracy >= 50 ? "Solide! 👍" : "Weiter üben! 💪";

    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="overflow-hidden rounded-3xl glass">
            <div className="flex flex-col items-center gap-3 gradient-brand p-10 text-center text-white">
              <Trophy className="h-12 w-12 animate-float" />
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">{grade}</p>
              <p className="text-5xl font-black tabular-nums">{score.toLocaleString("de-DE")}</p>
              <p className="text-sm text-white/80">von {maxPossible.toLocaleString("de-DE")} Punkten</p>
            </div>

            <div className="grid grid-cols-3 divide-x divide-border border-b border-border text-center">
              <ResultStat icon={<Check className="h-4 w-4 text-success" />} label="Richtig" value={`${correctCount}/${total}`} />
              <ResultStat icon={<Target className="h-4 w-4 text-brand-purple" />} label="Genauigkeit" value={`${accuracy}%`} />
              <ResultStat icon={<Clock className="h-4 w-4 text-brand-teal" />} label="Fragen" value={`${total}`} />
            </div>

            <div className="space-y-2 p-6">
              <p className="mb-2 text-sm font-bold">Deine Antworten</p>
              {quiz.questions.map((q, i) => {
                const a = answers[i];
                const ok = a?.correct;
                return (
                  <div key={i} className="rounded-xl border border-border p-3">
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          ok ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{q.q}</p>
                        <p className="mt-1 text-xs text-success">Richtig: {q.options[q.answer]}</p>
                        {!ok && a?.selected != null && (
                          <p className="text-xs text-destructive">Deine Wahl: {q.options[a.selected]}</p>
                        )}
                        {!ok && a?.selected == null && (
                          <p className="text-xs text-muted-foreground">Keine Antwort (Zeit abgelaufen)</p>
                        )}
                        {q.explanation && <p className="mt-1 text-xs text-muted-foreground">💡 {q.explanation}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-3 p-6 pt-0 sm:grid-cols-3">
              <button
                onClick={start}
                className="flex items-center justify-center gap-2 rounded-xl gradient-brand px-4 py-3 text-sm font-semibold text-white"
              >
                <RotateCcw className="h-4 w-4" /> Nochmal
              </button>
              <button
                onClick={playRandom}
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold"
              >
                <Shuffle className="h-4 w-4" /> Zufällig
              </button>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold"
              >
                <Home className="h-4 w-4" /> Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- PLAY ----
  const timePct = (timeLeft / QUESTION_TIME) * 100;
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link to="/" className="grid h-10 w-10 place-items-center rounded-xl glass" aria-label="Verlassen">
            <X className="h-4.5 w-4.5" />
          </Link>
          <div className="flex flex-1 items-center gap-2">
            {quiz.questions.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < index ? "gradient-brand" : i === index ? "bg-brand-purple/60" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setMuted((m) => !m)}
            className="grid h-10 w-10 place-items-center rounded-xl glass"
            aria-label="Ton"
          >
            {muted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-muted-foreground">
            Frage {index + 1} / {total}
          </span>
          <span className="flex items-center gap-1.5 font-bold tabular-nums text-brand-purple">
            <Zap className="h-4 w-4" /> {score.toLocaleString("de-DE")}
          </span>
        </div>

        {/* Timer */}
        <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${
              timeLeft <= 4 ? "bg-destructive" : "gradient-brand"
            }`}
            style={{ width: `${timePct}%` }}
          />
        </div>

        {/* Question */}
        <div className="rounded-3xl glass p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
              {quiz.category}
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-bold tabular-nums ${
                timeLeft <= 4 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              <Clock className="h-4 w-4" /> {timeLeft}s
            </span>
          </div>
          <h2 className="text-xl font-bold leading-snug sm:text-2xl">{question.q}</h2>

          <div className="mt-6 grid gap-3">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer;
              const isSelected = selected === i;
              let cls = "border-border bg-secondary/40 hover:border-brand-purple/60 hover:bg-secondary";
              if (locked) {
                if (isCorrect) cls = "border-success bg-success/15 text-success";
                else if (isSelected) cls = "border-destructive bg-destructive/15 text-destructive";
                else cls = "border-border bg-secondary/30 opacity-60";
              }
              return (
                <button
                  key={i}
                  disabled={locked}
                  onClick={() => handleAnswer(i)}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-all ${cls}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-background/60 text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </span>
                  {locked && isCorrect && <Check className="h-5 w-5 shrink-0 text-success" />}
                  {locked && isSelected && !isCorrect && <X className="h-5 w-5 shrink-0 text-destructive" />}
                </button>
              );
            })}
          </div>

          {locked && question.explanation && (
            <div className="mt-5 animate-fade-in rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
              💡 {question.explanation}
            </div>
          )}
          {locked && (
            <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Nächste Frage <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ResultStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-4">
      {icon}
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
