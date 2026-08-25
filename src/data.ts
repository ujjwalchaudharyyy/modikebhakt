export type Category = "Hackathons" | "Gaming" | "Cybersecurity" | "Workshops" | "Fun";

export interface FestEvent {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  team: string;
  fee: string;
  prize: string;
  icon: string;
  accent: string;
}

export const EVENTS: FestEvent[] = [
  {
    id: "hackathon",
    name: "Hackathon",
    category: "Hackathons",
    tagline: "36 hours. One breakthrough.",
    description:
      "High-energy innovation challenge to solve real-world problems under time constraints. Build, pitch and ship a working prototype before the clock runs out.",
    date: "12 Oct 2026",
    time: "10:00 AM",
    venue: "Computer Lab 1",
    team: "2–4 members",
    fee: "₹100",
    prize: "₹15,000",
    icon: "Code2",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    id: "treasure-hunt",
    name: "Treasure Hunt",
    category: "Fun",
    tagline: "Decode. Sprint. Conquer.",
    description:
      "Thrilling adventure combining logic, teamwork, observation and puzzle-solving across every corner of the campus.",
    date: "12 Oct 2026",
    time: "11:00 AM",
    venue: "Seminar Hall",
    team: "3–5 members",
    fee: "₹80",
    prize: "₹8,000",
    icon: "Map",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: "esports",
    name: "E-Sports",
    category: "Gaming",
    tagline: "Reflexes over everything.",
    description:
      "The ultimate competitive gaming arena testing strategy, reflexes and skill. BGMI, Valorant and FIFA brackets streamed live.",
    date: "12 Oct 2026",
    time: "02:00 PM",
    venue: "Computer Lab 2",
    team: "1–4 members",
    fee: "₹120",
    prize: "₹12,000",
    icon: "Gamepad2",
    accent: "from-pink-500 to-rose-500",
  },
  {
    id: "ctf",
    name: "CTF — Capture The Flag",
    category: "Cybersecurity",
    tagline: "Break it to make it.",
    description:
      "Cybersecurity challenge covering cryptography, web security, forensics and reverse engineering. Jeopardy-style scoreboard, live.",
    date: "13 Oct 2026",
    time: "04:00 PM",
    venue: "Open Ground",
    team: "2–3 members",
    fee: "₹100",
    prize: "₹10,000",
    icon: "ShieldCheck",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: "workshop",
    name: "Workshop",
    category: "Workshops",
    tagline: "Learn from the builders.",
    description:
      "Interactive hands-on learning experience led by industry experts on AI, cloud-native systems and modern product engineering.",
    date: "13 Oct 2026",
    time: "11:00 AM",
    venue: "Innovation Lab",
    team: "Individual",
    fee: "₹50",
    prize: "Certified",
    icon: "GraduationCap",
    accent: "from-sky-400 to-blue-600",
  },
  {
    id: "hacksprint",
    name: "HackSprint",
    category: "Hackathons",
    tagline: "Overnight code rush.",
    description:
      "A lightning-round overnight sprint where teams ship a micro-product in six hours flat. Caffeine strongly recommended.",
    date: "13 Oct 2026",
    time: "06:00 PM",
    venue: "Innovation Lab",
    team: "2–4 members",
    fee: "₹90",
    prize: "₹6,000",
    icon: "Zap",
    accent: "from-fuchsia-500 to-violet-600",
  },
];

export const CATEGORIES = ["All", "Hackathons", "Gaming", "Cybersecurity", "Workshops", "Fun"] as const;

export interface Slot {
  time: string;
  title: string;
  venue: string;
  tag: string;
}

export const SCHEDULE: { day: string; date: string; slots: Slot[] }[] = [
  {
    day: "Day 01",
    date: "12 October 2026",
    slots: [
      { time: "09:00 AM", title: "Opening Ceremony", venue: "Main Auditorium", tag: "Ceremony" },
      { time: "10:00 AM", title: "Hackathon Begins", venue: "Computer Lab 1", tag: "Hackathons" },
      { time: "11:00 AM", title: "Treasure Hunt", venue: "Seminar Hall", tag: "Fun" },
      { time: "01:00 PM", title: "Lunch Break", venue: "Food Court", tag: "Break" },
      { time: "02:00 PM", title: "E-Sports", venue: "Computer Lab 2", tag: "Gaming" },
      { time: "06:00 PM", title: "Tech Talk & Networking", venue: "Main Auditorium", tag: "Talk" },
    ],
  },
  {
    day: "Day 02",
    date: "13 October 2026",
    slots: [
      { time: "10:00 AM", title: "Hackathon Final Pitches", venue: "Main Auditorium", tag: "Hackathons" },
      { time: "11:00 AM", title: "Expert Workshop", venue: "Innovation Lab", tag: "Workshops" },
      { time: "01:00 PM", title: "Lunch Break", venue: "Food Court", tag: "Break" },
      { time: "04:00 PM", title: "CTF Challenge", venue: "Open Ground", tag: "Cybersecurity" },
      { time: "06:00 PM", title: "HackSprint Begins", venue: "Innovation Lab", tag: "Hackathons" },
      { time: "09:00 PM", title: "Prize Distribution & DJ Night", venue: "Central Lawn", tag: "Ceremony" },
    ],
  },
];

