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

export const lajpatNagarTokenChecklistPost: BlogPost = {
  slug: "property-for-sale-in-lajpat-nagar-before-paying-token",
  title: "Property for Sale in Lajpat Nagar: 11 Questions to Ask Before You Pay a Token",
  category: "Buyer Guides",
  excerpt:
    "The token may be the smallest payment in a property deal, but it is the moment buyers often stop investigating and start defending their decision.",
  description:
    "Found a property for sale in Lajpat Nagar? Ask these 11 questions about title, total cost, floor rights, construction and token terms before you pay.",
  date: "2026-10-25T09:00:00+05:30",
  displayDate: "25 October 2026",
  readTime: "6 min read",
  image: "/assets/blogs/property-for-sale-in-lajpat-nagar-before-paying-token.png",
  imageAlt:
    "Eleven-point inspection checklist in front of a premium property for sale in Lajpat Nagar",
  imageSource:
    "Original Sky Skrabers editorial illustration created for this buyer due-diligence guide.",
  keywords: [
    "property for sale in Lajpat Nagar",
    "Lajpat Nagar property",
    "builder floor in Lajpat Nagar",
    "buy property in Lajpat Nagar",
    "property token checklist",
    "South Delhi builder floor",
    "Lajpat Nagar property price",
  ],
  pullQuotes: [
    "A token is not proof that you found the right property. It is proof that the questions now matter more.",
    "The safest buyer is not the one who distrusts everything. It is the one who knows what must be verified before excitement becomes obligation.",
  ],
  metrics: [],
  body: [
    p(
      "opening",
      "The most dangerous sentence in a property purchase is rarely hidden in a legal document. It is usually spoken casually during a site visit: ‘Just pay the token today, and we will sort out the details later.’",
    ),
    p(
      "psychology",
      "The amount may look small beside the total price, but the token creates a powerful psychological shift. Before paying, you are evaluating the property. After paying, many buyers begin defending it. They overlook doubts because walking away now feels like losing money, momentum and a home they have already imagined.",
    ),
    p(
      "promise",
      "If you are comparing a property for sale in Lajpat Nagar, do not let urgency perform your due diligence. Give the broker, owner or developer these eleven questions. The quality of the answers will tell you almost as much as the floor itself.",
    ),
    h("question-one", "1. Who legally owns the property, and what proves it?"),
    p(
      "title-chain",
      "Ask for the current ownership documents and the chain through which the property reached the present owner. Names, plot details and property descriptions should agree across the documents. A polished floor cannot correct a defective title. Have an independent property lawyer examine the papers, applicable permissions and any mortgage, charge, dispute or restriction before money becomes non-refundable.",
    ),
    p(
      "authority",
      "If someone is signing through a power of attorney, company authority or family arrangement, ask what legally allows that person to receive the token and bind the owner. Never rely only on a verbal explanation of ownership.",
    ),
    h("question-two", "2. What is the real all-in price, not merely the quoted price?"),
    p(
      "all-in",
      "A quote becomes useful only after every included and excluded cost is written down. Ask about parking, lift-related charges, power backup, maintenance deposits, brokerage, applicable taxes, stamp duty, registration, utility connections and any separate payment for terrace or other rights. Compare properties on total acquisition cost, not on the number used to begin the conversation.",
    ),
    block(
      "price-link",
      "normal",
      { text: "For a closer look at how age, block and amenities influence pricing, read our guide to " },
      {
        text: "2BHK prices in the Lajpat Nagar area",
        href: "/blogs/prices-for-2bhk-in-lajpat-nagar-area",
      },
      { text: ". Asking prices are not uniform, even between nearby streets." },
    ),
    h("question-three", "3. Which rights belong specifically to this floor?"),
    p(
      "rights",
      "Do not assume that a top floor automatically carries terrace rights or that a ground floor controls a courtyard. Ask what the title and sale documents say about the floor, parking position, common areas, roof access, services and any exclusive-use space. The words used in a brochure or WhatsApp message must match the rights that can actually be transferred.",
    ),
    h("question-four", "4. Does the built property match the sanctioned plan?"),
    p(
      "sanctioned-plan",
      "Request the sanctioned building plan and ask a qualified professional to compare it with what exists or is being constructed. Buyers should understand applicable approvals, completion-related documentation and material deviations. A room that looks like extra value during the visit may create difficulty later if its status was never checked.",
    ),
    h("question-five", "5. How much space will you actually use?"),
    p(
      "area",
      "Plot size, built-up area and usable internal area are not interchangeable. Ask how the stated area was calculated and study the dimensioned floor plan. Stand inside the bedrooms, check wardrobe walls, open doors simultaneously and notice passages, shafts and columns. A larger advertised number can still produce a less practical home.",
    ),
    p(
      "layout-test",
      "Use ordinary life as the measuring tool. Can a dining table sit without blocking circulation? Is there space around the bed? Can household staff or service technicians reach utility areas without crossing private rooms? Efficient planning often matters more than an impressive headline area.",
    ),
    h("question-six", "6. Which materials and specifications are promised in writing?"),
    p(
      "specifications",
      "Ask for a written specification sheet covering structure, masonry, waterproofing systems, flooring, doors, windows, electrical wiring, switchgear, plumbing, sanitaryware, kitchen provisions, lift and external finishes. Where a brand may be substituted, the acceptable equivalent should be clear. The phrase ‘premium quality’ is not a specification.",
    ),
    block(
      "quality-link",
      "normal",
      { text: "Take our detailed " },
      {
        text: "construction-quality inspection guide",
        href: "/blogs/how-to-check-construction-quality-of-a-property",
      },
      { text: " to the site so you can examine both visible finishes and the systems hidden behind them." },
    ),
    h("question-seven", "7. How are water, drainage and waterproofing being handled?"),
    p(
      "water",
      "Fresh paint can hide a stain for a visit; it cannot solve the source of dampness. Ask how toilets, balconies, the terrace, basement or stilt areas and external walls are waterproofed and tested. Inspect slopes toward drains, pipe access, shaft ventilation and signs of previous repair. Water-related defects can disrupt a home repeatedly because their source is often far from the visible mark.",
    ),
    h("question-eight", "8. What is the realistic possession path?"),
    p(
      "possession",
      "For an under-construction floor, ask what has already been completed, what remains, which dependencies can affect possession and how the payment plan follows visible milestones. Put the agreed timeline and important remedies into the transaction documents. A target date is more credible when the buyer can inspect the sequence behind it.",
    ),
    h("question-nine", "9. Why is this floor priced differently from the one nearby?"),
    p(
      "micro-location",
      "Lajpat Nagar is not a single price point. Block, road width, corner position, park frontage, parking convenience, construction age, floor, terrace rights, sunlight, commercial activity and exact condition can move value significantly. Ask for comparable properties, but reject comparisons that quietly change three or four of these variables.",
    ),
    block(
      "market-links",
      "normal",
      { text: "Compare current Sky Skrabers opportunities across " },
      {
        text: "Lajpat Nagar I, II and IV",
        href: "/projects/lajpat-nagar-1-2",
      },
      { text: " and " },
      { text: "Lajpat Nagar III", href: "/projects/lajpat-nagar-3-4" },
      { text: ", then review the wider list of " },
      { text: "ongoing South Delhi projects", href: "/ongoing-projects" },
      { text: ". Availability, specifications and pricing should always be reconfirmed directly." },
    ),
    h("question-ten", "10. Who is likely to buy or rent this property after you?"),
    p(
      "exit",
      "Even a home chosen for self-use should be judged through the next buyer's eyes. Consider stairs and lift access, parking, noise, natural light, maintenance, room sizes and the buyer pool for that ticket size. If the investment thesis depends on resale or rent, ask for realistic evidence rather than a guaranteed appreciation figure.",
    ),
    block(
      "timing-link",
      "normal",
      { text: "Our analysis of whether this is the " },
      {
        text: "right time to buy property in Lajpat Nagar",
        href: "/blogs/right-time-buy-property-lajpat-nagar-2026",
      },
      { text: " explains why entry price, construction stage and holding period should be considered together." },
    ),
    h("question-eleven", "11. What exactly happens to the token if verification fails?"),
    p(
      "token-terms",
      "Before transferring money, obtain a written token document that identifies the parties, property, amount, agreed commercial terms, payment method and next steps. Most importantly, understand when the token is refundable or forfeitable, including what happens if title review, agreed documentation, finance or another stated condition fails. Have your lawyer review the wording before you sign or pay.",
    ),
    p(
      "receipt",
      "Pay through a traceable method to the correct recipient and retain the acknowledgement. Do not leave essential conditions to memory. A two-minute conversation at the site is not a substitute for a document both sides understand.",
    ),
    h("site-visit", "The 15-minute test most buyers forget"),
    p(
      "return-visit",
      "Visit the lane once more without the sales conversation. Arrive at a different time. Try the parking movement, listen with the windows open, check sunlight, walk to the market or metro route you expect to use and speak politely with someone nearby. The second visit often reveals what the first visit's excitement edited out.",
    ),
    p(
      "phone-test",
      "Then put your phone away and stand silently in each room. A property should work when no one is pointing out Italian marble or explaining future appreciation. Notice what the home itself tells you about privacy, proportion, ventilation and peace.",
    ),
    h("sky-skrabers", "How Sky Skrabers helps buyers compare before deciding"),
    p(
      "developer-role",
      "Sky Skrabers works across multiple South Delhi locations and construction stages, allowing buyers to compare options against a real budget and purpose. The useful conversation is not ‘Which floor can we sell today?’ It is ‘Which floor genuinely fits the way you plan to live, hold or exit?’",
    ),
    p(
      "verification",
      "Buyers can ask to inspect relevant work, understand the proposed specifications and, subject to customer consent and availability, speak with people who have previously purchased from the company. No developer should ask you to replace due diligence with trust. Good work should make verification easier.",
    ),
    h("ending-heading", "A good property can survive eleven questions"),
    p(
      "ending",
      "When you finally find the right property for sale in Lajpat Nagar, asking these questions will not weaken the deal. It will clarify it. The right home should become more convincing as its documents, costs, rights, construction and timeline become clearer.",
    ),
    p(
      "final-warning",
      "Do not pay because someone says another buyer is five minutes away. Pay when the property has earned your confidence. A token should mark the end of your first investigation, not the beginning of your first doubt.",
    ),
    block(
      "contact",
      "normal",
      { text: "To compare verified details for available options, " },
      { text: "contact Sky Skrabers", href: "/contact-us" },
      { text: " and bring this eleven-question checklist to the conversation. Independent legal, tax and financial advice remains essential before any property transaction." },
    ),
  ],
};
