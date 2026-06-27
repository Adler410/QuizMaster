import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "./theme";

const navItems = [
  { label: "Entdecken", to: "/" as const, hash: "beliebt" },
  { label: "Kategorien", to: "/" as const, hash: "kategorien" },
  { label: "Rangliste", to: "/" as const, hash: "top-spieler" },
  { label: "Tägliches Quiz", to: "/" as const, hash: "taeglich" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl glass px-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Design wechseln"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/60 transition-colors hover:bg-secondary"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          <Link
            to="/"
            hash="suche"
            aria-label="Suchen"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/60 transition-colors hover:bg-secondary sm:hidden"
          >
            <Search className="h-4.5 w-4.5" />
          </Link>

          <button className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:block">
            Anmelden
          </button>
          <button className="hidden rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:block">
            Registrieren
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/60 md:hidden"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl glass p-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold">
                Anmelden
              </button>
              <button className="rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-white">
                Registrieren
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
