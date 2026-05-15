export const depopLink = "https://www.depop.com/gutterfairystudio/";
export const instagramLink = "https://www.instagram.com/gutterfairystudios/";
export const workshopLink =
  "https://partiful.com/e/ZVIPIO9rvb4uA7FjX4ei?";

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
  body?: string[];
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
  body: string[];
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
    date: "June 14th",
    title: "PATCH BAR",
    summary: "",
    details: "",
    body: [
      "SCRAP SOCIAL ✶ patch bar happy hour",
      "we’re kicking off our first monthly upcycling night in downtown Reno ♡",
      "this beginner-friendly session is all about learning simple hand sewing, making your own patch, and customizing your clothes in community.",
      "show up with something you want to rework and leave with a finished piece you can wear all year long.",
    ],
    href: workshopLink,
    cta: "RSVP",
    image: "/Scraps%20Social%20Patch%20Bar.png",
    imageAlt: "Scraps Social Patch Bar poster",
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
    body: [
      "Every week we search thrift stores, estate sales, donation piles, and the bins to find clothing with good bones, unique textures, and personality.",
    ],
  },
  {
    title: "CLEANING",
    body: [
      "Differnent fabrics need special care. Once pieces make it back to the studio, everything is carefully cleaned, repaired, and refreshed by hand.",
    ],
  },
  {
    title: "THE DROP",
    body: [
      "Every week we post fresh thrift finds, vintage gems, and chaotic little treasures on TikTok and Instagram before they hit the shop. Thursday hauls, Friday story sales, and weekly Depop drops keep the rotation moving .",
    ],
  },
  {
    title: "REWORKING",
    body: [
      "Not everything is wearable but that doesn't mean it's trash so reworking is a huge part of our process. Some pieces get patched, dyed, embroidered, altered, or completely transformed into something new.",
    ],
  },
  {
    title: "DESIGNING",
    body: [
      "Looking for something more personal? We also create one-of-one custom pieces using secondhand textiles, handmade patches, embroidery, appliqué, and upcycled materials. Whether you have a vision already or just a vibe in mind, we can build something together that feels uniquely yours.",
    ],
  },
  {
    title: "GET INVOLVED",
    body: [
      "Fast fashion creates an overwhelming amount of textile waste, but small choices made in community still matter. Shopping secondhand, repairing clothes, reworking old pieces, and learning creative skills all help keep textiles in circulation longer instead of ending up in landfill.",
      "If you want to be part of it, join us at SCRAP SOCIAL every second Sunday of the month to learn how to rework your clothes, connect with community, and give forgotten pieces a second life.",
    ],
  },
];
