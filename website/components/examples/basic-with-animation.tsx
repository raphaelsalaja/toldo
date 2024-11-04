"use client";

import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import React from "react";
import * as Dialog from "toldo";

export const BasicWithAnimation = () => {
  const [open, setOpen] = React.useState(false);

  const variants: { [key: string]: AnimationProps } = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
    content: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95">
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <AnimatePresence mode="popLayout">
          {open && (
            <Dialog.Overlay className="fixed top-0 left-0 h-full w-full">
              <motion.div className="fixed inset-0 bg-black-a10" {...variants.overlay} />
            </Dialog.Overlay>
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {open && (
            <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 transform">
              <motion.div className="flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px]" {...variants.content}>
                <Dialog.Title className="px-6 pt-5 font-semibold text-foreground text-large">Change Username</Dialog.Title>
                <Dialog.Description className="px-6 py-1 text-default text-muted">Make changes to your username here.</Dialog.Description>
                <fieldset className="mb-[15px] flex items-center gap-4 px-6 py-4">
                  <input
                    id="name"
                    placeholder="@raphaelsalaja"
                    className="inline-flex h-[32px] w-full flex-1 items-center justify-center rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
                  />
                </fieldset>
                <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
                  <Dialog.Close className="!text-gray-11 h-[32px] max-w-fit rounded-lg bg-gray-a3 px-3 transition-all ease-in-out hover:brightness-150">
                    Cancel
                  </Dialog.Close>
                  <Dialog.Close className="!text-green-11 h-[32px] max-w-fit rounded-lg bg-green-a3 px-3 transition-all ease-in-out hover:brightness-150">
                    Save Changes
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
