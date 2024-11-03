"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import React from "react";

export const PropInformation = ({ content }: { content: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div
          className={clsx(
            "relative before:absolute before:top-0 before:left-0 before:-z-[1] before:w-full before:h-full before:bg-transparent before:rounded-md before:scale-75 before:content-[''] before:transition-all",
            "hover:before:scale-100 hover:before:bg-gray-3 hover:text-foreground",
            "w-[24px] h-[24px] flex items-center justify-center rounded-md z-[0] bg-transparent transition-all text-muted",
          )}
        >
          <InfoCircledIcon />
        </div>
      </Popover.Trigger>
      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content side="top" sideOffset={4} onOpenAutoFocus={(e) => e.preventDefault()}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: [0.19, 1, 0.22, 1],
                  duration: 0.2,
                }}
                className="bg-gray-2 text-gray-11 max-w-96 border border-gray-4 py-2 px-3 rounded-lg shadow text-small leading-[18px]  gap-2 items-center inline-block"
              >
                {content}
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
};
