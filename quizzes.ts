export type Difficulty = "easy" | "medium" | "hard";

export interface Category {
  id: string;
  name: string;
  emoji: string;
  /** tailwind gradient class pair via inline style hue */
  hue: number;
  quizCount: number;
}

export interface Question {
  q: string;
  options: string[];
  /** index of the correct option */
  answer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  emoji: string;
  difficulty: Difficulty;
  plays: number;
  rating: number;
  durationMin: number;
  isNew?: boolean;
  isDaily?: boolean;
  questions: Question[];
}

export const categories: Category[] = [
  { id: "allgemeinwissen", name: "Allgemeinwissen", emoji: "🧠", hue: 270, quizCount: 42 },
  { id: "fussball", name: "Fußball", emoji: "⚽", hue: 140, quizCount: 38 },
  { id: "bundesliga", name: "Bundesliga", emoji: "🥅", hue: 10, quizCount: 21 },
  { id: "champions-league", name: "Champions League", emoji: "🏆", hue: 250, quizCount: 18 },
  { id: "wm", name: "Weltmeisterschaften", emoji: "🌍", hue: 200, quizCount: 14 },
  { id: "geschichte", name: "Geschichte", emoji: "🏛️", hue: 35, quizCount: 27 },
  { id: "geografie", name: "Geografie", emoji: "🗺️", hue: 180, quizCount: 33 },
  { id: "mathematik", name: "Mathematik", emoji: "➗", hue: 300, quizCount: 19 },
  { id: "wissenschaft", name: "Wissenschaft", emoji: "🔬", hue: 160, quizCount: 24 },
  { id: "technik", name: "Technik", emoji: "⚙️", hue: 220, quizCount: 16 },
  { id: "computer", name: "Computer", emoji: "💻", hue: 240, quizCount: 22 },
  { id: "filme", name: "Filme", emoji: "🎬", hue: 320, quizCount: 31 },
  { id: "serien", name: "Serien", emoji: "📺", hue: 290, quizCount: 20 },
  { id: "musik", name: "Musik", emoji: "🎵", hue: 330, quizCount: 26 },
  { id: "tiere", name: "Tiere", emoji: "🦁", hue: 60, quizCount: 23 },
  { id: "essen", name: "Essen", emoji: "🍕", hue: 25, quizCount: 17 },
  { id: "autos", name: "Autos", emoji: "🏎️", hue: 5, quizCount: 15 },
  { id: "gaming", name: "Gaming", emoji: "🎮", hue: 280, quizCount: 29 },
  { id: "politik", name: "Politik", emoji: "🏳️", hue: 210, quizCount: 12 },
  { id: "wirtschaft", name: "Wirtschaft", emoji: "📈", hue: 150, quizCount: 11 },
  { id: "sport", name: "Sport", emoji: "🏅", hue: 130, quizCount: 28 },
  { id: "nba", name: "NBA", emoji: "🏀", hue: 30, quizCount: 13 },
  { id: "formel1", name: "Formel 1", emoji: "🏁", hue: 0, quizCount: 16 },
  { id: "tennis", name: "Tennis", emoji: "🎾", hue: 90, quizCount: 9 },
  { id: "olympia", name: "Olympia", emoji: "🥇", hue: 50, quizCount: 10 },
  { id: "laender", name: "Länder", emoji: "🌐", hue: 195, quizCount: 25 },
  { id: "flaggen", name: "Flaggen", emoji: "🚩", hue: 355, quizCount: 19 },
  { id: "hauptstaedte", name: "Hauptstädte", emoji: "🏙️", hue: 185, quizCount: 22 },
  { id: "sprachen", name: "Sprachen", emoji: "🗣️", hue: 260, quizCount: 8 },
  { id: "natur", name: "Natur", emoji: "🌿", hue: 145, quizCount: 18 },
];

export const difficultyLabel: Record<Difficulty, string> = {
  easy: "Leicht",
  medium: "Mittel",
  hard: "Schwer",
};

