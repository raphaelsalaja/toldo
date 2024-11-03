"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import { useState } from "react";
import * as Dialog from "toldo";

export const Shared = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        asChild
        className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95"
      >
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 font-medium text-[17px] text-mauve12">Edit profile</Dialog.Title>
          <Dialog.Description className="mt-2.5 mb-5 text-[15px] text-mauve11 leading-normal">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="w-[90px] text-right text-[15px] text-violet11" htmlFor="name">
              Name
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              id="name"
              defaultValue="Pedro Duarte"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="w-[90px] text-right text-[15px] text-violet11" htmlFor="username">
              Username
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              id="username"
              defaultValue="@peduarte"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
