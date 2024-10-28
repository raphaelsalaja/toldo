interface NavigationItem {
  title: string;
  href: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const navigation: NavigationSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/",
      },
      {
        title: "Installation",
        href: "/installation",
      },
      {
        title: "Anatomy",
        href: "/anatomy",
      },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        title: "Basic",
        href: "/basic",
      },
      {
        title: "Route Based",
        href: "/route-based",
      },
      {
        title: "Shared Layout",
        href: "/shared-layout",
      },
      {
        title: "Stacked",
        href: "/stackable",
      },
    ],
  },
];