export const quizzes: Quiz[] = [
  {
    id: "allgemeinwissen-basics",
    title: "Allgemeinwissen Klassiker",
    description: "Teste dein Wissen quer durch alle Themen – von Wissenschaft bis Popkultur.",
    category: "Allgemeinwissen",
    categoryId: "allgemeinwissen",
    emoji: "🧠",
    difficulty: "easy",
    plays: 184320,
    rating: 4.8,
    durationMin: 5,
    isDaily: true,
    questions: [
      { q: "Welches Element hat das chemische Symbol 'O'?", options: ["Gold", "Sauerstoff", "Osmium", "Eisen"], answer: 1, explanation: "O steht für Oxygenium (Sauerstoff)." },
      { q: "Wie viele Kontinente gibt es?", options: ["5", "6", "7", "8"], answer: 2 },
      { q: "Wer malte die Mona Lisa?", options: ["Michelangelo", "Raffael", "Leonardo da Vinci", "Donatello"], answer: 2 },
      { q: "Welcher Planet ist der Sonne am nächsten?", options: ["Venus", "Merkur", "Mars", "Erde"], answer: 1 },
      { q: "Wie viele Beine hat eine Spinne?", options: ["6", "8", "10", "12"], answer: 1 },
      { q: "Welche Stadt ist die Hauptstadt von Australien?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2, explanation: "Canberra, nicht Sydney, ist die Hauptstadt." },
      { q: "Was ist die größte Zahl: Million, Milliarde, Billion?", options: ["Million", "Milliarde", "Billion", "Alle gleich"], answer: 2 },
      { q: "Welches Tier ist das größte der Welt?", options: ["Elefant", "Blauwal", "Giraffe", "Weißer Hai"], answer: 1 },
    ],
  },
  {
    id: "bundesliga-rekorde",
    title: "Bundesliga Rekorde & Legenden",
    description: "Vom Rekordmeister bis zum Torjäger – wie gut kennst du die Bundesliga?",
    category: "Bundesliga",
    categoryId: "bundesliga",
    emoji: "🥅",
    difficulty: "medium",
    plays: 98210,
    rating: 4.7,
    durationMin: 6,
    isNew: true,
    questions: [
      { q: "Welcher Verein ist deutscher Rekordmeister?", options: ["Borussia Dortmund", "FC Bayern München", "Werder Bremen", "Hamburger SV"], answer: 1 },
      { q: "Wer hält den Rekord für die meisten Bundesliga-Tore?", options: ["Robert Lewandowski", "Gerd Müller", "Klaus Fischer", "Miroslav Klose"], answer: 1, explanation: "Gerd Müller erzielte 365 Bundesliga-Tore." },
      { q: "In welchem Jahr wurde die Bundesliga gegründet?", options: ["1955", "1963", "1971", "1949"], answer: 1 },
      { q: "Welches Stadion hat die größte Kapazität in Deutschland?", options: ["Allianz Arena", "Signal Iduna Park", "Olympiastadion", "Veltins-Arena"], answer: 1 },
      { q: "Welcher Klub gewann 2024 die Meisterschaft erstmals?", options: ["RB Leipzig", "Bayer Leverkusen", "VfB Stuttgart", "Eintracht Frankfurt"], answer: 1, explanation: "Bayer Leverkusen wurde 2024 ungeschlagen Meister." },
      { q: "Wie viele Mannschaften spielen in der 1. Bundesliga?", options: ["16", "18", "20", "22"], answer: 1 },
      { q: "Welcher Trainer wird 'Don' genannt und prägte Mainz & Dortmund?", options: ["Jürgen Klopp", "Thomas Tuchel", "Julian Nagelsmann", "Ralf Rangnick"], answer: 0 },
      { q: "Welche Trophäe erhält der Meister?", options: ["Pokal", "Meisterschale", "Goldener Ball", "Wimpel"], answer: 1 },
    ],
  },
  {
    id: "geografie-welt",
    title: "Geografie der Welt",
    description: "Hauptstädte, Flüsse und Länder – bist du ein Geografie-Genie?",
    category: "Geografie",
    categoryId: "geografie",
    emoji: "🗺️",
    difficulty: "medium",
    plays: 142880,
    rating: 4.9,
    durationMin: 5,
    questions: [
      { q: "Was ist die Hauptstadt von Kanada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: 2 },
      { q: "Welcher ist der längste Fluss der Welt?", options: ["Amazonas", "Nil", "Jangtse", "Mississippi"], answer: 1, explanation: "Der Nil gilt traditionell als längster Fluss (Amazonas wird diskutiert)." },
      { q: "Auf welchem Kontinent liegt die Sahara?", options: ["Asien", "Afrika", "Australien", "Südamerika"], answer: 1 },
      { q: "Welches Land hat die meisten Einwohner?", options: ["China", "USA", "Indien", "Indonesien"], answer: 2, explanation: "Indien überholte China 2023 als bevölkerungsreichstes Land." },
      { q: "Welcher Berg ist der höchste der Erde?", options: ["K2", "Mount Everest", "Kilimandscharo", "Mont Blanc"], answer: 1 },
      { q: "In welchem Land liegt Machu Picchu?", options: ["Mexiko", "Peru", "Chile", "Bolivien"], answer: 1 },
      { q: "Welches Meer liegt zwischen Europa und Afrika?", options: ["Rotes Meer", "Schwarzes Meer", "Mittelmeer", "Kaspisches Meer"], answer: 2 },
      { q: "Wie viele Bundesländer hat Deutschland?", options: ["14", "15", "16", "17"], answer: 2 },
    ],
  },
  {
    id: "wissenschaft-grundlagen",
    title: "Wissenschaft & Natur",
    description: "Physik, Chemie und Biologie – verstehst du, wie die Welt funktioniert?",
    category: "Wissenschaft",
    categoryId: "wissenschaft",
    emoji: "🔬",
    difficulty: "hard",
    plays: 76540,
    rating: 4.6,
    durationMin: 7,
    questions: [
      { q: "Welches Gas atmen Pflanzen für die Fotosynthese ein?", options: ["Sauerstoff", "Stickstoff", "Kohlendioxid", "Wasserstoff"], answer: 2 },
      { q: "Wie schnell ist das Licht (ungefähr)?", options: ["300.000 km/s", "30.000 km/s", "3.000.000 km/s", "30.000.000 km/s"], answer: 0 },
      { q: "Was misst man in Pascal?", options: ["Temperatur", "Druck", "Energie", "Frequenz"], answer: 1 },
      { q: "Wie viele Knochen hat ein erwachsener Mensch?", options: ["186", "206", "226", "246"], answer: 1 },
      { q: "Welches Teilchen hat eine negative Ladung?", options: ["Proton", "Neutron", "Elektron", "Photon"], answer: 2 },
      { q: "Wer entwickelte die Relativitätstheorie?", options: ["Newton", "Einstein", "Bohr", "Hawking"], answer: 1 },
      { q: "Was ist die häufigste Blutgruppe weltweit?", options: ["0+", "A+", "B+", "AB+"], answer: 0 },
      { q: "Welcher Planet hat die meisten Monde?", options: ["Jupiter", "Saturn", "Uranus", "Neptun"], answer: 1, explanation: "Saturn hat aktuell die meisten bestätigten Monde." },
    ],
  },
  {
    id: "filme-blockbuster",
    title: "Kino & Blockbuster",
    description: "Von Hollywood bis Kult – erkennst du diese Filme und Stars?",
    category: "Filme",
    categoryId: "filme",
    emoji: "🎬",
    difficulty: "easy",
    plays: 121090,
    rating: 4.7,
    durationMin: 5,
    isNew: true,
    questions: [
      { q: "Wer spielt Jack in 'Titanic'?", options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"], answer: 1 },
      { q: "In welchem Film sagt man 'May the Force be with you'?", options: ["Star Trek", "Star Wars", "Avatar", "Guardians"], answer: 1 },
      { q: "Welcher Regisseur drehte 'Inception'?", options: ["Spielberg", "Nolan", "Tarantino", "Scorsese"], answer: 1 },
      { q: "Welche Farbe hat die Pille, die Neo in 'Matrix' nimmt?", options: ["Blau", "Grün", "Rot", "Gelb"], answer: 2 },
      { q: "Wie heißt der Löwe in 'Der König der Löwen'?", options: ["Mufasa", "Simba", "Scar", "Nala"], answer: 1 },
      { q: "Welcher Film gewann 2020 den Oscar als bester Film?", options: ["1917", "Joker", "Parasite", "Once Upon a Time"], answer: 2 },
      { q: "Wer ist Iron Man?", options: ["Steve Rogers", "Tony Stark", "Bruce Banner", "Peter Parker"], answer: 1 },
      { q: "Aus welchem Land stammt der Film 'Parasite'?", options: ["Japan", "China", "Südkorea", "Thailand"], answer: 2 },
    ],
  },
  {
    id: "geschichte-meilensteine",
    title: "Geschichte: Große Momente",
    description: "Von der Antike bis zur Moderne – kennst du die wichtigsten Ereignisse?",
    category: "Geschichte",
    categoryId: "geschichte",
    emoji: "🏛️",
    difficulty: "medium",
    plays: 64320,
    rating: 4.5,
    durationMin: 6,
    questions: [
      { q: "In welchem Jahr fiel die Berliner Mauer?", options: ["1987", "1989", "1991", "1993"], answer: 1 },
      { q: "Wer war der erste Mensch auf dem Mond?", options: ["Buzz Aldrin", "Juri Gagarin", "Neil Armstrong", "Michael Collins"], answer: 2 },
      { q: "Welches Reich baute Kolosseum und Aquädukte?", options: ["Griechen", "Römer", "Ägypter", "Perser"], answer: 1 },
      { q: "Wann begann der Erste Weltkrieg?", options: ["1912", "1914", "1916", "1918"], answer: 1 },
      { q: "Wer entdeckte 1492 Amerika für Europa?", options: ["Magellan", "Kolumbus", "Vasco da Gama", "Cook"], answer: 1 },
      { q: "Welche Königin regierte Großbritannien über 70 Jahre?", options: ["Victoria", "Elizabeth I.", "Elizabeth II.", "Anne"], answer: 2 },
      { q: "Welche Mauer trennte Ost- und Westdeutschland?", options: ["Hadrianswall", "Berliner Mauer", "Chinesische Mauer", "Limes"], answer: 1 },
      { q: "Wann endete der Zweite Weltkrieg in Europa?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
    ],
  },
  {
    id: "champions-league-historie",
    title: "Champions League Historie",
    description: "Die Königsklasse: Sieger, Stars und legendäre Finals.",
    category: "Champions League",
    categoryId: "champions-league",
    emoji: "🏆",
    difficulty: "hard",
    plays: 58110,
    rating: 4.8,
    durationMin: 6,
    questions: [
      { q: "Welcher Klub hat die meisten CL-Titel?", options: ["FC Barcelona", "Real Madrid", "AC Mailand", "Bayern München"], answer: 1, explanation: "Real Madrid führt die ewige Bestenliste deutlich an." },
      { q: "Wer ist Rekordtorschütze der Champions League?", options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Raúl"], answer: 1 },
      { q: "Wie hieß der Wettbewerb vor 1992?", options: ["UEFA Cup", "Europapokal der Landesmeister", "Supercup", "Messepokal"], answer: 1 },
      { q: "Welcher deutsche Klub gewann 2020 die CL?", options: ["Dortmund", "Leipzig", "Bayern München", "Leverkusen"], answer: 2 },
      { q: "In welcher Stadt war das 'Wunder von Istanbul' 2005?", options: ["Madrid", "Istanbul", "Mailand", "London"], answer: 1 },
      { q: "Wie viele Tore braucht man traditionell für einen Hattrick?", options: ["2", "3", "4", "5"], answer: 1 },
      { q: "Welcher Trainer gewann die CL mit Liverpool 2019?", options: ["Guardiola", "Klopp", "Mourinho", "Ancelotti"], answer: 1 },
      { q: "Welche Farbe hat der CL-Ball traditionell als Logo?", options: ["Sterne", "Streifen", "Punkte", "Ringe"], answer: 0 },
    ],
  },
  {
    id: "mathematik-logik",
    title: "Mathematik & Logik",
    description: "Zahlen, Formeln und Köpfchen – schaffst du diese Rechenaufgaben?",
    category: "Mathematik",
    categoryId: "mathematik",
    emoji: "➗",
    difficulty: "medium",
    plays: 47620,
    rating: 4.4,
    durationMin: 5,
    questions: [
      { q: "Was ist 12 × 12?", options: ["124", "132", "144", "154"], answer: 2 },
      { q: "Wie viele Grad hat ein rechter Winkel?", options: ["45", "90", "180", "360"], answer: 1 },
      { q: "Was ist die Quadratwurzel von 81?", options: ["7", "8", "9", "11"], answer: 2 },
      { q: "Wie nennt man die Zahl π (gerundet)?", options: ["2,71", "3,14", "1,61", "4,20"], answer: 1 },
      { q: "Was ist 15 % von 200?", options: ["15", "25", "30", "45"], answer: 2 },
      { q: "Welche Zahl ist eine Primzahl?", options: ["9", "15", "17", "21"], answer: 2 },
      { q: "Wie viele Seiten hat ein Hexagon?", options: ["5", "6", "7", "8"], answer: 1 },
      { q: "Was ist 2 hoch 5?", options: ["16", "25", "32", "64"], answer: 2 },
    ],
  },
  {
    id: "musik-hits",
    title: "Musik durch die Jahrzehnte",
    description: "Pop, Rock und Charts – wie gut ist dein musikalisches Gedächtnis?",
    category: "Musik",
    categoryId: "musik",
    emoji: "🎵",
    difficulty: "easy",
    plays: 89940,
    rating: 4.6,
    durationMin: 5,
    questions: [
      { q: "Welche Band sang 'Bohemian Rhapsody'?", options: ["The Beatles", "Queen", "Led Zeppelin", "Rolling Stones"], answer: 1 },
      { q: "Wer ist der 'King of Pop'?", options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"], answer: 1 },
      { q: "Wie viele Saiten hat eine Standardgitarre?", options: ["4", "5", "6", "7"], answer: 2 },
      { q: "Welche Sängerin sang 'Rolling in the Deep'?", options: ["Beyoncé", "Adele", "Rihanna", "Taylor Swift"], answer: 1 },
      { q: "Aus welchem Land kommt ABBA?", options: ["Norwegen", "Schweden", "Dänemark", "Finnland"], answer: 1 },
      { q: "Welches Instrument hat schwarze und weiße Tasten?", options: ["Geige", "Klavier", "Trompete", "Flöte"], answer: 1 },
      { q: "Wer rappt 'Lose Yourself'?", options: ["Drake", "Eminem", "Jay-Z", "Kanye West"], answer: 1 },
      { q: "Wie heißt das jährliche Musikevent in Europa?", options: ["Grammy", "Eurovision", "Brit Awards", "MTV VMA"], answer: 1 },
    ],
  },
  {
    id: "tiere-wildnis",
    title: "Tiere & Wildnis",
    description: "Vom Dschungel bis zur Tiefsee – kennst du das Tierreich?",
    category: "Tiere",
    categoryId: "tiere",
    emoji: "🦁",
    difficulty: "easy",
    plays: 73210,
    rating: 4.7,
    durationMin: 4,
    questions: [
      { q: "Welches ist das schnellste Landtier?", options: ["Löwe", "Gepard", "Gazelle", "Pferd"], answer: 1 },
      { q: "Wie viele Herzen hat ein Oktopus?", options: ["1", "2", "3", "4"], answer: 2, explanation: "Ein Oktopus hat drei Herzen." },
      { q: "Welches Tier ist das größte an Land?", options: ["Nashorn", "Elefant", "Giraffe", "Nilpferd"], answer: 1 },
      { q: "Welcher Vogel kann nicht fliegen?", options: ["Adler", "Pinguin", "Taube", "Eule"], answer: 1 },
      { q: "Wie nennt man ein Baby-Känguru?", options: ["Welpe", "Joey", "Kalb", "Fohlen"], answer: 1 },
      { q: "Welches Tier wechselt seine Farbe?", options: ["Frosch", "Chamäleon", "Schlange", "Eidechse"], answer: 1 },
      { q: "Wie viele Beine hat ein Insekt?", options: ["4", "6", "8", "10"], answer: 1 },
      { q: "Welches ist das größte Tier der Meere?", options: ["Hai", "Orca", "Blauwal", "Riesenkalmar"], answer: 2 },
    ],
  },
  {
    id: "gaming-kult",
    title: "Gaming Kult & Klassiker",
    description: "Von Retro bis Next-Gen – bist du ein echter Gamer?",
    category: "Gaming",
    categoryId: "gaming",
    emoji: "🎮",
    difficulty: "medium",
    plays: 95480,
    rating: 4.8,
    durationMin: 5,
    isNew: true,
    questions: [
      { q: "Welche Figur rettet Prinzessin Peach?", options: ["Link", "Mario", "Sonic", "Kirby"], answer: 1 },
      { q: "Welches Spiel besteht aus fallenden Blöcken?", options: ["Pac-Man", "Tetris", "Snake", "Pong"], answer: 1 },
      { q: "Welche Firma entwickelte PlayStation?", options: ["Nintendo", "Sony", "Microsoft", "Sega"], answer: 1 },
      { q: "Wie heißt der grüne Held mit Schwert von Nintendo?", options: ["Link", "Zelda", "Ganon", "Toad"], answer: 0 },
      { q: "In 'Minecraft' baust du mit ...?", options: ["Karten", "Blöcken", "Würfeln", "Steinen"], answer: 1 },
      { q: "Welcher Igel rennt durch Loopings?", options: ["Mario", "Sonic", "Crash", "Spyro"], answer: 1 },
      { q: "Was ist 'Fortnite' für ein Genre?", options: ["Rennspiel", "Battle Royale", "Puzzle", "Strategie"], answer: 1 },
      { q: "Welche Konsole ist von Microsoft?", options: ["Switch", "Xbox", "PS5", "Wii"], answer: 1 },
    ],
  },
  {
    id: "flaggen-der-welt",
    title: "Flaggen der Welt",
    description: "Erkennst du Länder an ihren Farben und Symbolen?",
    category: "Flaggen",
    categoryId: "flaggen",
    emoji: "🚩",
    difficulty: "medium",
    plays: 68870,
    rating: 4.6,
    durationMin: 5,
    questions: [
      { q: "Welche Farben hat die deutsche Flagge?", options: ["Rot-Weiß-Blau", "Schwarz-Rot-Gold", "Grün-Weiß-Rot", "Blau-Weiß-Rot"], answer: 1 },
      { q: "Welches Land hat eine Ahornblatt-Flagge?", options: ["USA", "Kanada", "Schweiz", "Japan"], answer: 1 },
      { q: "Welche Flagge zeigt einen roten Kreis auf Weiß?", options: ["China", "Südkorea", "Japan", "Vietnam"], answer: 2 },
      { q: "Welches Land hat die Tricolore Blau-Weiß-Rot?", options: ["Italien", "Frankreich", "Irland", "Belgien"], answer: 1 },
      { q: "Welche Flagge hat 50 Sterne?", options: ["Brasilien", "USA", "Australien", "EU"], answer: 1 },
      { q: "Welches Land hat eine grün-weiß-rote Flagge mit Adler?", options: ["Spanien", "Mexiko", "Portugal", "Marokko"], answer: 1 },
      { q: "Welche Flagge ist komplett grün (historisch bekannt)?", options: ["Libyen", "Saudi-Arabien", "Pakistan", "Nigeria"], answer: 0 },
      { q: "Welches Land hat das Union Jack im Eck?", options: ["Irland", "Australien", "Kanada", "Indien"], answer: 1 },
    ],
  },
];

export const quizMap = new Map(quizzes.map((q) => [q.id, q]));

export function getQuiz(id: string): Quiz | undefined {
  return quizMap.get(id);
}

export const platformStats = {
  quizzes: 1280,
  players: 248000,
  played: 5400000,
  questions: 18500,
};
