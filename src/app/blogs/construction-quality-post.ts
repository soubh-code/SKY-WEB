import type { PortableTextBlock } from "next-sanity";
import type { BlogPost } from "./blog-data";

type Passage = { text: string; href?: string };

function block(key: string, style: string, ...passages: Passage[]): PortableTextBlock {
  return {
    _type: "block", _key: key, style,
    markDefs: passages.flatMap((passage, index) => passage.href
      ? [{ _type: "link", _key: `${key}-link-${index}`, href: passage.href }] : []),
    children: passages.map((passage, index) => ({
      _type: "span", _key: `${key}-${index}`, text: passage.text,
      marks: passage.href ? [`${key}-link-${index}`, "underline", "strong"] : [],
    })),
  };
}

const p = (key: string, text: string) => block(key, "normal", { text });
const h = (key: string, text: string) => block(key, "h2", { text });

export const constructionQualityPost: BlogPost = {
  slug: "how-to-check-construction-quality-of-a-property",
  title: "How to Check Construction Quality of a Property",
  category: "Construction & Design",
  excerpt: "A Rs 10 lakh saving can look attractive until repair bills arrive. Learn what to inspect, which material specifications to request and why speaking to previous buyers matters.",
  description: "Learn how to check construction quality of a property, from concrete and steel to waterproofing, wiring and finishes, with a practical homebuyer checklist.",
  date: "2026-09-14T09:00:00+05:30",
  displayDate: "14 September 2026",
  readTime: "6 min read",
  image: "/assets/blogs/how-to-check-construction-quality-of-a-property.webp",
  imageAlt: "Sky Skrabers builder-floor facade with curved balconies, glass railings and a gated entrance",
  imageSource: "Photograph supplied by Sky Skrabers.",
  keywords: ["how to check construction quality of a property", "construction quality checklist", "builder floor construction quality", "building materials for a house", "builders in Lajpat Nagar", "Sky Skrabers"],
  pullQuotes: ["A lower asking price is valuable only when you understand what you are buying.", "Ask previous buyers how their home performs after the handover photographs."],
  metrics: [],
  body: [
    p("opening", "People often just look at the price tag of the house and its location, and miss the most important part: construction quality. You do not usually purchase a house to use it for two or three years and sell it off. It is your dream home, the place where you imagine your life unfolding."),
    p("future", "But what if that home shows a different face four or five years after purchase? Paint begins peeling, damp patches spread and fittings deteriorate. The house starts looking tired because hidden defects and poor materials demand expensive repairs. Not every defect comes from construction, but the quality behind the finishes deserves attention before you buy."),
    h("price", "Is saving Rs 10 lakh always a good deal?"),
    p("comparison", "Imagine visiting two properties in the same area: one at Rs 2.1 crore and another at Rs 2.2 crore. Your first instinct may be that saving Rs 10,00,000 is a win. It could be, provided both properties offer comparable construction, specifications, size and rights. A higher price alone does not prove better quality either."),
    p("written", "Ask each builder to show the materials and explain the work. If you book early, obtain a written specification schedule covering brands, product grades, models and approved alternatives. Record how substitutions require your agreement. Keep copies of commitments and progress photographs, and arrange supervised site visits at agreed milestones. Stay involved before concealed work disappears behind plaster and tiles."),
    h("structure", "1. Foundations and structure: look beyond the facade"),
    p("foundation", "At the foundation and frame stages, the important materials include reinforcement steel, cement, aggregates and concrete. Quality-led builders select these to match the structural engineer's design and site conditions. Ask for material certificates, concrete test records and evidence of supervision. A familiar cement or steel brand cannot compensate for poor storage, placement or curing."),
    p("engineer", "Ask a qualified independent structural engineer to assess available drawings and records where appropriate. Steel grade, concrete grade, reinforcement placement and foundation design are engineering decisions; there is no single premium specification suitable for every house. Surface inspection cannot certify hidden structural safety. Cracks, exposed reinforcement or damaged concrete should be professionally evaluated before purchase."),
    h("walls", "2. Walls and plaster: check preparation and workmanship"),
    p("masonry", "During masonry, builders may use clay bricks, concrete blocks or AAC blocks according to the design. Compare material consistency, the specified mortar or adhesive, alignment and workmanship. Neither the heaviest wall nor the most expensive block automatically makes the best home. Look for uneven plaster, recurring cracks and signs of moisture, and ask how affected areas were repaired."),
    h("water", "3. Waterproofing: the work you hope never to notice"),
    p("waterproofing", "Bathrooms, balconies, terraces and other exposed areas need appropriate waterproofing systems, correctly prepared surfaces and sound detailing around pipes and joints. Premium work combines suitable membranes or coatings with drainage slopes and careful installation. Ask whether wet areas were tested before finishes were laid and request available test records, product details and warranties."),
    p("damp", "During a visit, check ceiling corners, areas beneath bathrooms, window edges and terrace drainage. Fresh paint can conceal an old stain, so ask about the history of any repaired patch. Waterproofing is a complete system: an expensive product will not solve a badly formed joint or water collecting in the wrong place."),
    h("services", "4. Electrical and plumbing: inspect what will be concealed"),
    p("electrical", "Electrical work includes cables, conduits, distribution boards, protective devices, switches and earthing. Ask for the agreed makes and specifications, installation records and testing by a qualified electrician. Cable sizing and protection must suit the designed loads. Do not open live panels or attempt electrical tests yourself; request a professional inspection."),
    p("plumbing", "Plumbing may use CPVC, PPR or other approved pipe systems suited to the intended service, together with compatible fittings and accessible valves. Ask about pressure and leakage testing before pipes were covered. Run taps during the viewing, observe drainage and check access for maintenance. Attractive sanitaryware does not establish the quality of the concealed plumbing."),
    h("finishes", "5. Floors, windows and interiors: specification matters"),
    p("finishing", "At finishing stage, compare the actual tiles or stone, adhesives, grouts, window systems, glazing, door hardware and cabinetry boards. Kitchens and moisture-prone areas require materials appropriate to their exposure. Ask for samples and written product details instead of accepting a broad promise of imported or premium finishes. Correct installation matters as much as selection."),
    p("inspection", "Open doors and windows, check alignment and seals, inspect tile joints and look at cabinetry edges. Review lift commissioning and maintenance arrangements where applicable. Before handover, prepare a written snag list with a qualified inspector, agree rectification dates and collect warranties. Small visible defects can reveal workmanship issues, although a tidy finish alone does not prove structural quality."),
    block("bis", "normal", { text: "For independent background on construction and buying from a developer, see the " }, { text: "Bureau of Indian Standards' guides for homeowners and homebuyers", href: "https://www.bis.gov.in/guide-for-homeowners-and-homebuyers/?lang=en" }, { text: ". Use professional advice to apply these checks to the particular building." }),
    h("sky", "Sky Skrabers: quality you can examine for yourself"),
    p("promise", "At Sky Skrabers, our aim is to deliver the best construction quality we can at competitive prices, including selected opportunities priced at or below comparable market offerings. Compare the written specifications and total package for yourself. Our approach brings together thoughtful planning, quality materials, disciplined workmanship and a focus on timely delivery."),
    block("projects", "normal", { text: "With 13 ongoing projects in our portfolio, we offer multiple residential and investment opportunities. Explore our " }, { text: "ongoing South Delhi projects", href: "/ongoing-projects" }, { text: ", including " }, { text: "Lajpat Nagar I, II and IV", href: "/projects/lajpat-nagar-1-2" }, { text: " and " }, { text: "Lajpat Nagar III", href: "/projects/lajpat-nagar-3-4" }, { text: ", then compare properties within your budget." }),
    p("customers", "You can also ask us to arrange conversations with customers who have purchased their dream homes from Sky Skrabers, with their consent and availability. Ask about their experience of construction updates, possession, finishing and support after moving in. Hearing from people who live in our homes can help you understand us better than a brochure alone."),
    block("reel", "normal", { text: "See the details featured in " }, { text: "our construction-quality Instagram reel", href: "https://www.instagram.com/p/DdLjo3WIal5/" }, { text: ", then visit the site to assess the particular property and its specifications." }),
    h("invest", "Is this the right time to invest in Lajpat Nagar?"),
    block("market", "normal", { text: "Quality also belongs in the investment calculation. The " }, { text: "National Housing Bank's 2024-25 annual report", href: "https://www.nhb.org.in/wp-content/uploads/2026/01/NHB-Annual-Report-2024-25-English-final.pdf" }, { text: " records a 2.9% annual increase in Delhi's assessment-price housing index for January-March 2025. That is historical city-level evidence, not proof of growth in every Lajpat Nagar block or a forecast of high returns. Evaluate current comparable sales, rental demand, purchase costs and construction quality together." }),
    block("investment-blog", "normal", { text: "Our local investment perspective considers established demand, limited land and redevelopment opportunities. Read " }, { text: "Is This the Right Time to Buy Property in Lajpat Nagar?", href: "/blogs/right-time-buy-property-lajpat-nagar-2026" }, { text: " for the fuller discussion. A well-chosen property may appreciate, but your entry price, holding period and future market conditions determine the outcome." }),
    h("visit", "Make your shortlist easier with a site visit"),
    block("office", "normal", { text: "To make the process easier, " }, { text: "visit the Sky Skrabers office", href: "/contact-us" }, { text: " at C 132, Block C, Lajpat Nagar II. We will arrange visits to sites that fit your budget and discuss the materials, specifications and available options. Bring your questions, review the work and speak with previous buyers. Your dream home deserves that attention before you make the decision." }),
  ],
};
