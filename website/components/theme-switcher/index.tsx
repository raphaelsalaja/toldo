"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const AppThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const buttons = [
    {
      label: "system",
      icon: <Monitor width={13} />,
      active: resolvedTheme === "system",
    },
    {
      label: "dark",
      icon: <Moon width={13} />,
      active: resolvedTheme === "dark",
    },
    {
      label: "light",
      icon: <Sun width={13} />,
      active: resolvedTheme === "light",
    },
  ];

  if (!mounted) return null;

  return (
    <span className="flex w-fit items-center gap-0.5 overflow-hidden rounded-[6px] bg-gray-2 p-[2px]">
      {buttons.map(({ label, icon, active }) => (
        <button
          type="button"
          key={label}
          onClick={() => setTheme(label)}
          className={clsx(
            "transition-all flex h-6 w-6 items-center justify-center rounded-[4px] hover:opacity-50",
            active ? "bg-gray-4 text-foreground" : ""
          )}
        >
          {icon}
        </button>
      ))}
    </span>
  );
};
