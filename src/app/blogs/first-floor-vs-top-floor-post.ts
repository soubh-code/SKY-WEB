import type { PortableTextBlock } from "next-sanity";
import type { BlogPost } from "./blog-data";

type Passage = { text: string; href?: string };

function block(key: string, style: string, ...passages: Passage[]): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: passages.flatMap((passage, index) =>
      passage.href
        ? [{ _type: "link", _key: `${key}-link-${index}`, href: passage.href }]
        : [],
    ),
    children: passages.map((passage, index) => ({
      _type: "span",
      _key: `${key}-${index}`,
      text: passage.text,
      marks: passage.href ? [`${key}-link-${index}`, "underline", "strong"] : [],
    })),
  };
}

const p = (key: string, text: string) => block(key, "normal", { text });
const h = (key: string, text: string) => block(key, "h2", { text });

export const firstFloorVsTopFloorPost: BlogPost = {
  slug: "first-floor-vs-top-floor-in-lajpat-nagar-which-one-should-you-buy",
  title: "First Floor vs Top Floor in Lajpat Nagar: Which One Should You Buy?",
  category: "Buyer Guides",
  excerpt:
    "You fell in love with the terrace. Your family preferred the first floor. Before deciding, picture an ordinary Tuesday in both homes.",
  description:
    "Comparing property for sale in Lajpat Nagar? Weigh first-floor access against top-floor privacy, terrace use, summer comfort and the price you actually pay.",
  date: "2026-11-08T09:00:00+05:30",
  displayDate: "8 November 2026",
  readTime: "6 min read",
  image: "/assets/blogs/first-floor-vs-top-floor-lajpat-nagar.png",
  imageAlt:
    "Editorial cutaway illustration comparing lower-floor living and a top-floor home with terrace in Lajpat Nagar",
  imageSource: "Original AI-generated editorial illustration, not a photograph or sanctioned plan of a Sky Skrabers project.",
  keywords: [
    "first floor vs top floor in Lajpat Nagar",
    "property for sale in Lajpat Nagar",
    "builder floors in Lajpat Nagar",
    "top floor with terrace in Lajpat Nagar",
    "first floor in Lajpat Nagar",
    "South Delhi builder floors",
  ],
  pullQuotes: [
    "Choose the floor that improves your ordinary Tuesday, not only your imaginary Sunday evening.",
    "A terrace has value when its rights, usability and upkeep fit the life you will actually live.",
  ],
  metrics: [],
  body: [
    p("opening", "You walk onto the terrace and the decision feels made. There is room for plants, a table for winter lunches and the evening sky above your own home. Downstairs, your parents have already chosen the first floor. Fewer stairs. An easier arrival. Less to think about."),
    p("dilemma", "Both sides have a point. When comparing property for sale in Lajpat Nagar, the first-floor-versus-top-floor debate is really a conversation about how your family wants to live. The brochure cannot settle it. Neither can the confident advice that one floor is always the better investment."),
    p("answer", "A first floor may suit buyers who prioritise easier access and fewer stairs when needed. A top floor may suit buyers who value privacy from occupants above and outdoor space, where terrace rights are included and verified. The better purchase depends on the actual building, the documents and your daily routine. Start there, before comparing the asking prices."),
    h("tuesday", "Picture an ordinary Tuesday, not just a Sunday evening"),
    p("routine", "Imagine leaving for work while a parent returns from a walk, groceries arrive and someone needs to bring a suitcase upstairs. Now imagine the lift is temporarily unavailable. Would everyone still manage comfortably? Walk the route from the parking space to each flat. Check steps at the entrance, landings, door widths and the distance between the lift and the front door."),
    p("access", "A lower floor is not automatically accessible: an awkward entry staircase can undermine its advantage. Equally, a well-planned top-floor home with a reliable lift may work beautifully for a family. Ask about servicing, backup arrangements and how residents handle breakdowns. Also confirm the exact level on the plan; ground, upper-ground and first-floor labels can be used differently in listings."),
    h("terrace", "The terrace question has two answers: ownership and enjoyment"),
    p("terrace-rights", "Standing on a terrace during a viewing does not tell you what you are buying. Ask your property lawyer to establish the rights included in the proposed sale, any shared access and how services such as water tanks will be reached. Have the relevant documents reviewed before treating outdoor space as part of the price. Do not assume you can add a room or cover an open area merely because you can access it."),
    p("terrace-life", "Then ask the more personal question: how often will you use it? A terrace can be wonderful for winter mornings, gardening or family meals. But cleaning, weather exposure, drainage and upkeep are part of ownership too. Look at the usable space after stairs and services, the privacy from neighbouring buildings and how easily food, furniture or gardening supplies can be carried there."),
    p("terrace-value", "If outdoor living is already part of your routine, the space may be worth a premium to you. If it is mainly a beautiful possibility you rarely act on, consider whether the same budget would improve the rooms you use every day. The right answer can differ even between two buyers with identical budgets."),
    h("light", "Height can change the view; it does not guarantee a bright home"),
    p("daylight", "Visit both floors with the lights switched off. Look at the bedrooms as carefully as the drawing room. A higher floor may clear nearby obstructions, but a neighbouring building, a deep balcony or an enclosed shaft can still affect daylight. A lower floor facing an open park may feel brighter than an upper floor facing a close wall."),
    p("noise", "Listen with windows open and closed. Street activity, a nearby commercial entrance, equipment on the roof and the position of adjoining homes all deserve attention. A top floor removes the question of another occupied flat immediately above, but it does not automatically remove noise. Inspect the specific property instead of buying a generalisation about height."),
    h("comfort", "Summer comfort is a construction question as well as a floor question"),
    p("roof", "For a home directly beneath the roof, ask how the roof assembly addresses heat and water. Request the relevant specifications and have a qualified professional assess them. Window orientation, shading, glazing and ventilation also matter. A cool evening viewing cannot tell you everything about an afternoon in summer."),
    p("quality", "Inspect the first floor just as seriously. Look for damp patches, repair history and service access. Ask how bathrooms, balconies and drainage have been handled. A floor's position cannot compensate for weak execution, and attractive stonework cannot explain what sits behind a wall."),
    block("quality-link", "normal", { text: "Our guide to " }, { text: "checking construction quality before buying a property", href: "/blogs/how-to-check-construction-quality-of-a-property" }, { text: " explains the questions to take beyond the visible finishes. Use it alongside a professional inspection, especially when comparing buildings of different ages." }),
    h("price", "Compare what the price includes before deciding which floor is cheaper"),
    p("comparison", "A first floor and a top floor in different blocks are not a clean comparison. Keep location, plot size, usable area, age, parking, lift provision, condition and construction stage as similar as possible. Then identify what the extra money buys: outdoor rights, a better view, different specifications or simply a seller's expectation."),
    p("example", "Suppose one floor is offered at ₹2.40 crore and another at ₹2.70 crore. That is a ₹30 lakh difference before transaction costs. These are hypothetical figures, not current Lajpat Nagar quotes. Ask yourself whether the second option gives your household ₹30 lakh worth of additional utility, and how the extra purchase cost affects your remaining budget."),
    block("price-link", "normal", { text: "For more context on differences between age, amenities and local pockets, see our " }, { text: "Lajpat Nagar 2BHK price guide", href: "/blogs/prices-for-2bhk-in-lajpat-nagar-area" }, { text: ". Reconfirm asking prices when enquiring; a published example is not a live offer." }),
    h("resale", "Your next buyer may want a different life from yours"),
    p("future", "A family with mobility concerns may prioritise convenient access. Another buyer may be searching specifically for a top floor with terrace in Lajpat Nagar. Neither preference proves that one category always resells faster or appreciates more. Ask for comparable evidence and consider the total price, upkeep and number of buyers likely to find that particular home suitable."),
    p("family", "For self-use, do not let a speculative resale prediction outweigh years of daily comfort. Think about changes your family can reasonably anticipate: children growing older, parents moving in, working from home or needing an extra room. Buy enough flexibility for that life without paying for features you are unlikely to use."),
    block("reel", "normal", { text: "This is the idea behind our " }, { text: "House vs Home Instagram reel", href: "https://www.instagram.com/p/Dd1guZnIh8c/" }, { text: ": the building is only the beginning. The way it supports the people inside is what makes the decision personal." }),
    h("compare-sites", "Ask Sky Skrabers to show you the difference in person"),
    p("brand", "Sky Skrabers' approach to South Delhi homes gives you a useful starting point for this conversation: compare the site, the planning and the proposed finish together. Ask the team to show available options that fit your budget, explain the access and specifications, and help you understand the practical differences between floors. A good site visit should make the choice clearer, not simply make every property sound perfect."),
    block("project-links", "normal", { text: "Explore the " }, { text: "Lajpat Nagar I, II and IV project page", href: "/projects/lajpat-nagar-1-2" }, { text: ", the " }, { text: "Lajpat Nagar III project page", href: "/projects/lajpat-nagar-3-4" }, { text: " and the wider " }, { text: "ongoing Sky Skrabers projects", href: "/ongoing-projects" }, { text: ". Confirm which floors are available and what each offer includes before arranging your comparison." }),
    p("references", "Ask to see completed work as well as the floor being offered. Where previous customers consent and are available, a conversation about living in their home can add context to the specifications. This is where attention to construction and finishing becomes more meaningful than a sales adjective."),
    h("decision", "The better floor is the one you can explain without the sales pitch"),
    p("conclusion", "After both visits, write down what each home makes easier and what each asks you to compromise. A first floor may win because everyday movement matters most. A top floor may win because verified outdoor space and its particular layout genuinely fit your life. Either decision can be sensible when the price, quality and paperwork support it."),
    block("contact", "normal", { text: "When shortlisting property for sale in Lajpat Nagar, bring that comparison to a " }, { text: "Sky Skrabers site-visit conversation", href: "/contact-us" }, { text: ". Choose the floor that improves your ordinary Tuesday. You will live far more of those than brochure-perfect Sunday evenings." }),
  ],
};
