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

export const houseVsHomePost: BlogPost = {
  slug: "house-vs-home",
  title: "House vs Home",
  category: "Homes & Living",
  excerpt:
    "A house is made from walls and a roof. A home is made from the lives inside it, and construction quality quietly protects those lives every day.",
  description:
    "House vs home: discover how construction quality, waterproofing, plumbing and thoughtful finishes help turn a South Delhi property into a lasting family home.",
  date: "2026-09-29T09:00:00+05:30",
  displayDate: "29 September 2026",
  readTime: "6 min read",
  image: "/assets/blogs/house-vs-home.png",
  imageAlt:
    "House vs home comparison showing a weathered building beside a warm premium South Delhi residence",
  imageSource:
    "Original Sky Skrabers editorial illustration created for the House vs Home story.",
  keywords: [
    "house vs home",
    "difference between house and home",
    "construction quality of a house",
    "premium builder floors South Delhi",
    "South Delhi home builder",
    "Sky Skrabers",
  ],
  pullQuotes: [
    "A house keeps the weather outside. A home gives the people inside a place to breathe.",
    "Good construction is not only what a family sees on possession day; it is what they do not have to worry about years later.",
  ],
  metrics: [],
  body: [
    p(
      "opening",
      "A house is four walls enclosed by a roof. It can be measured in square feet, divided into rooms and valued by its address. But a home is built by the people within it. It is the sound of a key turning after a long day, a light left on for someone arriving late, a familiar corner where a family talks, celebrates, disagrees and finds its way back to one another.",
    ),
    p(
      "question",
      "That is the real difference in the house vs home conversation. One is a structure. The other is a feeling. Yet the feeling depends more on the structure than most buyers realise, because when something repeatedly goes wrong with your home, the problem does not remain inside a wall. It enters the family's routine.",
    ),
    h("when-home-interrupts", "When the home begins interrupting the family"),
    p(
      "rain",
      "Imagine the first heavy monsoon after moving in. A damp shadow appears in one corner of the ceiling. At first it looks harmless. Then the paint begins to bubble, the room smells different and a bed or cupboard has to be moved. Someone calls the contractor. Someone waits at home for an inspection. Someone worries that the patch will return with the next rain.",
    ),
    p(
      "plumbing",
      "A jammed pipe creates the same kind of disruption. The kitchen cannot be used normally. Water backs up in a bathroom. A plumber opens a finished wall because the service line was not planned for easy access. What looked like a small defect becomes noise, dust, missed work and a tense conversation over who will manage it.",
    ),
    p(
      "cracks",
      "Then there are the cracks. Some are only superficial and some deserve professional attention, but a family cannot know the difference merely by looking. A crack on an outside wall, broken plaster or recurring seepage creates uncertainty. Every new mark begins to feel like a question the home should never have asked.",
    ),
    p(
      "emotional-cost",
      "The repair bill matters, but it is not the only cost. There is the room that remains unusable, the weekend lost to supervision, the furniture moved away from a wet wall and the anxiety that returns whenever clouds gather. Poor construction does not simply age a building faster. It can slowly disturb the peace that made the property feel like home.",
    ),
    h("hidden", "The most important parts of a home are often the ones you cannot see"),
    p(
      "finishes",
      "Buyers naturally notice marble, lights, wardrobes, bathroom fittings and the elevation. These details matter, but they are the final layer. Long-term comfort is also decided behind the paint and below the floor: structural work, waterproofing, pipe joints, electrical planning, drainage slopes, window installation, sealants and the care taken before finishes conceal everything.",
    ),
    p(
      "waterproofing",
      "Waterproofing is not one product brushed onto a surface. It is a system of preparation, treatment, detailing and testing. Bathrooms, balconies and terraces need the correct slope so water reaches the drain instead of collecting near a joint. Pipe penetrations and window edges require careful sealing. The right material can still fail when workmanship is rushed.",
    ),
    p(
      "pipes",
      "Plumbing has the same quiet responsibility. Pipes and fittings should suit their intended use, joints should be tested before concealment and valves should remain accessible. Electrical cables, protection devices and earthing need professional design and installation. None of this produces the most glamorous possession photograph. It produces something more valuable: ordinary days that remain ordinary.",
    ),
    block(
      "quality-guide",
      "normal",
      { text: "For a practical room-by-room and stage-by-stage checklist, read " },
      {
        text: "How to Check Construction Quality of a Property",
        href: "/blogs/how-to-check-construction-quality-of-a-property",
      },
      {
        text: ". It explains what buyers can inspect, what should be documented and when professional advice is necessary.",
      },
    ),
    h("difference", "The difference between a house and a home is trust"),
    p(
      "trust",
      "A family begins turning a house into a home before the first box is unpacked. They choose a child's room, imagine parents visiting, plan the dining table and decide where morning sunlight should enter. These are emotional decisions, even when the purchase itself involves legal checks, budgets and negotiations.",
    ),
    p(
      "promise",
      "The builder therefore hands over more than a completed floor. The builder hands over a promise that the hidden work has received the same attention as the visible finish. No building is maintenance-free forever, and responsible construction cannot eliminate every future repair. It can, however, reduce avoidable failures and make maintenance more predictable and manageable.",
    ),
    p(
      "cheap",
      "This is why a cheaper material is not truly cheaper when it has to be replaced early, and rushed work is not truly faster when a family must later reopen the same wall. Value is not the lowest bill at one stage of construction. Value is the quality, performance and peace of mind that remain after possession.",
    ),
    h("sky", "How Sky Skrabers approaches the idea of home"),
    p(
      "fifteen-years",
      "For the past 15 years, families have trusted Sky Skrabers with one of the most personal decisions they will make. That trust cannot rest only on an attractive facade. It has to be earned through material selection, construction supervision, thoughtful planning, finishing and communication throughout the process.",
    ),
    p(
      "materials",
      "Our approach is to avoid short-term savings that can create long-term stress for the people who live in the building. Materials are selected for their role, not merely for a label. Waterproofing, masonry, plumbing, electrical systems, windows, stone, tiles, hardware and finishes must work together. Quality is not one premium item; it is consistency from the structure to the last detail.",
    ),
    p(
      "finishing",
      "Finishing also affects how a home feels every day. Doors should close properly. Floors should meet cleanly. Water should drain where it is meant to. Light and ventilation should support the rooms. Service areas should remain practical. These details may appear small during construction, but they shape the family's experience thousands of times after moving in.",
    ),
    block(
      "projects",
      "normal",
      { text: "See how that philosophy is taking shape across our " },
      { text: "ongoing South Delhi projects", href: "/ongoing-projects" },
      { text: ", including current opportunities in " },
      { text: "Lajpat Nagar I, II and IV", href: "/projects/lajpat-nagar-1-2" },
      { text: ", " },
      { text: "Lajpat Nagar III", href: "/projects/lajpat-nagar-3-4" },
      { text: ", " },
      { text: "East of Kailash", href: "/projects/east-of-kailash" },
      { text: " and " },
      { text: "South Extension I and II", href: "/projects/south-extension-1-2" },
      { text: ". Each project should still be evaluated on its own documents, specifications and construction stage." },
    ),
    h("happy-place", "A happy place is built before it is decorated"),
    p(
      "memories",
      "A beautiful home will eventually collect signs of life: a mark where a child's height was measured, a chair that everyone claims, photographs that slowly fill a wall and the familiar wear of years well lived. Those are the marks a family should be making, not emergency openings created to reach a failed pipe or repeated patches over a leaking ceiling.",
    ),
    p(
      "calm",
      "Good construction rarely announces itself every morning. It is present in the absence of unnecessary worry. It lets rain sound like rain instead of a warning. It lets the kitchen remain a place for breakfast instead of repair work. It lets the family focus on living rather than constantly managing the building around them.",
    ),
    block(
      "reel",
      "normal",
      { text: "Watch our Instagram reel, " },
      {
        text: "House vs Home",
        href: "https://www.instagram.com/p/Dd1guZnIh8c/",
      },
      {
        text: ", for the visual expression of this idea: four walls can create a house, but care, people and peace turn it into a home.",
      },
    ),
    h("choose", "Do not choose only the property. Choose the years that follow"),
    p(
      "buyer",
      "When comparing homes, ask what lies behind the finish. Request written specifications, visit construction in progress when permitted, examine completed work and speak with previous buyers when possible. Use qualified legal and technical professionals for independent checks. A serious builder should welcome informed questions because the family's confidence matters beyond the day of sale.",
    ),
    p(
      "ending",
      "A house can be bought in a transaction. A home is created slowly, one ordinary day at a time. Sky Skrabers builds with that future in mind: not only the day a family receives the keys, but the monsoons, mornings, celebrations and quiet evenings that come after it.",
    ),
    block(
      "contact",
      "normal",
      { text: "If you are looking for a home in South Delhi, " },
      { text: "visit the Sky Skrabers office", href: "/contact-us" },
      {
        text: " and ask us to show you the materials, work in progress and completed details for yourself. The right home should look beautiful today and continue to feel reassuring long after the first photograph is taken.",
      },
    ),
  ],
};
