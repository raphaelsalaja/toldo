import { navigation } from "@/lib/navigation";

export const SideNavigation = () => {
  return (
    <nav className="sticky top-0 h-full w-64 bg-gray-800 text-white">
      <ul>
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="p-4 font-bold text-lg">{section.title}</h2>
            <ul>
              {section.items.map((item) => (
                <li key={item.title}>
                  <a href={item.href} className="block p-4 hover:bg-gray-700">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
