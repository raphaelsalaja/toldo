"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "toldo";

export const BasicExample = () => {
  return (
    <Dialog.Provider>
      <Dialog.Root>
        <Dialog.Trigger className="rounded-xl border border-gray-2 bg-gradient-to-t bg-gray-2 from-gray-2 to-gray-3 px-4 py-2 shadow-[0px_1px_0px_0px_var(--gray-4)_inset] transition-opacity ease-in-out hover:opacity-80">
          Open Dialog
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-a2 backdrop-blur-[1px]" />
          <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] rounded-md bg-gray-1 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="font-semibold text-lg">Dialog Title</Dialog.Title>
            <Dialog.Description className="mt-1 text-sm">Dialog description goes here.</Dialog.Description>
            <Dialog.Close className="absolute top-4 right-4">
              <Cross2Icon />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Provider>
  );
};
