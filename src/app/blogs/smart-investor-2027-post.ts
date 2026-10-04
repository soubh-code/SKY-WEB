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

export const smartInvestor2027Post: BlogPost = {
  slug: "how-to-be-a-smart-investor-in-2027",
  title: "How to Be a Smart Investor in 2027",
  category: "Investment Guides",
  excerpt:
    "Two investors bought at the same price and exited at different times. The larger profit did not necessarily produce the smarter return.",
  description:
    "Learn how to be a smart real estate investor in 2027 through a South Delhi story about return velocity, reinvestment, liquidity, taxes and exit discipline.",
  date: "2026-10-05T09:00:00+05:30",
  displayDate: "5 October 2026",
  readTime: "6 min read",
  image: "/assets/blogs/how-to-be-a-smart-investor-in-2027.png",
  imageAlt:
    "Two illustrated real estate exit timelines comparing a 12-month sale with an 18-month sale",
  imageSource:
    "Original Sky Skrabers editorial illustration. Figures are hypothetical and shown before taxes and transaction costs.",
  keywords: [
    "how to be a smart investor in 2027",
    "smart real estate investor",
    "South Delhi real estate investment",
    "property investment in Lajpat Nagar",
    "under construction property investment",
    "real estate return calculation",
    "Sky Skrabers ongoing projects",
  ],
  pullQuotes: [
    "A smart investor does not ask only, ‘How much did I make?’ The sharper question is, ‘How efficiently did my capital work?’",
    "The best exit is not always the highest price. It is the decision that creates the strongest net outcome for the risk and time taken.",
  ],
  metrics: [
    { value: "23.68%", label: "Illustrative gross return from selling at ₹2.35 crore after 12 months." },
    { value: "31.58%", label: "Illustrative gross return from selling at ₹2.50 crore after 18 months." },
    { value: "₹71.35 lakh", label: "Illustrative 18-month gain if the first pace could be reinvested immediately and repeated." },
  ],
  body: [
    p(
      "opening",
      "In early 2027, two friends walked into the same under-construction builder floor in Lajpat Nagar. They studied the same plan, stood in the same unfinished living room and saw the same opportunity. Each bought a floor for ₹1.90 crore. Their entry price was identical. Their location was identical. Even their expected completion date was identical.",
    ),
    p(
      "question",
      "Eighteen months later, both had made money. One had earned ₹45 lakh and the other ₹60 lakh. Most people would immediately call the second person the smarter investor. But once time, liquidity and the next opportunity enter the calculation, the answer becomes far more interesting.",
    ),
    p(
      "fictional",
      "The story is hypothetical, not an actual Sky Skrabers transaction or a promise of returns. Its figures exclude taxes and transaction costs.",
    ),
    h("same-entry", "The same entry, followed by two very different exits"),
    p(
      "completion",
      "After 12 months, construction was complete. The floors were ready, the building looked polished and both friends listed their properties at ₹2.50 crore. A genuine buyer approached each of them with an offer of ₹2.35 crore.",
    ),
    p(
      "first-investor",
      "The first investor accepted. His gross difference was ₹45 lakh on an investment of ₹1.90 crore, or 23.68% over 12 months. He gave up ₹15 lakh from the asking price, but converted the property back into liquid capital immediately.",
    ),
    p(
      "second-investor",
      "The second investor refused to reduce the price. He believed the completed floor justified ₹2.50 crore, so he waited. Six months later, another buyer agreed to the full asking price. His gross difference was ₹60 lakh, or 31.58% over 18 months.",
    ),
    p(
      "obvious-answer",
      "So who was smarter? If the only score is total rupees earned from that one floor, the second investor wins by ₹15 lakh. If the score includes how quickly capital became available for the next investment, the first investor may have played the stronger game.",
    ),
    h("speed", "Return velocity changes the answer"),
    p(
      "simple-monthly",
      "The first deal produced a simple average gross gain of about 1.97% per month; the second produced about 1.75%. Their compounded monthly equivalents are approximately 1.79% and 1.54%. On an annualised basis, the examples are 23.68% and approximately 20.08%. The second investor earned more money, but the first investor's capital grew faster while committed.",
    ),
    p(
      "reinvestment",
      "Now assume the first investor could immediately reinvest the entire ₹2.35 crore and repeat the same compounded pace for the next six months. At the end of 18 months, the illustrative value would be about ₹2.61 crore, producing a total gross gain of roughly ₹71.35 lakh from the original ₹1.90 crore. That is more than the second investor's ₹60 lakh.",
    ),
    p(
      "assumption",
      "That result assumes another suitable property is immediately available and performs at the same pace. Real markets rarely cooperate so neatly: cash can sit idle, replacement property can be overpriced and transaction costs can erase the theoretical advantage.",
    ),
    h("smart", "A smart investor in 2027 measures five things"),
    p(
      "net-return",
      "First, calculate net return, not the headline difference between purchase and sale. Deduct brokerage, legal fees, financing costs, maintenance, taxes and every other expense attributable to the transaction. A ₹45 lakh gross difference is not a ₹45 lakh take-home profit.",
    ),
    p(
      "time",
      "Second, measure time. Absolute profit answers how many rupees were made. Annualised return and compounded monthly return answer how efficiently the capital worked. Both are necessary. A higher sale price can still be the weaker result when reaching it takes much longer and blocks a better opportunity.",
    ),
    p(
      "liquidity",
      "Third, value liquidity. The first investor had ₹2.35 crore available after 12 months. The second carried the asking price and market risk for six more months. That patience was rewarded here, but it could have ended with a weaker offer or no buyer.",
    ),
    block(
      "sebi-liquidity",
      "normal",
      { text: "SEBI's investor guidance describes " },
      { text: "safety, returns and liquidity", href: "https://investor.sebi.gov.in/investment-thingsbeforeinv.html" },
      {
        text: " as three central considerations and notes that higher-return investments generally involve higher risk. The principle applies neatly here: a smart decision balances the possible upside with the ability to exit and redeploy capital.",
      },
    ),
    p(
      "opportunity-cost",
      "Fourth, calculate opportunity cost. Ask what the released capital can realistically do next. If there is a documented, fairly priced second opportunity ready for investment, accepting ₹2.35 crore may be powerful. If the next purchase is uncertain, expensive or legally unclear, waiting for ₹2.50 crore may be wiser.",
    ),
    p(
      "exit-rule",
      "Fifth, set the exit rule before emotion takes control. Define a target range, minimum net return, maximum holding period and the evidence that justifies waiting. Otherwise, an investor can reject a strong offer because the asking price has become personal.",
    ),
    h("tax", "The tax clock is not the investment clock"),
    block(
      "tax-guidance",
      "normal",
      { text: "Current " },
      { text: "Income Tax Department guidance", href: "https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/itr-2/itr-2-faqs?mobile-app=1" },
      {
        text: " states that land or a building held for more than 24 months is generally treated as a long-term capital asset. Both hypothetical exits occur within 24 months and therefore require careful short-term capital-gains analysis under the rules applicable when the sale happens. Tax law may change before or during 2027, so obtain transaction-specific advice from a qualified chartered accountant.",
      },
    ),
    h("entry", "The smartest return is often created at entry"),
    p(
      "construction-phase",
      "Both investors entered during construction rather than waiting for a finished floor. That can provide a pricing advantage, but the lower entry compensates for execution, delay, specification, documentation and market risks.",
    ),
    block(
      "one-crore-blog",
      "normal",
      { text: "Our guide to " },
      { text: "earning ₹1 crore through real estate", href: "/blogs/how-to-earn-1-crore-through-real-estate" },
      {
        text: " explains how entry price and holding time can work together. The lesson is not to buy every under-construction property; it is to identify the rare project where the price, location, documentation and developer execution support the risk being taken.",
      },
    ),
    block(
      "due-diligence",
      "normal",
      { text: "Before investing, apply the " },
      { text: "SEBI due-diligence principle", href: "https://investor.sebi.gov.in/due_diligence.html" },
      {
        text: ": understand the material facts and assess the risk-return profile. For property, that means independent legal verification, sanctioned plans, ownership documents, written specifications, payment milestones and an honest comparison with completed floors in the same micro-market.",
      },
    ),
    h("south-delhi", "What this means for South Delhi property in 2027"),
    p(
      "micro-markets",
      "South Delhi is not one uniform market. Lajpat Nagar, East of Kailash, South Extension and Defence Colony respond to different budgets, while adjacent blocks vary by road width, parking, floor rights, light and construction quality.",
    ),
    block(
      "pricing-guide",
      "normal",
      { text: "Read our guide to " },
      { text: "2BHK prices in the Lajpat Nagar area", href: "/blogs/prices-for-2bhk-in-lajpat-nagar-area" },
      { text: " and our analysis of whether it is " },
      { text: "the right time to buy property in Lajpat Nagar", href: "/blogs/right-time-buy-property-lajpat-nagar-2026" },
      {
        text: ". Together they show why the exact block, product and entry price matter more than a broad market headline.",
      },
    ),
    h("sky", "Use Sky Skrabers to compare opportunities, not just asking prices"),
    p(
      "portfolio",
      "Sky Skrabers currently has 13 ongoing South Delhi projects across different locations, budgets and construction stages. The useful question is not, ‘Which floor is cheapest?’ It is, ‘Which opportunity best balances entry price, quality, timeline, resale depth and risk?’",
    ),
    block(
      "projects",
      "normal",
      { text: "Explore our " },
      { text: "ongoing South Delhi projects", href: "/ongoing-projects" },
      { text: ", including opportunities in " },
      { text: "Lajpat Nagar I, II and IV", href: "/projects/lajpat-nagar-1-2" },
      { text: ", " },
      { text: "Lajpat Nagar III", href: "/projects/lajpat-nagar-3-4" },
      { text: ", " },
      { text: "East of Kailash", href: "/projects/east-of-kailash" },
      { text: " and " },
      { text: "South Extension I and II", href: "/projects/south-extension-1-2" },
      { text: ". Compare the actual project details and obtain independent advice before deciding." },
    ),
    h("verdict", "So, who was the smart investor?"),
    p(
      "verdict-answer",
      "The second investor made the larger gross profit from one property. The first investor generated the faster return and gained six months of liquidity. If a strong second opportunity was genuinely ready, the first investor may have built more wealth by month 18. If no such opportunity existed, the second investor's patience produced the better outcome.",
    ),
    p(
      "definition",
      "The smart investor was not necessarily the person who sold first or waited longer. It was the person whose decision matched a written plan, used realistic net numbers and understood what would happen to the capital next. Smart investing is not predicting one perfect price. It is making the next decision before the previous one has had time to become emotional.",
    ),
    block(
      "contact",
      "normal",
      { text: "To compare current construction-stage opportunities, " },
      { text: "visit the Sky Skrabers office", href: "/contact-us" },
      {
        text: ". Bring your budget, investment horizon and exit objective. We will help you examine the available projects and the assumptions behind the numbers, while you retain independent legal, tax and financial advisers for the final decision.",
      },
    ),
  ],
};
