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

export const lajpatNagarCarpetAreaPost: BlogPost = {
  slug: "carpet-area-vs-built-up-area-in-lajpat-nagar",
  title: "Carpet Area vs Built-Up Area in Lajpat Nagar: What Are You Actually Buying?",
  category: "Buyer Guides",
  excerpt: "Two Lajpat Nagar floors can carry the same headline area and still give a family very different space. The reason is hidden in what that number includes.",
  description: "Understand carpet area vs built-up area in Lajpat Nagar, compare usable space, plans and price per usable square foot before buying a builder floor.",
  date: "2026-11-22T09:00:00+05:30",
  displayDate: "22 November 2026",
  readTime: "6 min read",
  image: "/assets/blogs/carpet-area-vs-built-up-area-lajpat-nagar.png",
  imageAlt: "Editorial architectural model showing a builder floor's usable interior within its larger outer footprint",
  imageSource: "Original AI-generated editorial illustration, not a sanctioned plan or photograph of a Sky Skrabers property.",
  keywords: [
    "carpet area vs built-up area in Lajpat Nagar",
    "carpet area in Lajpat Nagar",
    "builder floor in Lajpat Nagar",
    "property for sale in Lajpat Nagar",
    "usable area in South Delhi property",
  ],
  pullQuotes: [
    "The most expensive square foot is the one you paid for but cannot use the way you expected.",
    "Compare homes by the life that fits inside the plan, not by the largest number in the brochure.",
  ],
  metrics: [],
  body: [
    p("opening", "A couple visits two new builder floors in Lajpat Nagar on the same afternoon. Both are introduced as approximately 1,800 square feet. The first feels open: the dining table fits without narrowing the passage, the bedrooms accept full wardrobes and the living room still has breathing space. The second looks equally impressive in photographs, yet the family keeps asking where the missing space went."),
    p("missing", "It did not disappear. It may be sitting inside thick external walls, balconies, shafts, circulation or another part of the quoted measurement. That is why the first area question should not be, 'How many square feet is the floor?' It should be, 'Which area are you quoting, and what exactly is included?'"),
    p("answer", "When comparing carpet area vs built-up area in Lajpat Nagar, ask for the measurement basis in writing, study the floor plan and compare room dimensions. Then calculate the price against the usable area you can verify. A larger headline number does not automatically mean a larger home."),

    h("definitions", "Carpet area has a specific legal meaning"),
    block("rera", "normal", { text: "Under Section 2(k) of India's " }, { text: "Real Estate (Regulation and Development) Act, 2016", href: "https://www.indiacode.nic.in/bitstream/123456789/5363/1/the_real_estate_%28regulation_%26_development%29_act%2C_2016.pdf" }, { text: ", carpet area is the net usable floor area of an apartment. It excludes the area covered by external walls, service shafts, exclusive balconies or verandahs and exclusive open terraces, while including the area covered by internal partition walls. That definition is more precise than the everyday idea of simply measuring wherever a carpet could be laid." }),
    p("built-up", "Built-up area is generally used for a broader measurement that may add wall thickness and balcony or verandah areas to the usable interior. You may also encounter terms such as covered area, super area, saleable area or plot share. These labels are not interchangeable. Never assume what a quoted figure contains because a broker, seller or brochure uses a familiar-sounding term."),
    p("clarity", "Ask the seller or developer to identify each component: net usable interior, internal walls, external walls, balconies, shafts, common areas and any terrace or parking rights. Your architect and property lawyer can then compare the plan, documents and physical property. The objective is not to win an argument over terminology. It is to understand the product before you price it."),

    h("example", "The 1,800-square-foot comparison that changes the decision"),
    p("illustration", "Consider a simple illustration, not an actual listing. Floor A and Floor B are each advertised at 1,800 square feet on similar Lajpat Nagar lanes. Floor A has 1,480 square feet of stated carpet area. Floor B has 1,330 square feet. The difference is 150 usable square feet, even though the headline number is identical."),
    p("life", "One hundred and fifty square feet can be the difference between a proper study and a desk squeezed into a bedroom. It can decide whether a dining table sits naturally or blocks movement. It can become wardrobe depth, a utility zone, a wider living room or simply the comfort of not designing every room around a compromise."),
    p("ratio", "In this illustration, Floor A's carpet area is about 82% of the headline area, while Floor B's is about 74%. Those percentages are not universal standards and should not be treated as a pass-or-fail rule. They are a quick way to expose a question: why is the usable outcome different? The answer may be reasonable design choices, larger balconies or structural constraints, but it deserves to be understood."),

    h("price", "Now compare the price per usable square foot"),
    p("same-price", "Suppose both illustrative floors are offered at ₹4.50 crore, before stamp duty, registration, interiors and other acquisition costs. Against the 1,800-square-foot headline, each appears to cost ₹25,000 per square foot. Against the stated carpet area, Floor A is about ₹30,405 per square foot and Floor B about ₹33,835 per square foot."),
    p("meaning", "This calculation does not prove that Floor A is the better purchase. Floor B may have the superior lane, light, parking, floor level, construction quality or balcony. It does show that the two prices are not as similar as the first number suggested. Price per usable square foot is a comparison tool, not a valuation formula."),
    block("price-guide", "normal", { text: "Use the same discipline when reviewing our " }, { text: "Lajpat Nagar 2BHK price guide", href: "/blogs/prices-for-2bhk-in-lajpat-nagar-area" }, { text: ". Locality, age, floor, lift, parking and condition all influence an asking price, so area should be compared alongside the rest of the property rather than in isolation." }),

    h("plan", "A floor plan can reveal what the total area conceals"),
    p("dimensions", "Start with room dimensions, not coloured furniture symbols. Measure the clear width and length of the living room and bedrooms. Check where wardrobes can open, where a full-size bed leaves walking space and whether the dining area remains comfortable when chairs are pulled out. Look for long corridors, awkward corners and doors that collide."),
    p("light", "Then read the edges of the plan. Which rooms receive windows? How deep is the balcony? Where are the service shafts? Does the kitchen have a practical utility connection? A generous balcony may be valuable to one family and less important to another. The point is not to minimise every non-carpet component; it is to decide whether each component improves your life enough to justify its cost."),
    p("site", "For an under-construction floor, compare the drawing with the work on site at safe, permitted stages. For a completed home, take measurements with the seller's consent. If a dimension is central to the decision, have a qualified professional verify it. Do not rely on a phone photograph of a plan whose scale, revision date or approval status is unknown."),
    block("quality", "normal", { text: "Area efficiency also cannot rescue poor execution. Take our guide to " }, { text: "checking construction quality before buying a property", href: "/blogs/how-to-check-construction-quality-of-a-property" }, { text: " to the viewing and examine the systems behind the finish as carefully as the layout." }),

    h("documents", "Put the area conversation into the documents"),
    p("writing", "Ask which area appears in the proposed agreement or sale deed, how balconies and terraces are described, and whether the plan attached to the transaction matches the floor being shown. Confirm parking, roof or terrace rights, common areas and undivided land share separately where relevant. These rights should not be inferred from an area figure."),
    p("lawyer", "Have an independent property lawyer review title, sanctioned plans, approvals and transaction documents. Have an architect or suitable professional review measurements and planning questions when needed. A site-team explanation can help you understand the proposal, but independent advice protects the decision you are making with your own money."),
    block("token", "normal", { text: "Before transferring a booking amount, work through our " }, { text: "Lajpat Nagar token-payment checklist", href: "/blogs/property-for-sale-in-lajpat-nagar-before-paying-token" }, { text: ". A clear area schedule should be part of the information you organise before urgency enters the conversation." }),

    h("sky", "How to compare usable space with Sky Skrabers"),
    p("brand", "When you visit a Sky Skrabers property, bring the furniture and routines that matter to your household. Tell the team whether you need a study, larger wardrobes, a formal dining area, an accessible route for parents or a utility space that stays out of sight. A useful comparison begins with the way you live, not with the largest number available."),
    block("projects", "normal", { text: "Compare current layouts across the " }, { text: "Lajpat Nagar I, II and IV projects", href: "/projects/lajpat-nagar-1-2" }, { text: ", the " }, { text: "Lajpat Nagar III projects", href: "/projects/lajpat-nagar-3-4" }, { text: " and our wider " }, { text: "ongoing South Delhi projects", href: "/ongoing-projects" }, { text: ". Availability, areas and specifications vary by property, so confirm the exact plan and written details for the floor you are considering." }),
    block("reel", "normal", { text: "You can also watch our " }, { text: "Sky Skrabers property-quality reel", href: "https://www.instagram.com/p/DdLjo3WIal5/" }, { text: ". Use it as a starting point, then inspect the particular property's plan, measurements, materials and execution in person." }),
    p("customer", "Ask whether a previous customer is willing to discuss their experience, subject to consent and availability. Instead of requesting a general rating, ask what the rooms felt like after furniture arrived, whether storage worked as planned and how the building performed after possession. Specific questions create more useful conversations."),

    h("close", "The best area figure is the one you can understand"),
    p("takeaway", "Before choosing a builder floor in Lajpat Nagar, write down five things: the area term being quoted, the stated carpet area, the room dimensions, what is excluded and the price per usable square foot. Then compare light, layout, parking, construction, documents and location. No single ratio can choose the home for you, but clear measurements can prevent the wrong number from choosing it for you."),
    block("contact", "normal", { text: "If you are comparing property for sale in Lajpat Nagar, " }, { text: "arrange a Sky Skrabers site visit", href: "/contact-us" }, { text: " and ask to review the layouts side by side. Compare homes by the life that fits inside the plan, not by the largest number in the brochure." }),
  ],
};
