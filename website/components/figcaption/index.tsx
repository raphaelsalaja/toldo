"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clipboard, Code, FileCode, FileTerminal, Terminal } from "lucide-react";
import { type DetailedHTMLProps, type HTMLAttributes, useEffect, useRef, useState } from "react";

interface FigCaptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  "data-language"?: string;
}

export default function FigCaption({ ...props }: FigCaptionProps) {
  const language = props["data-language"];
  const [isCopied, setIsCopied] = useState(false);

  const figCaptionRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (figCaptionRef.current) {
      preRef.current = figCaptionRef.current.nextElementSibling as HTMLPreElement;
    }
  }, []);

  const Icon = () => {
    switch (language) {
      case "bash":
        return <Terminal width={14} />;
      case "tsx":
        return <Code width={14} />;
      default:
        return null;
    }
  };

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;
    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  const CheckIcon = motion.create(Check);
  const ClipboardIcon = motion.create(Clipboard);

  const iconProps = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    },
    transition: {
      ease: [0.19, 1, 0.22, 1],
      duration: 0.4,
    },
    width: 14,
    color: "var(--gray-8)",
  };

  return (
    <figcaption
      ref={figCaptionRef}
      className="bg-gray-2 pl-4 py-2 pr-2 text-muted border-b border-gray-4 font-normal text-small -mb-6 flex gap-2 items-center justify-between"
    >
      <div className="flex gap-1.5 items-center">
        <Icon /> {props.children}
      </div>
      <button
        type="button"
        disabled={isCopied}
        onClick={handleClickCopy}
        className={clsx(
          "relative before:absolute before:top-0 before:left-0 before:-z-[1] before:w-full before:h-full before:bg-transparent before:rounded-md before:scale-75 before:content-[''] before:transition-all",
          "hover:before:scale-100 hover:before:bg-gray-3",
          "w-[24px] h-[24px] flex items-center justify-center rounded-md z-[0] bg-transparent transition-all",
          isCopied && "hover:before:scale-75 hover:before:bg-transparent",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isCopied ? <CheckIcon {...iconProps} /> : <ClipboardIcon {...iconProps} />}
        </AnimatePresence>
      </button>
    </figcaption>
  );
}
