// Edit everything in this file — it's the only place with real content.
// No design or layout code lives here, just data.

export const SERVER_NAME = "DELTA ROLEPLAY";
export const BRAND_SUB = "TUNISIAN SERVER";
export const SEASON_LABEL = "Season Beta";
export const TAGLINE = "A Tunisian GTA roleplay city that never quite sleeps.";

// Whitelist keeps its own project for now — this is the only link that
// still points outside this site.
export const WHITELIST_URL = "https://delta-whitelist-review.vercel.app";

// The three items shown in the "Applications" dropdown in the nav.
export const APPLICATIONS = [
  { label: "Staff Application", href: "/applications/staff", external: false },
  { label: "Whitelist Application", href: WHITELIST_URL, external: true },
  { label: "Faction Application", href: "/applications/faction", external: false },
];

export const STORY = [
  {
    title: "The Fall of the Golden Pact",
    body: "After years of domination, the Golden Pact collapsed following the betrayal of one of its members. The leaders of the three major families disappeared under mysterious circumstances. No one knows if they are dead or if they are still watching the city from the shadows.",
  },
  {
    title: "The Golden Pact",
    body: 'Before their disappearance, they left behind a secret document called the "Golden Pact". This document designates who has the right to rule Delta. However, it was divided into several fragments hidden in different locations across the city.',
  },
  {
    title: "The Triangle Vault",
    body: "At the heart of Delta lies a secret vault containing an immense fortune: money, gold, weapons, and documents revealing the secrets of the most influential figures. It can only be opened after gathering all the keys scattered among the old families and various organizations.",
  },
  {
    title: "The Guardians of Delta",
    body: "The police force was reorganized to restore security. However, within it exists a secret unit called the Guardians of Delta, whose true mission is to protect the city's legacy and prevent any single organization from taking total control.",
  },
  {
    title: "The Gangs",
    body: "Every gang is convinced that they are the true heirs of Delta. They all try to control the neighborhoods, the port, the warehouses, and the black market to rebuild their own empire.",
  },
  {
    title: "RP Events",
    bullets: [
      "Searching for the fragments of the Golden Pact.",
      "Wars between gangs and police.",
      "Underground auctions for rare weapons.",
      'Appearance of a mysterious character called "The Heir".',
    ],
  },
  {
    title: "Monthly Event",
    subtitle: '"The Night of the Golden Triangle"',
    body: "A monthly event where new secret locations open up, new alliances and rivalries emerge, and this event can decide who takes control of Delta.",
  },
];

export const STAFF = {
  owner: { name: "Add owner name", role: "Owner" },
  management: [
    { name: "Community Manager", role: "Management" },
    { name: "Head Developer", role: "Management" },
    { name: "Head of Staff", role: "Management" },
  ],
  support: [
    { name: "Moderator", role: "Support" },
    { name: "Moderator", role: "Support" },
    { name: "Support Agent", role: "Support" },
    { name: "Support Agent", role: "Support" },
  ],
};

export const VEHICLES = {
  cars: ["Nightshade GT", "Vantage RS", "Ironclad V8", "Skyline Custom", "Obsidian Coupe", "Delta Interceptor"],
  motos: ["Ridgeback 900", "Nightfall Chopper", "Vector Sport", "Blackline Cruiser"],
};

export const PROPERTY = {
  business: [
    {
      name: "Cool Beans Coffee",
      images: ["/business/cool-beans/3.jpg", "/business/cool-beans/1.jpg", "/business/cool-beans/2.jpg", "/business/cool-beans/4.webp"],
    },
    {
      name: "Burger Shot",
      images: ["/business/burger-shot/1.jpg", "/business/burger-shot/2.jpg", "/business/burger-shot/3.jpg"],
    },
    {
      name: "Legion Square Coffee",
      images: [
        "/business/legion-square-coffee/1.jpg",
        "/business/legion-square-coffee/2.jpg",
        "/business/legion-square-coffee/3.jpg",
        "/business/legion-square-coffee/4.png",
      ],
    },
    {
      name: "Gear Tech Mechanic",
      images: [
        "/business/gear-tech-mechanic/1.webp",
        "/business/gear-tech-mechanic/2.jpg",
        "/business/gear-tech-mechanic/3.jpg",
        "/business/gear-tech-mechanic/4.jpg",
        "/business/gear-tech-mechanic/5.webp",
      ],
    },
  ],
  houses: ["Harbor View Loft", "Suburban Cul-de-Sac", "Highrise Penthouse", "Lakeside Cottage"],
};

export const PEDS = {
  male: ["Street Casual", "Business Formal", "Off-Duty Officer", "Dock Worker"],
  female: ["Downtown Chic", "Business Formal", "Off-Duty Officer", "Studio Casual"],
};
