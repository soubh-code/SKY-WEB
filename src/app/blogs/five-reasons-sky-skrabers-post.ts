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

export const fiveReasonsSkySkrabersPost: BlogPost = {
  slug: "five-reasons-to-invest-with-sky-skrabers",
  title: "Five Reasons to Invest with Sky skrabers.",
  category: "Investment Guides",
  excerpt:
    "The strongest property investment is not simply a good-looking floor. It is the right option, entered well, built carefully and supported by people you can verify.",
  description:
    "Discover five reasons to invest with Sky Skrabers, from multiple South Delhi property options and early booking opportunities to experience, delivery and customer trust.",
  date: "2026-10-15T09:00:00+05:30",
  displayDate: "15 October 2026",
  readTime: "6 min read",
  image: "/assets/blogs/five-reasons-to-invest-with-sky-skrabers.png",
  imageAlt:
    "Five reasons to invest with Sky Skrabers surrounding a premium South Delhi builder-floor residence",
  imageSource:
    "Original Sky Skrabers editorial illustration created for this investment guide.",
  keywords: [
    "invest with Sky Skrabers",
    "Sky Skrabers investment",
    "South Delhi real estate investment",
    "property investment in Lajpat Nagar",
    "under construction property South Delhi",
    "builder floors in South Delhi",
    "South Delhi property developer",
  ],
  pullQuotes: [
    "The best investment opportunity is not the one with the loudest promise. It is the one you can compare, inspect and understand.",
    "Trust should never depend only on what a developer says. Ask to see the work and speak with the people already living in it.",
  ],
  metrics: [],
  body: [
    p(
      "opening",
      "Most people think a property investment begins when they select a floor. In reality, it begins one decision earlier: choosing who will stand behind that floor while it is still a drawing, a structure and a promise.",
    ),
    p(
      "stakes",
      "The address matters. The price matters. The layout, road and parking matter. But when you buy during construction, you are also investing in the developer's judgement, discipline and ability to turn every written detail into a finished home. That is why two properties in the same South Delhi lane can create completely different experiences for their buyers.",
    ),
    p(
      "five",
      "So why consider investing with Sky Skrabers? The answer is not one dramatic claim. It is a combination of five practical advantages that become more valuable when examined together.",
    ),
    h("reason-one", "1. Multiple investment options instead of one forced choice"),
    p(
      "choice",
      "An investor should not have to reshape an entire plan around the only floor a developer happens to have. Budget, preferred locality, floor, possession horizon and intended exit can all change what a suitable opportunity looks like. A home for eventual self-use demands a different comparison from a construction-stage investment intended for resale.",
    ),
    p(
      "portfolio",
      "Sky Skrabers' active South Delhi portfolio gives buyers the ability to compare more than one address and construction stage. That matters because Lajpat Nagar, East of Kailash, South Extension, Defence Colony, Hauz Khas and Kalkaji do not behave like one uniform market. Even adjacent blocks can attract different buyer pools and prices.",
    ),
    block(
      "project-links",
      "normal",
      { text: "Begin with the complete list of " },
      { text: "ongoing Sky Skrabers projects", href: "/ongoing-projects" },
      { text: ", then compare current opportunities in " },
      { text: "Lajpat Nagar I, II and IV", href: "/projects/lajpat-nagar-1-2" },
      { text: ", " },
      { text: "Lajpat Nagar III", href: "/projects/lajpat-nagar-3-4" },
      { text: ", " },
      { text: "East of Kailash", href: "/projects/east-of-kailash" },
      { text: " and " },
      { text: "South Extension I and II", href: "/projects/south-extension-1-2" },
      { text: ". Availability and pricing should be confirmed at the time of enquiry." },
    ),
    p(
      "comparison",
      "Choice creates leverage. It lets the investor reject a floor that does not fit instead of becoming emotionally attached to the first attractive elevation. The result is a more deliberate decision based on the objective, not on pressure.",
    ),
    h("reason-two", "2. An earlier entry during the booking stage"),
    p(
      "early-entry",
      "A completed property offers certainty: buyers can walk through the finished rooms, inspect the facade and imagine possession immediately. That reduced uncertainty is often reflected in the asking price. At the booking stage, selected floors may be available on more favourable commercial terms because construction and the final market presentation are still ahead.",
    ),
    p(
      "discount",
      "This does not mean every under-construction property is automatically discounted or profitable. The investor accepts execution, timeline and market risk in exchange for the possibility of a better entry. The useful comparison is between genuinely similar floors, with the same rights, location, size, specifications and parking, rather than between unrelated asking prices.",
    ),
    block(
      "entry-reading",
      "normal",
      { text: "Our guide on " },
      { text: "how to be a smart investor in 2027", href: "/blogs/how-to-be-a-smart-investor-in-2027" },
      { text: " explains why return velocity, liquidity and the next opportunity matter alongside the final selling price. The article on " },
      { text: "building toward ₹1 crore through real estate", href: "/blogs/how-to-earn-1-crore-through-real-estate" },
      { text: " shows how entry price and holding time can work together without treating returns as guaranteed." },
    ),
    p(
      "documents",
      "A smart early entry must still be supported by ownership documents, applicable approvals, written specifications, payment milestones and independent legal advice. A discount is valuable only when the underlying property deserves the investment.",
    ),
    h("reason-three", "3. Timely delivery is treated as a discipline"),
    p(
      "timeline",
      "Time is money in property. A delay can extend financing costs, postpone rental income, disturb a family's move and prevent an investor from redeploying capital. That is why delivery should not be treated as a decorative promise made during a site visit. It should be managed through planning, sequencing, material coordination and visible construction progress.",
    ),
    p(
      "delivery-position",
      "Sky Skrabers places strong emphasis on disciplined execution and timely delivery. Buyers should still examine the schedule for the particular project, ask how payments connect to milestones and obtain important commitments in writing. The meaningful proof is not a slogan; it is progress that can be inspected against the agreed plan.",
    ),
    p(
      "time-trust",
      "When a developer respects time, the benefit reaches beyond possession day. Buyers can plan interiors, finance, tenancy and resale conversations with greater confidence. Predictability becomes part of the investment value.",
    ),
    block(
      "five-reasons-reel",
      "normal",
      { text: "Want to see these investment advantages in a quicker format? Watch the Sky Skrabers reel on " },
      {
        text: "five reasons to invest with Sky Skrabers",
        href: "https://www.instagram.com/p/DejoG-No4aS/",
      },
      { text: ", then return to the next two reasons that help turn a promising opportunity into a decision you can verify." },
    ),
    h("reason-four", "4. Thirty-three years of experience behind the decision-making"),
    p(
      "experience-clarity",
      "Sky Skrabers was established in 2011. The 33-year figure refers to the wider team and family's combined experience in property and construction, not the age of the Sky Skrabers company itself. That distinction matters because serious investment communication should be clear enough to survive scrutiny.",
    ),
    p(
      "lessons",
      "Experience becomes valuable when it changes decisions. It helps a team recognise which layouts will remain practical, where service access must be preserved, how a facade will weather and which shortcuts will become expensive after possession. It also creates familiarity with South Delhi's unusually specific micro-markets, where one road or block can alter demand.",
    ),
    block(
      "about-links",
      "normal",
      { text: "Read more " },
      { text: "about Sky Skrabers", href: "/about-us" },
      { text: " and examine the company's " },
      { text: "construction approach", href: "/construction" },
      { text: ". The live site records that Sky Skrabers has operated since 2011 and has shaped more than 100 South Delhi residences." },
    ),
    p(
      "experience-test",
      "Years alone are not proof of quality. Use experience as an invitation to ask better questions: request completed-work examples, inspect active sites and understand who remains accountable from booking through handover.",
    ),
    h("reason-five", "5. A five-out-of-five customer standard you can verify"),
    p(
      "rating-clarity",
      "Sky Skrabers describes the customer experience it presents as a 5/5 standard and reports that its referred customers have had positive experiences working with the team. This is not being represented here as an independently audited, platform-wide public rating. The stronger invitation is simpler: speak with customers directly.",
    ),
    p(
      "customer-questions",
      "With their consent and availability, ask previous buyers about communication during construction, the quality delivered, finishing, possession and support after moving in. Ask what went smoothly and what required attention. A real conversation provides context that a star graphic cannot.",
    ),
    block(
      "quality-blog",
      "normal",
      { text: "Quality should also be examined physically. Use our guide on " },
      { text: "checking the construction quality of a property", href: "/blogs/how-to-check-construction-quality-of-a-property" },
      { text: " to review structure, waterproofing, plumbing, electrical work, windows and finishes. Then consider why those hidden systems separate a " },
      { text: "house from a home", href: "/blogs/house-vs-home" },
      { text: "." },
    ),
    p(
      "quality-position",
      "Sky Skrabers aims to deliver construction quality among the strongest in its market segment, with careful material selection and finishing. Buyers should verify that position through specifications and completed work rather than accepting any developer's adjective at face value. Confidence becomes meaningful when it is inspectable.",
    ),
    h("together", "Why the five reasons are stronger together"),
    p(
      "combination",
      "Multiple options help you find the right fit. Booking-stage access can improve the entry equation. Timely execution protects the investment plan. Experience informs decisions before expensive mistakes are concealed. Customer references reveal what the relationship feels like after the brochure has done its work.",
    ),
    p(
      "not-guarantee",
      "None of these factors guarantees appreciation or removes property risk. Market conditions can change, timelines can face disruption and every site has its own documents and commercial terms. A responsible investor verifies title, approvals, specifications, total acquisition cost and exit assumptions with independent legal, tax and financial professionals.",
    ),
    h("final", "The sixth reason is the question you bring with you"),
    p(
      "sixth",
      "There may be five reasons to invest with Sky Skrabers, but the final decision depends on the questions you ask. What exactly am I buying? Why is this entry price attractive? What is written? What can I inspect? Which customer can I speak with? What happens if the market or timeline changes?",
    ),
    p(
      "ending",
      "A serious developer should not be afraid of those questions. A serious investor should not proceed without them. The strongest partnership begins when both sides are interested in the same thing: a property whose value still makes sense after the excitement of booking has passed.",
    ),
    block(
      "contact",
      "normal",
      { text: "To compare available South Delhi opportunities, " },
      { text: "visit the Sky Skrabers office", href: "/contact-us" },
      { text: ". Bring your budget, preferred locality and investment horizon. Ask to inspect the work, review the relevant details and speak with previous customers before deciding." },
    ),
  ],
};
