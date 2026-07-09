import type { ProjectAddressGroup } from "@/app/projects/_components/ProjectDetailPage";

export type CompletedProject = {
  slug: string;
  name: string;
  titleLines: string[];
  description: string;
  categories: ProjectAddressGroup[];
};

const details = (items: [string, string][]) => items.map(([label, value]) => ({ label, value }));

export const completedProjects: CompletedProject[] = [
  {
    slug: "lajpat-nagar-1-2",
    name: "Lajpat Nagar 1/2",
    titleLines: ["LAJPAT", "NAGAR 1/2"],
    description: "Outright and commercial property portfolio in Lajpat Nagar 1 and 2 by Sky Skrabers.",
    categories: [
      {
        title: "Outright Properties",
        addresses: [
          {
            title: "O-12B, Lajpat Nagar-2",
            tags: ["Outright", "Commercial", "Pre-rented"],
            details: details([
              ["Size", "100 sqyrd"],
              ["Type", "Commercial fully built property"],
              ["Income", "Pre-rented @7.65 Lacs"],
            ]),
          },
          {
            title: "E-88, Lajpat Nagar-2",
            tags: ["Outright", "Commercial Plot", "Lease Hold"],
            details: details([
              ["Size", "100 sqyrd"],
              ["Opening", "3 Side Open"],
              ["Type", "Lease Hold Commercial Plot"],
            ]),
          },
        ],
      },
      {
        title: "Commercial Properties",
        addresses: [
          {
            title: "1-57, Lajpat Nagar-2",
            tags: ["Commercial", "Leasehold", "Pre-rented"],
            details: details([
              ["Size", "100 sqyrd"],
              ["Tenure", "Leasehold"],
              ["Income", "Pre-rented @1,10,000/-"],
            ]),
          },
          {
            title: "41 Krishna Market, Lajpat Nagar-1",
            tags: ["Commercial", "Shops", "For Sale"],
            details: details([["Inventory", "7 Shops for Sale"]]),
          },
        ],
      },
    ],
  },
  {
    slug: "nehru-enclave",
    name: "Nehru Enclave",
    titleLines: ["NEHRU", "ENCLAVE"],
    description: "Outright property portfolio in Nehru Enclave by Sky Skrabers.",
    categories: [
      {
        title: "Outright Properties",
        addresses: [
          {
            title: "5/5, Nehru Enclave",
            tags: ["Outright", "Plot", "Park Facing"],
            details: details([
              ["Size", "447 sqyd"],
              ["Facing", "Park Facing"],
              ["Note", "GAU MUKHA"],
            ]),
          },
        ],
      },
      { title: "Commercial Properties", addresses: [] },
    ],
  },
  {
    slug: "noida-sector-31",
    name: "Noida Sector 31",
    titleLines: ["NOIDA", "SECTOR 31"],
    description: "Outright property portfolio in Noida Sector 31 by Sky Skrabers.",
    categories: [
      {
        title: "Outright Properties",
        addresses: [
          {
            title: "B-218, Sec-31, NOIDA",
            tags: ["Outright", "Built-up", "Old Kothi"],
            details: details([
              ["Size", "300 sqmtr"],
              ["Type", "Built-up Old KOTHI"],
            ]),
          },
        ],
      },
      { title: "Commercial Properties", addresses: [] },
    ],
  },
  {
    slug: "ramesh-nagar",
    name: "Ramesh Nagar",
    titleLines: ["RAMESH", "NAGAR"],
    description: "Outright residential plot portfolio in Ramesh Nagar by Sky Skrabers.",
    categories: [
      {
        title: "Outright Properties",
        addresses: [
          {
            title: "8/186, Ramesh Nagar",
            tags: ["Outright", "Residential Plot", "Free Hold"],
            details: details([
              ["Size", "100 sqyrd"],
              ["Tenure", "Free Hold"],
              ["Type", "Residential Plot"],
            ]),
          },
          {
            title: "8/187, Ramesh Nagar",
            tags: ["Outright", "Residential Plot", "Free Hold"],
            details: details([
              ["Size", "100 sqyrd"],
              ["Tenure", "Free Hold"],
              ["Type", "Residential Plot"],
            ]),
          },
        ],
      },
      { title: "Commercial Properties", addresses: [] },
    ],
  },
  {
    slug: "kalkaji",
    name: "Kalkaji",
    titleLines: ["KALKAJI"],
    description: "Outright and commercial property portfolio in Kalkaji by Sky Skrabers.",
    categories: [
      {
        title: "Outright Properties",
        addresses: [
          {
            title: "H/28A, Kalkaji",
            tags: ["Outright", "Residential Plot", "Free Hold"],
            details: details([
              ["Size", "100 sqyrd"],
              ["Tenure", "Free Hold"],
              ["Type", "Residential Plot"],
            ]),
          },
        ],
      },
      {
        title: "Commercial Properties",
        addresses: [
          {
            title: "C-100A, Kalkaji",
            tags: ["Commercial", "Basement", "Booking Open"],
            details: details([
              ["Size", "100 sqyrd"],
              ["Level", "Basement"],
              ["Entry", "Front Side Entry"],
              ["Status", "Booking Open"],
            ]),
          },
        ],
      },
    ],
  },
  {
    slug: "hauz-khas",
    name: "Hauz Khas",
    titleLines: ["HAUZ", "KHAS"],
    description: "Commercial property portfolio in Hauz Khas Village by Sky Skrabers.",
    categories: [
      { title: "Outright Properties", addresses: [] },
      {
        title: "Commercial Properties",
        addresses: [
          {
            title: "29A, Hauz Khas Village",
            tags: ["Commercial", "Shop", "Pre-rented"],
            details: details([
              ["Size", "500 sqft"],
              ["Level", "Ground Floor Shop"],
              ["Income", "Pre-rented @3lacs"],
            ]),
          },
        ],
      },
    ],
  },
  {
    slug: "defence-colony",
    name: "Defence Colony",
    titleLines: ["DEFENCE", "COLONY"],
    description: "Commercial property portfolio in Defence Colony by Sky Skrabers.",
    categories: [
      { title: "Outright Properties", addresses: [] },
      {
        title: "Commercial Properties",
        addresses: [
          {
            title: "No. 23, A Block, Defence Colony",
            tags: ["Commercial", "Corner", "Booking Open"],
            details: details([
              ["Size", "213 sqyrd"],
              ["Opening", "Corner (Sher Mukha)"],
              ["Level", "3rd Floor with Terrace"],
              ["Status", "Booking Open"],
            ]),
          },
        ],
      },
    ],
  },
];

export const getCompletedProject = (slug: string) => completedProjects.find((project) => project.slug === slug);

export const getCompletedProjectPropertyCount = (slug: string) =>
  getCompletedProject(slug)?.categories.reduce((total, category) => total + category.addresses.length, 0) ?? 0;
