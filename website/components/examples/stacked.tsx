"use client";

import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import { useState } from "react";
import * as Dialog from "toldo";

export const Stacked = () => {
  const [open, setOpen] = useState(false);

  const dialogs: Dialog.Props[] = [
    {
      id: "username",
      dialog: (
        <Dialog.StackContent className="flex max-h-[85vh] w-[90vw] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px]">
          <Dialog.StackTitle className="px-6 pt-5 font-semibold text-foreground text-large">
            Change Username
          </Dialog.StackTitle>
          <Dialog.StackDescription className="px-6 py-1 text-default text-muted">
            Make changes to your username here.
          </Dialog.StackDescription>
          <fieldset className="mb-[15px] flex items-center gap-4 px-6 py-5">
            <input
              id="name"
              placeholder="@raphaelsalaja"
              className="inline-flex h-[32px] w-full flex-1 items-center justify-center rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
            />
          </fieldset>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-4">
            <Dialog.Close className="!text-gray-11 h-[32px] max-w-fit rounded-lg bg-gray-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Cancel
            </Dialog.Close>
            <Dialog.StackAdd
              dialogId="email"
              className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Continue
            </Dialog.StackAdd>
          </div>
        </Dialog.StackContent>
      ),
    },
    {
      id: "email",
      dialog: (
        <Dialog.StackContent className="flex max-h-[85vh] w-[90vw] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px]">
          <Dialog.StackTitle className="px-6 pt-5 font-semibold text-foreground text-large">
            Change Email
          </Dialog.StackTitle>
          <Dialog.StackDescription className="px-6 py-1 text-default text-muted">
            Make changes to your email here.
          </Dialog.StackDescription>
          <fieldset className="mb-[15px] flex items-center gap-4 px-6 py-5">
            <input
              id="email"
              placeholder="raphaelsalaja@gmail.com"
              className="inline-flex h-[32px] w-full flex-1 items-center justify-center rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
            />
          </fieldset>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-4">
            <Dialog.StackRemove
              dialogId="email"
              className="!text-gray-11 h-[32px] max-w-fit rounded-lg bg-gray-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Return
            </Dialog.StackRemove>
            <Dialog.StackAdd
              dialogId="date-of-birth"
              className="!text-blue-11 h-[32px] max-w-fit rounded-lg bg-blue-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Continue
            </Dialog.StackAdd>
          </div>
        </Dialog.StackContent>
      ),
    },
    {
      id: "date-of-birth",
      dialog: (
        <Dialog.StackContent className="flex max-h-[85vh] w-[90vw] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px]">
          <Dialog.StackTitle className="px-6 pt-5 font-semibold text-foreground text-large">
            Change Date of Birth
          </Dialog.StackTitle>
          <Dialog.StackDescription className="px-6 py-1 text-default text-muted">
            Make changes to your birth date here.
          </Dialog.StackDescription>
          <fieldset className="mb-[15px] flex items-center gap-4 px-6 py-5">
            <input
              id="date-of-birth"
              placeholder="January 1, 2000"
              className="inline-flex h-[32px] w-full flex-1 items-center justify-center rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
            />
          </fieldset>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-4">
            <Dialog.StackRemove
              dialogId="date-of-birth"
              className="!text-gray-11 h-[32px] max-w-fit rounded-lg bg-gray-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Return
            </Dialog.StackRemove>
            <Dialog.Close className="!text-green-11 h-[32px] max-w-fit rounded-lg bg-green-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Save Changes
            </Dialog.Close>
          </div>
        </Dialog.StackContent>
      ),
    },
  ];

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
    <Dialog.Root open={open} onOpenChange={setOpen} dialogs={dialogs}>
      <Dialog.Trigger
        dialogId="username"
        className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95"
      >
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {open && (
            <Dialog.Overlay className="fixed top-0 left-0 h-full w-full">
              <motion.div className="fixed inset-0 bg-black-a10" {...variants.overlay} />
            </Dialog.Overlay>
          )}
        </AnimatePresence>
        <AnimatePresence>{open && <Dialog.Stack {...variants.content} />}</AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
