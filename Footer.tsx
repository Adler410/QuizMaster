import { Logo } from "logo";

const cols = [
  {
    title: "Plattform",
    links: ["Beliebte Quizze", "Neue Quizze", "Kategorien", "Tägliche Challenge"],
  },
  { title: "Community", links: ["Rangliste", "Erfolge", "Quiz erstellen", "Spieler folgen"] },
  { title: "Unternehmen", links: ["Über uns", "Blog", "Karriere", "Kontakt"] },
  { title: "Rechtliches", links: ["Datenschutz", "Impressum", "AGB", "Cookies"] },
];

export function Footer() {
  return (
    <footer className="mt-20 px-3 pb-8">
      <div className="mx-auto max-w-6xl rounded-3xl glass p-8 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Die moderne Quiz-Plattform für tausende Themen. Spielen, lernen und gegen die ganze
              Welt antreten.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-bold">{col.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} QuizMaster. Alle Rechte vorbehalten.</p>
          <p>Mit ❤️ gebaut für Quiz-Fans.</p>
        </div>
      </div>
    </footer>
  );
}
