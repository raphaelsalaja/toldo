"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import React from "react";
import * as Dialog from "toldo";

export const Shared = () => {
  const [open, setOpen] = React.useState(false);

  const variants: { [key: string]: AnimationProps } = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Dialog.Item
          layout
          layoutId="container"
          className="flex size-24 items-center justify-between gap-2 overflow-hidden"
          style={{
            borderRadius: 12,
          }}
        >
          <motion.div layoutId="media" className="relative h-full w-full bg-[#FFBF98]" />
        </Dialog.Item>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed top-0 left-0 h-full w-full">
              <motion.div className="fixed inset-0 bg-black-a10" {...variants.overlay} />
            </Dialog.Overlay>
            <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 transform">
              <Dialog.Item
                layout
                layoutId="container"
                className="overflow-hidden bg-gray-1 sm:w-[512px]"
                style={{
                  borderRadius: 12,
                }}
              >
                <Dialog.Item layoutId="media" className="relative flex h-96 w-full flex-col justify-end gap-4 bg-[#FFBF98] p-4">
                  <div className="flex flex-col gap-0 align-middle">
                    <Dialog.Title className="font-semibold text-black-a12 text-large">PANTONE®</Dialog.Title>
                    <h3 className="font-medium text-black-a12">13-1023</h3>
                    <Dialog.Description className="font-medium text-black-a12 text-default">Peach Fuzz</Dialog.Description>
                  </div>
                  <Dialog.Close className="!text-white-a12 absolute top-4 right-4 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black-a12 align-middle transition-all ease-in-out hover:brightness-90">
                    <Cross2Icon />
                  </Dialog.Close>
                </Dialog.Item>
              </Dialog.Item>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
