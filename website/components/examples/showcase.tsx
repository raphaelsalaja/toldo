"use client";

import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import React from "react";
import * as Dialog from "toldo";

const src = "https://images.beta.cosmos.so/9b9a064c-f9f2-4b9b-8130-51935048c54b?format=jpeg";

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
  icon: {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
    exit: { scale: 0.9 },
    transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
  },
};

const CodeBlock = () => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
        navigator.clipboard.writeText("pnpm install toldo");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <pre className="flex h-[32px] items-center justify-between rounded-lg border border-gray-4 bg-gray-2 py-0 pr-2 pl-3">
      <code className="language-jsx">{"pnpm install toldo"}</code>
      <AnimatePresence mode="popLayout">
        {copied ? (
          <motion.button className="text-muted hover:text-foreground" {...variants.icon}>
            <CheckIcon />
          </motion.button>
        ) : (
          <motion.button className="text-muted hover:text-foreground" {...variants.icon}>
            <ClipboardIcon
              onClick={() => {
                navigator.clipboard.writeText("pnpm install toldo");
                setCopied(true);
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </pre>
  );
};

const Source = () => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
        navigator.clipboard.writeText("https://github.com/raphaelsalaja/toldo");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <pre className="flex h-[32px] items-center justify-between rounded-lg border border-gray-4 bg-gray-2 py-0 pr-2 pl-3">
      <code className="language-jsx">{"raphaelsalaja/toldo"}</code>
      <AnimatePresence mode="popLayout">
        {copied ? (
          <motion.button className="text-muted hover:text-foreground" {...variants.icon}>
            <CheckIcon />
          </motion.button>
        ) : (
          <motion.button className="text-muted hover:text-foreground" {...variants.icon}>
            <ClipboardIcon
              onClick={() => {
                navigator.clipboard.writeText("pnpm install toldo");
                setCopied(true);
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </pre>
  );
};

export const Showcase = () => {
  const [open, setOpen] = React.useState(false);

  const dialogs: Dialog.Props[] = [
    {
      id: "home",
      dialog: (
        <Dialog.StackContent className="flex max-h-[85vh] w-[90vw] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px] ">
          <div className="flex flex-col gap-1 px-6 pt-6">
            <Dialog.StackTitle className="font-medium text-large">Toldo</Dialog.StackTitle>
            <Dialog.StackDescription className="text-default text-muted">
              An elevated dialog component for React applications.
            </Dialog.StackDescription>
          </div>
          <div className="flex gap-4 p-6 pt-4">
            <Dialog.StackAdd
              dialogId="source"
              className="!text-green-11 flex h-[32px] w-full items-center justify-center gap-2 rounded-lg bg-green-a3 px-3 align-middle transition-all ease-in-out hover:brightness-150"
            >
              Source
            </Dialog.StackAdd>
            <Dialog.StackAdd
              dialogId="install"
              className="!text-pink-11 flex h-[32px] w-full items-center justify-center gap-2 rounded-lg bg-pink-a3 px-3 align-middle transition-all ease-in-out hover:brightness-150"
            >
              Install
            </Dialog.StackAdd>
          </div>
          <div className="flex justify-center border-gray-3 border-t bg-gray-2 px-6 py-3">
            <Dialog.StackAdd className="flex gap-1 text-small" dialogId="learn">
              <span className="text-muted">
                A toldo is a sheet of cloth that stretches out from a door or window to keep the sun or rain off a shop
                or tent.
              </span>
            </Dialog.StackAdd>
          </div>
        </Dialog.StackContent>
      ),
    },
    {
      id: "install",
      dialog: (
        <Dialog.StackContent className="flex max-h-[85vh] w-[90vw] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px] ">
          <div className="flex flex-col gap-1 px-6 pt-6">
            <Dialog.StackTitle className="font-medium text-large">Installation</Dialog.StackTitle>
            <Dialog.StackDescription className="text-default text-muted">
              Install the package via your package manager.
            </Dialog.StackDescription>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <CodeBlock />
          </div>
          <div className="flex justify-center border-gray-3 border-t bg-gray-2 px-6 py-3">
            <Dialog.StackRemove
              dialogId="install"
              className="!text-red-11 h-[32px] w-full rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Return
            </Dialog.StackRemove>
          </div>
        </Dialog.StackContent>
      ),
    },
    {
      id: "source",
      dialog: (
        <Dialog.StackContent className="flex max-h-[85vh] w-[90vw] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px] ">
          <div className="flex flex-col gap-1 px-6 pt-6">
            <Dialog.StackTitle className="font-medium text-large">Source</Dialog.StackTitle>
            <Dialog.StackDescription className="text-default text-muted">
              Leave a star if you like it!
            </Dialog.StackDescription>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <Source />
          </div>
          <div className="flex justify-center border-gray-3 border-t bg-gray-2 px-6 py-3">
            <Dialog.StackRemove
              dialogId="source"
              className="!text-red-11 h-[32px] w-full rounded-lg bg-red-a3 px-3 transition-all ease-in-out hover:brightness-150"
            >
              Return
            </Dialog.StackRemove>
          </div>
        </Dialog.StackContent>
      ),
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} dialogs={dialogs}>
      <Dialog.Trigger
        dialogId="home"
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
