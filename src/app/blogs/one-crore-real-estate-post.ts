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

export const oneCroreRealEstatePost: BlogPost = {
  slug: "how-to-earn-1-crore-through-real-estate",
  title: "How to Earn ₹1 Crore Through Real Estate",
  category: "Investment Guides",
  excerpt:
    "Five practical steps for building toward ₹1 crore through South Delhi real estate, from reading the data to choosing the right entry price and holding period.",
  description:
    "Learn how to build toward ₹1 crore through South Delhi real estate using market data, location selection, disciplined holding and a carefully evaluated entry price.",
  date: "2026-09-23T09:00:00+05:30",
  displayDate: "23 September 2026",
  readTime: "6 min read",
  image: "/assets/blogs/how-to-earn-1-crore-through-real-estate.png",
  imageAlt:
    "Illustrative real estate value ladder in front of a premium South Delhi builder-floor property",
  imageSource:
    "Original Sky Skrabers editorial illustration. Values shown are illustrative and are not guaranteed returns.",
  keywords: [
    "how to earn ₹1 crore through real estate",
    "South Delhi real estate investment",
    "property investment in South Delhi",
    "Lajpat Nagar property investment",
    "under construction property South Delhi",
    "Sky Skrabers ongoing projects",
  ],
  pullQuotes: [
    "The first ₹1 crore is not created by a dramatic prediction. It is built through entry price, patience and one disciplined decision after another.",
    "An early-entry discount can improve the equation, but only documentation, execution and a sensible market comparison make it valuable.",
  ],
  metrics: [],
  body: [
    p(
      "opening",
      "People often think about how to earn their first ₹1 crore, but skip the most obvious things. They search for the next share, business idea, lottery ticket or overnight shortcut while overlooking an asset class that has quietly built family wealth across generations: real estate.",
    ),
    p(
      "claim-check",
      "You may have heard that 90% of the world's wealthy people created 80% of their wealth through property. That exact statistic is repeated widely, but there is no dependable global dataset proving it. The useful lesson is not the percentage. It is that well-located property has helped many people build wealth through long holding periods, rental income, limited supply and disciplined reinvestment. None of those outcomes is automatic, and property can fall in value too.",
    ),
    p(
      "five-steps",
      "So let us replace the slogan with a plan. Here are five steps for building toward ₹1 crore through South Delhi real estate, with the assumptions visible and the risks kept in the picture.",
    ),
    h("step-one", "Step 1: Understand what real estate can do that speculation cannot"),
    p(
      "asset",
      "Real estate is not a lottery ticket. A home or floor is a physical asset with a location, usable space and a finite supply of comparable land around it. In established parts of South Delhi, buyers are not waiting for schools, hospitals, markets or metro access to arrive. They are competing for a limited number of plots in neighbourhoods that already function.",
    ),
    p(
      "family-story",
      "That is why family conversations so often include a property bought years ago for a fraction of its current value. You may have heard an elder say that a plot or building eventually became worth 10 or 20 times the original price. Such stories can be true, but they usually leave out the decades of waiting, taxes, repairs, legal work and missed opportunities along the way. The lesson is patience, not a promise that every purchase will multiply 20 times.",
    ),
    p(
      "one-crore-math",
      "The arithmetic is less dramatic and more useful. An investment of ₹50 lakh needs to double to become ₹1 crore. At an illustrative annual growth rate of 5%, that takes about 14 years; at 7%, roughly 10 years; and at 10%, a little over seven years. These examples exclude rent, tax, finance, maintenance and transaction costs. They show why time matters more than excitement.",
    ),
    h("step-two", "Step 2: Let data choose the city before emotion chooses the house"),
    p(
      "data",
      "Before visiting properties, study where housing values have shown sustained medium-to-high growth across full cycles. Data never tells the entire story, but it protects you from buying only because someone said a locality is about to boom. Compare long-term price movement, rental demand, infrastructure, redevelopment activity, supply and the depth of genuine end-user demand.",
    ),
    block(
      "residex",
      "normal",
      { text: "The " },
      {
        text: "National Housing Bank's RESIDEX history",
        href: "https://www.nhb.org.in/about-residex/",
      },
      {
        text: " shows that formal housing-price tracking began with a 2001 base and was revised over time as coverage and methodology evolved. In the older Delhi series, the index moved from 100 in 2007 to 126 by January-March 2011, but it also declined during parts of that period. More recently, the ",
      },
      {
        text: "NHB Annual Report 2024-25",
        href: "https://www.nhb.org.in/wp-content/uploads/2026/01/NHB-Annual-Report-2024-25-English-final.pdf",
      },
      {
        text: " recorded a 2.9% year-on-year rise in Delhi's assessment-price housing index for January-March 2025. These are Delhi-level indicators, not a 20-year return calculation for one South Delhi block.",
      },
    ),
    p(
      "forecast",
      "The next five years should therefore be treated as scenarios, not prophecy. If a ₹70 lakh property grew at 5% annually, its illustrative value after five years would be about ₹89 lakh; at 7%, about ₹98 lakh; at 10%, about ₹1.13 crore. Actual South Delhi performance may be lower, higher or negative, and can differ sharply by street, title, plot, floor and construction quality.",
    ),
    p(
      "near-home",
      "Where practical, invest close enough to inspect the asset and understand the market. Distance does not automatically create fraud, but remote ownership can make site visits, document checks and property supervision harder. Whether the property is near or far, use an independent lawyer, verify ownership and approvals, and never rely solely on a seller's verbal assurance.",
    ),
    h("step-three", "Step 3: Find the South Delhi micro-market your budget can genuinely hold"),
    p(
      "micro-market",
      "South Delhi is not one property market. Lajpat Nagar, East of Kailash, Greater Kailash, South Extension and Defence Colony can behave differently, and two adjacent blocks can command very different prices. Road width, parking, plot shape, floor rights, a park-facing position and the condition of neighbouring buildings all influence value.",
    ),
    block(
      "project-links-one",
      "normal",
      { text: "Begin with actual inventory rather than a city-wide average. Compare Sky Skrabers' current opportunities in " },
      { text: "Lajpat Nagar I, II and IV", href: "/projects/lajpat-nagar-1-2" },
      { text: ", " },
      { text: "Lajpat Nagar III", href: "/projects/lajpat-nagar-3-4" },
      { text: ", " },
      { text: "East of Kailash", href: "/projects/east-of-kailash" },
      { text: " and " },
      { text: "South Extension I and II", href: "/projects/south-extension-1-2" },
      { text: ". Each crawlable project page gives you a starting point for location, layout and budget comparisons." },
    ),
    block(
      "supporting-guide",
      "normal",
      { text: "For a block-level pricing perspective, read our guide to " },
      {
        text: "2BHK prices in the Lajpat Nagar area",
        href: "/blogs/prices-for-2bhk-in-lajpat-nagar-area",
      },
      {
        text: ". The right target is not the most fashionable address; it is the strongest property your finances can comfortably hold through a complete market cycle.",
      },
    ),
    h("step-four", "Step 4: Hold long enough for the investment thesis to work"),
    p(
      "not-shares",
      "Property prices do not print a new market quote every second. A serious purchase should not be judged by what happened this week. Stamp duty, brokerage, financing, fit-out and maintenance create meaningful costs, while finding a buyer takes time. That makes a five-to-20-year horizon more sensible than expecting a quick flip.",
    ),
    p(
      "hold-plan",
      "Before buying, write down the thesis: why this location, why this property, what could improve demand, what could damage it, and how long you can hold without needing an urgent sale. Also decide whether rent is part of the plan. A property that produces income while you wait may behave very differently from an empty speculative asset.",
    ),
    block(
      "due-diligence",
      "normal",
      { text: "Use the " },
      {
        text: "SEBI investor due-diligence principle",
        href: "https://investor.sebi.gov.in/due_diligence.html",
      },
      {
        text: " here as well: understand the investment, its risk-return profile and the claims being made before committing. Property is illiquid, and title, construction, finance and market risks must be evaluated independently.",
      },
    ),
    h("step-five", "Step 5: Improve the entry, then let time do the heavy work"),
    p(
      "entry",
      "The final reveal is that your result begins before the purchase. If a comparable completed floor is valued at ₹4 crore and a carefully evaluated early-stage opportunity is available at ₹3.4 crore, the difference is ₹60 lakh, or 15%. That gap is an illustrative entry advantage, not immediate profit. It matters only if the comparison is truly like-for-like and the project is documented, funded and delivered as expected.",
    ),
    p(
      "completion",
      "Now imagine that the completed property later reaches ₹5 crore. The difference from the illustrative ₹3.4 crore entry would be ₹1.6 crore before stamp duty, taxes, finance, brokerage, interiors, holding costs and risk. The ₹5 crore figure is not a forecast or guaranteed completion value. It simply shows how a lower entry and later market movement can combine when both assumptions actually hold.",
    ),
    p(
      "sky-skrabers",
      "This is the work Sky Skrabers aims to simplify. With 13 ongoing South Delhi projects, our team can help buyers compare locations, construction stages, specifications and available investment opportunities. Selected initial-stage properties may offer pricing around 15% below a genuinely comparable completed option, depending on the project and availability. Every comparison should be verified at the time of enquiry.",
    ),
    block(
      "all-projects",
      "normal",
      { text: "Explore all " },
      { text: "Sky Skrabers ongoing projects", href: "/ongoing-projects" },
      {
        text: " and visit the sites that match your budget. Ask to see construction progress, written specifications, payment milestones and completed work. The entry price becomes meaningful only after those checks are complete.",
      },
    ),
    block(
      "reel",
      "normal",
      { text: "Watch our Instagram reel, " },
      {
        text: "How to Earn Your First ₹1 Crore Through Real Estate",
        href: "https://www.instagram.com/p/DdjPNiBonrA/",
      },
      { text: ", for the visual version of this five-step idea." },
    ),
    h("final", "Your first ₹1 crore begins with one defensible decision"),
    p(
      "conclusion",
      "There is no universal five-step formula that guarantees ₹1 crore. There is, however, a repeatable discipline: study long-term evidence, invest in a market you understand, choose a micro-location your budget can sustain, hold patiently and negotiate an entry supported by real comparable properties.",
    ),
    block(
      "contact",
      "normal",
      { text: "If South Delhi fits that plan, " },
      { text: "visit the Sky Skrabers office", href: "/contact-us" },
      {
        text: ". We can show you the relevant ongoing sites and the data behind the comparison. Bring the questions, challenge the assumptions and select only the opportunity that still makes sense after the excitement has settled.",
      },
    ),
  ],
};
