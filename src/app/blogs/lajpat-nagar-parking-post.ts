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

export const lajpatNagarParkingPost: BlogPost = {
  slug: "buying-a-builder-floor-in-lajpat-nagar-check-the-parking-first",
  title: "Buying a Builder Floor in Lajpat Nagar? Check the Parking First",
  category: "Buyer Guides",
  excerpt: "The kitchen impressed you. The balcony won you over. But can you park, open the door and leave without moving someone else's car?",
  description: "Buying property for sale in Lajpat Nagar? Check stilt parking access, car clearance, tandem arrangements and written terms before choosing a builder floor.",
  date: "2026-11-15T09:00:00+05:30",
  displayDate: "15 November 2026",
  readTime: "6 min read",
  image: "/assets/blogs/builder-floor-parking-lajpat-nagar.png",
  imageAlt: "Editorial illustration of a residential stilt parking area with a clear driveway and separate lift approach",
  imageSource: "Original AI-generated editorial illustration, not a photograph or approved plan of a Sky Skrabers property.",
  keywords: ["builder floor parking in Lajpat Nagar", "property for sale in Lajpat Nagar", "stilt parking in Lajpat Nagar", "builder floors in South Delhi", "buying a builder floor"],
  pullQuotes: ["Two parking spaces and two independently usable parking spaces are not necessarily the same thing.", "Your homecoming starts at the gate, not at the drawing-room door."],
  metrics: [],
  body: [
    p("opening", "The kitchen has soft-close drawers. The balcony catches the evening light. Your family is already deciding where the sofa will go. Then you return to your car and realise you cannot open the driver's door properly. A column is in the way. It is a small moment, but it asks a much bigger question: did you inspect the whole home, or only the rooms upstairs?"),
    p("answer", "When shortlisting property for sale in Lajpat Nagar, treat parking as something to test, not a box to tick. Bring the car you actually drive, identify the space being offered, check whether you can enter and leave independently, and have the proposed parking arrangement reviewed in writing. A photograph of an empty stilt area cannot answer those questions."),
    p("promise", "This is not about finding fault with every building. It is about noticing the details that become part of your life twice a day. Here is how to look beyond the phrase 'parking available' and make a more confident comparison between builder floors."),
    h("meaning", "First, find out what 'parking included' actually means"),
    p("labels", "Ask the person showing the property to point to the exact proposed space. Is it within the stilt area, in an open area inside the plot, or simply a place outside the gate where a car is currently standing? Those are different arrangements. Do not treat an empty roadside patch as a promised private space without establishing what, if anything, is actually being offered."),
    p("written", "Next, ask how that arrangement is described in the proposed transaction documents and relevant plans. Have your property lawyer review the position, including access and any shared use. A salesperson pointing at a rectangle is not a substitute for that review. This is especially important when buying during construction, when the finished layout is not yet available to test."),
    h("drive", "The most useful viewing tool may be your own car"),
    p("arrival", "Arrange a safe demonstration with the seller or site team. Approach from the direction you would normally drive home. Check the turn from the street, the clear gate opening and the route around columns. A vehicle can fit inside a bay yet require awkward manoeuvring to reach it. Do not force a tight turn or enter an unfinished work area without the team's guidance."),
    p("doors", "Once parked, open the doors as you would in everyday use. Can a passenger get out beside the wall? Can you reach the boot with shopping bags? If your family uses a child seat or mobility aid, check that routine too. Think about the clearance when the neighbouring bay is occupied, not just when the entire space is empty for a viewing."),
    p("dimensions", "If you cannot bring your vehicle, take its actual dimensions, including mirrors where relevant, and ask for clear measurements on site. Length alone is not enough. Width, door-opening space, headroom and the approach all matter. For a car you may buy later, check that model separately rather than assuming every SUV will fit because one smaller car does."),
    h("tandem", "Two spaces can still mean one daily negotiation"),
    p("tandem-example", "Imagine two otherwise similar homes. In the first, both cars can leave without another vehicle moving. In the second, one parks behind the other. Both may be described as having two parking spaces, but the morning routine is different. The second arrangement is commonly called tandem parking: the outer car may need to move before the inner one can leave."),
    p("routine", "That can work for a household that controls both vehicles and understands the inconvenience. It may be much less suitable when access depends on another resident's schedule. Ask who uses each position, what happens when someone is away and whether you are relying on a driver or informal key-sharing arrangement. Do not leave an essential part of your daily access to an assumption."),
    h("walk", "Now get out and walk to the lift"),
    p("pedestrian", "Parking is also a pedestrian space. Follow the route your parents, children and visitors would take to the entrance. Is there a clear path when the cars are parked? Are steps and level changes easy to notice? Can doors open without blocking the lift approach? Look at the usable arrangement with vehicles present rather than judging the polish of the floor tiles."),
    p("maintenance", "Ask about lighting, cleaning, drainage and how maintenance access will be kept clear. Look for staining or signs of past water accumulation in a completed building, and ask for an explanation rather than diagnosing the cause yourself. For any concerns about slopes, drainage or electrical work, use a qualified professional. A tidy surface is reassuring, but it is not a technical inspection."),
    block("quality-link", "normal", { text: "Carry the same approach upstairs with our guide to " }, { text: "checking construction quality before buying a property", href: "/blogs/how-to-check-construction-quality-of-a-property" }, { text: ". The useful questions concern execution and long-term use, not just the finish you can see on viewing day." }),
    h("return", "Visit once when the building is not being presented to you"),
    p("timing", "With permission, arrange another visit at a different time. A quiet afternoon may not resemble the hour when residents return from work. Observe the approach road, gate access and the actual movement of vehicles. Avoid drawing conclusions from one unusually busy evening, but ask about repeated difficulties. A conversation with a willing resident can help put what you see into context."),
    p("visitors", "Also separate your own parking from visitor parking. Where would a guest wait without obstructing the entrance? What happens when a delivery arrives? These questions do not require a perfect solution to every possible occasion. They require an honest picture of how the building functions, so that the compromises are yours to choose."),
    h("comparison", "Compare the inconvenience, not an invented parking premium"),
    p("price", "There is no universal amount you should pay extra for a more convenient bay. Keep the other differences between homes in view: location, usable area, condition, floor, lift access and construction stage. A higher asking price is not justified simply because the word 'stilt' appears in the listing. Equally, a lower price may feel less attractive after you test a difficult daily manoeuvre."),
    block("price-link", "normal", { text: "Our " }, { text: "Lajpat Nagar 2BHK price guide", href: "/blogs/prices-for-2bhk-in-lajpat-nagar-area" }, { text: " explains why amenities and local pockets should be compared together. Reconfirm current asking prices when you enquire. Neither parking nor any other single feature guarantees a resale premium." }),
    h("sky", "Make the parking part of your Sky Skrabers site visit"),
    p("brand", "When you visit Sky Skrabers, tell the team how your household actually uses its vehicles. One car leaving early and another used occasionally creates a different requirement from two cars leaving independently every morning. Ask to compare available floors, their specifications and the proposed parking arrangements together. Good planning should make sense at ground level as well as inside the home."),
    block("projects", "normal", { text: "Start with the " }, { text: "Lajpat Nagar I, II and IV projects", href: "/projects/lajpat-nagar-1-2" }, { text: " and " }, { text: "Lajpat Nagar III projects", href: "/projects/lajpat-nagar-3-4" }, { text: ", or explore our wider " }, { text: "ongoing South Delhi projects", href: "/ongoing-projects" }, { text: ". Confirm the particular floor and parking terms currently available; arrangements should never be assumed identical across buildings." }),
    block("reel", "normal", { text: "For a visual introduction before your visit, watch our " }, { text: "Sky Skrabers property-tour reel", href: "https://www.instagram.com/p/Dc8FnJAqYOw/" }, { text: ". Enjoy the presentation, then use the site visit to test the practical details a reel cannot settle for your own household." }),
    p("customer", "You can also ask whether a previous customer is willing to discuss their experience, subject to their consent and availability. Questions about everyday access and upkeep can make that conversation more useful than a general request for a rating. Specifications, completed work and lived experience each tell you something different."),
    h("close", "Before you fall in love upstairs, arrive home downstairs"),
    p("takeaway", "Identify the space. Try the approach. Open the doors. Check independent exit and the walking route. Have the written terms reviewed. These simple steps turn 'parking included' into something you can understand and compare. The aim is not to buy the biggest empty area; it is to buy a home whose everyday arrangements work for you."),
    block("contact", "normal", { text: "If you are comparing builder floors in Lajpat Nagar, " }, { text: "arrange a Sky Skrabers site visit", href: "/contact-us" }, { text: " and bring your parking questions with you. Your homecoming starts at the gate, not at the drawing-room door." }),
  ],
};
