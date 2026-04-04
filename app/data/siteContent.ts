export const depopLink = "https://www.depop.com/gutterfairystudio/";
export const instagramLink = "https://www.instagram.com/gutterfairystudios/";
export const workshopLink =
  "https://partiful.com/e/aKkRd9JI82mygBcxJh9A?c=EDVEI04n";

export type CatalogItem = {
  id: string;
  title: string;
  image: string;
  label: string;
  source: "patch" | "depop";
};

export type NewestAddition = {
  id: string;
  title: string;
  image: string;
  meta: string;
  description: string;
  patchTitle: string;
};

export type HomeNewsItem = {
  id: string;
  date: string;
  title: string;
  summary: string;
  details: string;
  href: string;
  cta: string;
  image?: string;
  imageAlt?: string;
};

export type AboutHighlight = {
  title: string;
  body: string;
  note: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export const designCatalog: CatalogItem[] = [
  { id: "milf-1", title: "MILF", image: "/MILF.jpg", label: "made to order", source: "patch" },
  { id: "curb-kisser-1", title: "Curb Kisser", image: "/Curb Kisser.jpg", label: "custom patch", source: "patch" },
  { id: "food-kitty-1", title: "Food Kitty", image: "/Food Kitty.jpg", label: "stitched favorite", source: "patch" },
  { id: "love-to-death-1", title: "Love to Death", image: "/Love to Death.jpg", label: "made to order", source: "patch" },
  { id: "dj-a-1", title: "DJ A", image: "/DJ A.jpg", label: "custom patch", source: "patch" },
  { id: "fan-1", title: "Fan", image: "/Fan.jpg", label: "stitched favorite", source: "patch" },
  { id: "grabs-back-1", title: "Grabs Back", image: "/Grabs Back.jpg", label: "made to order", source: "patch" },
  { id: "milk-1", title: "MILK", image: "/MILK.jpg", label: "custom patch", source: "patch" },
  { id: "spiral-1", title: "Spiral", image: "/Spiral.jpg", label: "stitched favorite", source: "patch" },
  { id: "sunny-1", title: "Sunny", image: "/Sunny.jpg", label: "made to order", source: "patch" },
  { id: "y2k-heart-1", title: "Y2K Heart", image: "/Y2K Heart.jpg", label: "custom patch", source: "patch" },
  { id: "fairy-1", title: "Fairy", image: "/Fairy.jpg", label: "stitched favorite", source: "patch" },
];

export const newestAdditions: NewestAddition[] = [
  {
    id: "addition-love-to-death",
    title: "Love to Death",
    image: "/Love to Death.jpg",
    meta: "Newest Patch",
    description: "Made-to-order patch with stitched edge detail.",
    patchTitle: "Love to Death",
  },
  {
    id: "addition-food-kitty",
    title: "Food Kitty",
    image: "/Food Kitty.jpg",
    meta: "Newest Patch",
    description: "Playful stitched patch pulled into the newest menu update.",
    patchTitle: "Food Kitty",
  },
  {
    id: "addition-curb-kisser",
    title: "Curb Kisser",
    image: "/Curb Kisser.jpg",
    meta: "Newest Patch",
    description: "Custom patch favorite pulled into the latest drop.",
    patchTitle: "Curb Kisser",
  },
  {
    id: "addition-y2k-heart",
    title: "Y2K Heart",
    image: "/Y2K Heart.jpg",
    meta: "Newest Patch",
    description: "Retro heart patch built to feel loud, glossy, and stitched by hand.",
    patchTitle: "Y2K Heart",
  },
  {
    id: "addition-milf",
    title: "MILF",
    image: "/MILF.jpg",
    meta: "Newest Patch",
    description: "Bold letter patch from the catalog, ready for custom thread colors.",
    patchTitle: "MILF",
  },
  {
    id: "addition-fairy",
    title: "Fairy",
    image: "/Fairy.jpg",
    meta: "Newest Patch",
    description: "Fairy patch pulled forward as one of the current favorites in the lineup.",
    patchTitle: "Fairy",
  },
];

export const homeNews: HomeNewsItem[] = [
  {
    id: "news-patch-bar",
    date: "Jun 21",
    title: "Patch Bar workshop",
    summary: "Beginner-friendly patch night in Reno with space to make one patch and take it home the same day.",
    details: "This one is set up for beginners, so you can show up, learn the basics, make your patch on site, and leave with something finished instead of half-started.",
    href: workshopLink,
    cta: "RSVP",
    image: "/patch-bar-poster.png",
    imageAlt: "Gutter Fairy Patch Bar poster",
  },
  {
    id: "news-stitch-table",
    date: "Soon",
    title: "Open stitch table",
    summary: "Bring a jacket, jeans, or a tote and spend a night figuring out how to rework it with everyone else in the room.",
    details: "Less formal class, more shared table energy. Expect patch placement ideas, sewing help, and a reason to finally use the piece you keep meaning to fix.",
    href: instagramLink,
    cta: "Details on IG",
  },
  {
    id: "news-closet-rescue",
    date: "TBA",
    title: "Closet rescue hang",
    summary: "Secondhand swap energy with mending, patch planning, and rescued pieces coming back into rotation.",
    details: "Think of it like a small creative hang built around clothes that still deserve a second life instead of getting tossed aside.",
    href: instagramLink,
    cta: "Ask for next date",
  },
];

export const aboutHighlights: AboutHighlight[] = [
  {
    title: "No overproduction",
    body: "I do not stockpile inventory. I drop what I find and keep it small on purpose.",
    note: "less waste, better weird stuff",
  },
  {
    title: "Rewear and reuse",
    body: "Refuse to feed the machine and buy rescued pieces, re-worn on purpose.",
    note: "good clothes deserve another life",
  },
  {
    title: "Community first",
    body: "Events, collabs, and creative hangouts matter more than mindless consumption.",
    note: "shopping is only part of the story",
  },
];

export const shopSteps: ProcessStep[] = [
  {
    title: "SOURCING",
    body: "We dig for pieces worth saving—good bones, worn-in, a little imperfect.",
  },
  {
    title: "CLEANING",
    body: "Everything gets stripped back and reset.",
  },
  {
    title: "REWORKING",
    body: "Paint, thread, patches—done by hand, no two the same.",
  },
  {
    title: "DESIGNING",
    body: "Built to be added, layered, and made your own.",
  },
];
