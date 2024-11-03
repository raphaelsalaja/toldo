"use client";

import { cn } from "@/lib/cn";

import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";

export const OnThisPage = () => {
  const [headings, setHeadings] = useState<
    {
      id: string;
      text: string;
      level: string;
    }[]
  >([]);
  const [visibleHeadings, setVisibleHeadings] = useState<Set<string>>(new Set());

  const getHeadings = useCallback(() => {
    return Array.from(document.querySelectorAll("h1, h2, h3"))
      .filter((heading) => heading.id)
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase(),
        top: (heading as HTMLElement).offsetTop,
      }));
  }, []);

  useEffect(() => {
    const collectedHeadings = getHeadings();
    setHeadings(collectedHeadings);

    const observerOptions = {
      root: null,
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleSet = new Set(visibleHeadings);

      for (const entry of entries) {
        const headingId = entry.target.id;

        if (entry.isIntersecting) {
          visibleSet.add(headingId);
        } else {
          visibleSet.delete(headingId);
        }
      }

      setVisibleHeadings(new Set(visibleSet));
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    for (const heading of collectedHeadings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [getHeadings, visibleHeadings]);

  const scroll = (id: string) => {
    for (const heading of Array.from(document.querySelectorAll("h1, h2, h3"))) {
      heading.setAttribute("data-highlight", "false");
    }

    const element = document.getElementById(id);

    if (element) {
      const top = element.offsetTop - 100;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });

      element.setAttribute("data-highlight", "true");

      setTimeout(() => {
        element.setAttribute("data-highlight", "false");
      }, 2000);
    }
  };

  return (
    <React.Fragment>
      <motion.nav
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        className={cn(
          "top-[10rem] -right-[128px] hidden",
          "xl:top-[6rem] xl:right-[64px] xl:block",
          "fixed mt-0 h-full w-48 justify-start space-y-4 transition",
        )}
      >
        <div className="mt-0 flex flex-col gap-1">
          {headings.map((heading) => (
            <div key={heading.id} className="mt-0">
              <button
                type="button"
                onClick={() => scroll(heading.id)}
                className={cn({
                  "mt-0 ml-2 py-1 text-left text-muted opacity-100 transition ease-in-out hover:opacity-50": true,
                  "text-bold text-gray-12": visibleHeadings.has(heading.id),
                  "pl-0": heading.level === "h1",
                  "pl-8": heading.level === "h2",
                  "pl-12": heading.level === "h3",
                })}
                data-active={visibleHeadings.has(heading.id) ? "true" : "false"}
              >
                {heading.text}
              </button>
            </div>
          ))}
        </div>
      </motion.nav>
    </React.Fragment>
  );
};
