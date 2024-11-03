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
            "before:-z-[1] relative before:absolute before:top-0 before:left-0 before:h-full before:w-full before:scale-75 before:rounded-md before:bg-transparent before:transition-all before:content-['']",
            "hover:text-foreground hover:before:scale-100 hover:before:bg-gray-3",
            "z-[0] flex h-[24px] w-[24px] items-center justify-center rounded-md bg-transparent text-muted transition-all",
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
                className="inline-block max-w-96 items-center gap-2 rounded-lg border border-gray-4 bg-gray-2 px-3 py-2 text-gray-11 text-small leading-[18px] shadow"
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
