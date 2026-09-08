import type { PortableTextBlock } from "next-sanity";
import type { BlogPost } from "./blog-data";

type Passage = { text: string; href?: string };

function block(key: string, style: string, ...passages: Passage[]): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: passages.flatMap((passage, index) =>
      passage.href ? [{ _type: "link", _key: `${key}-link-${index}`, href: passage.href }] : [],
    ),
    children: passages.map((passage, index) => ({
      _type: "span",
      _key: `${key}-${index}`,
      text: passage.text,
      marks: passage.href ? [`${key}-link-${index}`] : [],
    })),
  };
}

const paragraph = (key: string, text: string) => block(key, "normal", { text });
const heading = (key: string, text: string) => block(key, "h2", { text });

export const lajpatNagar2BhkPost: BlogPost = {
  slug: "prices-for-2bhk-in-lajpat-nagar-area",
  category: "Market Intelligence",
  title: "Prices for 2BHK in Lajpat Nagar Area: A Block-by-Block Guide",
  excerpt: "Two neighbouring blocks, two very different prices. Compare older 2BHK floors, new lift-and-parking homes and the location premiums that shape Lajpat Nagar asking prices.",
  description: "Explore 2BHK prices in Lajpat Nagar: indicative asking prices for older and new builder floors, block differences, parking, terrace rights and rental yields.",
  date: "2026-09-09T09:00:00+05:30",
  displayDate: "9 September 2026",
  readTime: "6 min read",
  image: "/assets/blogs/prices-for-2bhk-in-lajpat-nagar-area.webp",
  imageAlt: "Illustration of four Lajpat Nagar-style builder-floor houses with price? and lajpat nagar lettering",
  imageSource: "AI-generated conceptual illustration; not photographs of listed properties.",
  keywords: ["prices for 2BHK in Lajpat Nagar", "2BHK builder floor Lajpat Nagar", "2BHK price Lajpat Nagar 2", "property for sale in Lajpat Nagar", "Lajpat Nagar flat prices", "Sky Skrabers"],
  pullQuotes: ["A few steps can change the address. The address can change the asking price.", "Compare the block, building and rights, not just the number of bedrooms."],
  metrics: [],
  body: [
    paragraph("opening", "People often ask what are the prices of 2BHK floors in Lajpat Nagar, but there is no single price. Every part of Lajpat Nagar has a different price, and prices can differ substantially from one block to another."),
    paragraph("neighbours", "Take Lajpat Nagar II's M Block and neighbouring Vinobapuri. In Sky Skrabers' local market experience, asking prices for otherwise comparable floors can differ by Rs 90 lakh to Rs 1 crore. They are so close that, figuratively, you could have one leg in M Block and the other in Vinobapuri. Yet the property market can treat them very differently."),
    paragraph("basis", "The figures below are Sky Skrabers' indicative asking-price guidance as of 9 September 2026, not independently verified transaction averages or a valuation of every 2BHK. Actual quotations depend on size, exact block, condition and ownership rights. Confirm current availability and the complete purchase cost before deciding."),
    heading("why", "Why two 2BHK floors can have very different prices"),
    paragraph("differences", "Two bedrooms describe a configuration, not a standard product. A compact older floor without parking is not directly comparable with a spacious new floor offering a lift, stilt parking and better light. Even matching floor areas can conceal different room proportions, road widths, building ages and maintenance needs."),
    paragraph("park", "Location within a block matters too. A park-facing floor may attract an asking premium of around 15-20% in the comparisons we encounter. That is an indicative range, not an automatic surcharge: the actual view, sunlight, road activity and the quality of the alternative property all matter. Visit at different times before paying for a location advantage."),
    heading("new", "New 2BHK floors: lift, parking and terrace premiums"),
    paragraph("new-prices", "For selected newly built 2BHK floors in Lajpat Nagar I and II with lift access and stilt parking, our indicative middle-floor asking price is around Rs 2.5 crore. Ground-floor offerings can be quoted around Rs 2.8 crore, while a third floor with terrace rights may carry an asking price around Rs 3.5 crore."),
    paragraph("rights", "These are different property offerings, not a price list for one building. In a stilt-parking building, clarify which residential level the seller calls the ground floor. Confirm the sanctioned layout, actual floor number, exclusive parking allocation, lift access and documented terrace rights. A terrace premium makes sense only when the rights and permitted use are clear."),
    block("project-link", "normal", { text: "To compare locations and construction stages, explore our " }, { text: "ongoing Lajpat Nagar I, II and IV projects", href: "/projects/lajpat-nagar-1-2" }, { text: ". The portfolio includes different property sizes; enquire specifically about currently available 2BHK options rather than assuming every listed project offers them." }),
    heading("old", "Older 2BHK homes: approximately Rs 1.30-2 crore"),
    paragraph("old-prices", "Older buildings without stilt parking or a lift can offer a lower entry point. In Lajpat Nagar I and II, our indicative asking range starts around Rs 1.30 crore and extends towards Rs 2 crore for well-maintained homes. Exact size, floor, lane and condition can move a property outside this range."),
    paragraph("old-check", "A lower purchase price needs to be considered alongside renovation costs. Check plumbing, wiring, dampness, waterproofing, stairs and practical parking. An attractive interior does not establish structural condition. For an older building, obtain an appropriate independent inspection and legal review rather than assuming redevelopment will deliver a future windfall."),
    heading("four", "Lajpat Nagar IV: a different budget equation"),
    paragraph("four-prices", "Buyers comparing Lajpat Nagar IV with parts I and II may find asking prices around 10-12% lower in the comparable options we see. This is a local working estimate, not a uniform discount across every street. A superior home in part IV can still cost more than a compromised one elsewhere."),
    paragraph("four-value", "For a buyer with a fixed budget, that difference may create room for better maintenance, a preferred floor or future interiors. Compare like for like: usable area, age, parking, access and documentation. The cheaper address is not necessarily the better purchase, but neither should it be dismissed without a visit."),
    heading("three", "Why Lajpat Nagar III belongs in a separate comparison"),
    paragraph("three-context", "Lajpat Nagar III's quieter residential character and relatively limited commercial activity can command a substantial premium. Much of the floor inventory is on larger plots of approximately 150-400 square yards. These larger homes are not equivalent to the compact 2BHK options discussed above."),
    block("three-link", "normal", { text: "Our indicative guidance for older larger floors with lift and stilt parking starts around Rs 5 crore; selected floors on roughly 350-square-yard plots can carry asking prices of Rs 12-14 crore. Do not treat these as standard 2BHK rates. View the " }, { text: "Lajpat Nagar III project portfolio", href: "/projects/lajpat-nagar-3-4" }, { text: " for the separate larger-home context." }),
    heading("investment", "Investment: understand rental yield before appreciation"),
    paragraph("yield", "Residential property in Lajpat Nagar may offer an indicative annual gross rental yield around 3-3.5%, depending on purchase price and achievable rent. For illustration, a Rs 2 crore purchase yielding 3% produces Rs 6 lakh a year, or Rs 50,000 a month, before expenses. This is arithmetic, not a rental quotation or guarantee."),
    paragraph("net", "Vacancy, repairs, maintenance, taxes and financing reduce the amount retained. Stamp duty, registration and other acquisition costs also affect returns. Property values in established Lajpat Nagar pockets have increased over time, but future appreciation is uncertain. Judge the investment on realistic rental evidence and your holding period, not a promised resale profit."),
    heading("builder", "Sky Skrabers: local experience, materials and delivery"),
    paragraph("experience", "Established in 2011 and now in its sixteenth calendar year, Sky Skrabers has focused on South Delhi homes, particularly Lajpat Nagar. With 13 current projects highlighted by the company, buyers can compare opportunities rather than being limited to one address. Current inventory and possession timelines should be confirmed individually."),
    paragraph("quality", "Our focus is quality structures, thoughtfully selected materials, classy proportions and disciplined delivery. Look beyond surface finishes: ask about structural specifications, waterproofing, electrical and plumbing work, windows and the agreed finish schedule. Inspect completed homes and obtain written milestones. Quality and timely delivery should be assessed through actual work and project commitments, not adjectives alone."),
    block("reels", "normal", { text: "For a closer look at the design, watch " }, { text: "this featured Sky Skrabers Instagram reel", href: "https://www.instagram.com/p/Dc8FnJAqYOw/" }, { text: " and browse " }, { text: "our latest Instagram Reels", href: "https://www.instagram.com/sky.skrabers/reels/" }, { text: ". Use the videos to shortlist design preferences, then inspect the specific property; a reel may feature a different project or construction stage." }),
    heading("conclusion", "What should your next step be?"),
    block("next", "normal", { text: "Start with the block, budget and non-negotiables: parking, lift, floor level, size and possession date. Then compare " }, { text: "Sky Skrabers' ongoing South Delhi projects", href: "/ongoing-projects" }, { text: " and " }, { text: "contact our team", href: "/contact-us" }, { text: " for current 2BHK availability. The right property for sale in Lajpat Nagar is not simply the cheapest listing. It is the home whose location, condition, rights and total cost make sense together." }),
  ],
};