export const SPEAKERS = [
  {
    name: "Ananya Rawat",
    role: "Principal AI Engineer",
    org: "Zeopto Labs",
    bio: "Builds large-scale ML systems used by 40M+ users. Leads applied-research on multimodal agents and open-source LLM tooling.",
    initials: "AR",
    accent: "from-violet-500 to-fuchsia-500",
    topic: "Agents in Production",
  },
  {
    name: "Kabir Mehta",
    role: "Head of Security Research",
    org: "TechCorp",
    bio: "Ex-red-teamer with 9 years in offensive security. Author of three CVEs and mentor at national CTF bootcamps.",
    initials: "KM",
    accent: "from-emerald-400 to-teal-500",
    topic: "Breaking Modern Web Apps",
  },
  {
    name: "Ishita Sharma",
    role: "Design Director",
    org: "CloudNova.xyz",
    bio: "Design systems specialist shaping product experiences across fintech and dev-tools. Speaker at Config & Google I/O Extended.",
    initials: "IS",
    accent: "from-pink-500 to-orange-400",
    topic: "Design That Ships",
  },
  {
    name: "Rohit Bisht",
    role: "Founder & CTO",
    org: "HackNest",
    bio: "Serial builder turning campus hackathon projects into funded startups. Angel investor in 12 early-stage dev-tool companies.",
    initials: "RB",
    accent: "from-sky-400 to-blue-600",
    topic: "Zero to Startup",
  },
];

export const SPONSORS = [
  { tier: "Title Sponsors", size: "text-2xl md:text-4xl", items: ["TechCorp", "Zeopto"] },
  { tier: "Gold Sponsors", size: "text-lg md:text-2xl", items: ["DevLabs", "CloudNova.xyz", "lovable.Ai", "HackNest"] },
  { tier: "Community Partners", size: "text-base md:text-xl", items: ["GitHub Community", "GDG"] },
];

export const GALLERY = [
  { title: "Opening Ceremony '25", tag: "Main Auditorium", accent: "from-violet-600 via-indigo-600 to-sky-500", span: "md:col-span-2 md:row-span-2" },
  { title: "Hackathon Night", tag: "Lab 1", accent: "from-fuchsia-600 to-rose-500", span: "" },
  { title: "CTF Scoreboard", tag: "Open Ground", accent: "from-emerald-500 to-teal-600", span: "" },
  { title: "E-Sports Finals", tag: "Lab 2", accent: "from-orange-500 to-amber-400", span: "" },
  { title: "Robotics Expo", tag: "Central Lawn", accent: "from-cyan-500 to-blue-600", span: "" },
  { title: "Winners Podium", tag: "Auditorium", accent: "from-purple-600 to-pink-500", span: "md:col-span-2" },
  { title: "DJ Night", tag: "Central Lawn", accent: "from-indigo-600 to-violet-500", span: "" },
];

export const FAQS = [
  {
    q: "Who can participate in NIRVAN '26?",
    a: "Any student with a valid college ID from any institution across India can participate. Cross-college teams are allowed for all team events.",
  },
  {
    q: "Is there a single pass for all events?",
    a: "Yes. The NIRVAN Pass at ₹299 gives you entry to every competition, workshop and the DJ night, plus fest merchandise.",
  },
  {
    q: "Do I need a team to register?",
    a: "Not necessarily. Register solo and use the on-site Team Matchmaking desk — we'll pair you with participants who match your skill stack.",
  },
  {
    q: "Will accommodation be provided?",
    a: "Limited hostel accommodation is available for outstation participants on a first-come, first-served basis at ₹200 per night.",
  },
];

export const EVENT_START = new Date("2026-10-12T09:00:00+05:30").getTime();
