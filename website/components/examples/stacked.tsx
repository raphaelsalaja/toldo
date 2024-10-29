"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import * as Dialog from "toldo";

export const StackedExample = () => {
  const dialogs: Dialog.Props[] = [
    {
      id: "dialog-one",
      open: false,
      dialog: (
        <Dialog.Content>
          <Dialog.Item className="relative h-[200px] w-[200px] border border-gray-4 bg-gray-2" />
          <Dialog.Button kind="open" dialogId="dialog-two" className="absolute top-0 left-0">
            <PlusIcon />
          </Dialog.Button>
        </Dialog.Content>
      ),
    },
    {
      id: "dialog-two",
      open: false,
      dialog: (
        <Dialog.Content>
          <Dialog.Item className="relative h-[200px] w-[200px] border border-gray-4 bg-pink-2" />
          <Dialog.Button kind="open" dialogId="dialog-three" className="absolute top-0 left-0">
            <PlusIcon />
          </Dialog.Button>
          <Dialog.Button kind="close" dialogId="dialog-two" className="absolute top-0 right-0">
            <Cross1Icon />
          </Dialog.Button>
        </Dialog.Content>
      ),
    },
    {
      id: "dialog-three",
      open: false,
      dialog: (
        <Dialog.Content>
          <Dialog.Item className="relative h-[200px] w-[200px] border border-gray-4 bg-blue-400" />
          <Dialog.Button kind="close" dialogId="dialog-three" className="absolute top-0 right-0">
            <Cross1Icon />
          </Dialog.Button>
        </Dialog.Content>
      ),
    },
  ];

  return (
    <Dialog.Provider dialogs={dialogs}>
      <Dialog.Root>
        <Dialog.Trigger asChild dialogId="dialog-one">
          <Dialog.Item className="relative isolate flex h-[400px] w-[400px] border border-gray-4 bg-gray-2" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-a2 backdrop-blur-[1px]" />
          <Dialog.Stack />
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Provider>
  );
};
