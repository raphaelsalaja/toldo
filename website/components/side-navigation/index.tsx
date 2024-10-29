"use client";

import { navigation } from "@/lib/navigation";

import npm from "^/src/package.json";
import clsx from "clsx";
import { LucideThermometer } from "lucide-react";
import { usePathname } from "next/navigation";
import { AppThemeSwitcher } from "../theme";

export const SideNavigation = () => {
	const path = usePathname();

	const version = npm.version;

	return (
		<nav className="sticky flex h-full flex-col gap-8 text-white">
			<div className={"flex items-center gap-2"}>
				Todlo
				<span className=" flex items-center rounded-full bg-pink-3 px-2 py-1 text-[10px] text-pink-11 leading-none">
					{version}
				</span>
			</div>
			{navigation.map((section) => (
				<div key={section.title}>
					<div className="mb-2 flex items-center gap-2">{section.title}</div>
					<div className="flex flex-col ">
						{section.items.map((item) => {
							const first = section.items[0] === item;
							const last = section.items[section.items.length - 1] === item;
							const active = path === item.href;
							return (
								<div
									key={item.title}
									className={clsx(
										"relative",
										"before:pointer-events-none before:absolute before:bottom-0 before:left-1 before:z-10 before:w-px before:bg-border",
										first ? "before:top-2" : "before:top-0 ",
										last ? "before:bottom-2" : "before:bottom-0 ",
									)}
								>
									<a
										className={clsx(
											"before:-z-10 relative flex overflow-hidden",
											"rounded-md py-2 pr-2 pl-6 transition-colors",
											"after:absolute after:inset-y-2 after:left-1 after:z-10 after:w-px after:transition-colors",
											"hover:text-foreground hover:opacity-100",
											active && "text-foreground after:bg-foreground",
											!active && "text-muted",
										)}
										href={item.href}
									>
										{item.title}
									</a>
								</div>
							);
						})}
					</div>
				</div>
			))}
			<AppThemeSwitcher />
		</nav>
	);
};
