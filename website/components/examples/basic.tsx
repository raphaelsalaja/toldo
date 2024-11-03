"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "toldo";

export const Basic = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95">
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" fixed inset-0 bg-black-a10" />
        <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex max-h-[85vh] w-[80vw] flex-col rounded-xl border border-gray-3 bg-gray-1 sm:w-[512px] ">
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
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium text-green11 leading-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              type="submit"
              className="absolute top-2.5 right-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
