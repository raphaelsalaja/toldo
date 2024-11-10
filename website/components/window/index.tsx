"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, type HTMLMotionProps, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import * as Dialog from "toldo";

interface ContentProps extends HTMLMotionProps<"div"> {
  src: string;
}

const fetchTitle = async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.querySelector("title")?.innerText || "Untitled";
};

const Content: React.FC<ContentProps> = ({ src = "about:blank", children, ...props }) => {
  const { data: title = "Loading...", isError } = useQuery({
    queryKey: ["title", src],
    queryFn: () => fetchTitle(src),
  });
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 50) return prev + 2;
          if (prev < 85) return prev + 1;
          return prev + 0.5;
        });
      }, 150);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [progress]);

  const handleIframeLoad = () => setProgress(100);

  return (
    <motion.div
      className="relative flex h-[640px] max-h-[85vh] w-[90vw] max-w-[768px] flex-col items-start overflow-hidden rounded-lg border border-gray-4 bg-gray-1"
      onAnimationComplete={() => setProgress((prev) => (prev < 10 ? 10 : prev))}
      {...props}
    >
      <div className="relative flex w-full items-center justify-between gap-2 p-2">
        <div className="flex w-full items-center justify-center">
          <Dialog.Title className="flex h-8 w-3/5 items-center justify-center rounded-md bg-gray-3 px-2 text-gray11">
            {isError ? "Unknown" : title}
          </Dialog.Title>
        </div>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-between p-4">
          <div className="flex gap-2">
            <div className="h-4 min-w-4 rounded-full border border-gray-4 bg-red-10" />
            <div className="h-4 min-w-4 rounded-full border border-gray-4 bg-yellow-10" />
            <div className="h-4 min-w-4 rounded-full border border-gray-4 bg-green-10" />
          </div>
        </div>
      </div>
      <div className="relative h-full w-full bg-gray-2">
        <div className="absolute top-0 left-0 h-px w-full bg-gray-4">
          <motion.div
            className="h-full bg-gray-12"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
            transition={{ ease: "linear" }}
          />
        </div>
        <AnimatePresence initial={false}>
          {progress >= 20 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: progress === 100 ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: [0.19, 1, 0.22, 1], duration: 1 }}
              className="scrollbar-none h-full w-full"
            >
              <iframe
                src={src}
                title={title}
                loading="lazy"
                className="scrollbar-none h-full w-full"
                sandbox="allow-same-origin allow-scripts allow-popups"
                onLoad={handleIframeLoad}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface WindowProps {
  label: string;
  src: string;
}

export const Window = ({ label, src }: WindowProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex items-center gap-1 text-muted underline decoration-1 decoration-gray-a4 underline-offset-2 transition-opacity hover:opacity-50">
        {label}
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <AnimatePresence mode="popLayout">
          {open && (
            <Dialog.Overlay className="fixed top-0 left-0 h-full w-full">
              <motion.div
                className="fixed inset-0 bg-black-a10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.4 }}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {open && (
            <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.6 }}
              >
                <Content src={src} />
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
