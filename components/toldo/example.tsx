"use client";

import * as Dialog from "@/components/toldo";
import { Cross1Icon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";

export const ToldoExample = () => {
  const { dialogs, pushDialog, popDialog } = Dialog.useDialogStack();

  const DialogExampleThree: Dialog.Props = {
    id: "dialog-example-three",
    dialog: (
      <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault}>
        <Dialog.Item className="relative h-[200px] w-[200px] border border-gray-4 bg-blue-400" />
        <Dialog.Button className="absolute top-0 right-0" onClick={() => popDialog("dialog-example-three")}>
          <Cross1Icon />
        </Dialog.Button>
      </Dialog.Content>
    ),
  };

  const DialogExampleTwo: Dialog.Props = {
    id: "dialog-example-two",
    dialog: (
      <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault}>
        <Dialog.Item className="relative h-[200px] w-[200px] border border-gray-4 bg-pink-2" />
        <Dialog.Button className="absolute top-0 left-0" onClick={() => pushDialog(DialogExampleThree)}>
          <PlusIcon />
        </Dialog.Button>
        <Dialog.Button className="absolute top-0 right-0" onClick={() => popDialog("dialog-example-two")}>
          <Cross1Icon />
        </Dialog.Button>
      </Dialog.Content>
    ),
  };

  const DialogExampleOne: Dialog.Props = {
    id: "dialog-example",
    dialog: (
      <Dialog.Content onClick={() => pushDialog(DialogExampleTwo)} onOpenAutoFocus={(event) => event.preventDefault()}>
        <Dialog.Item className="relative h-[200px] w-[200px] border border-gray-4 bg-gray-2" />
      </Dialog.Content>
    ),
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild onClick={() => pushDialog(DialogExampleOne)}>
        <Dialog.Item className="relative isolate flex h-[400px] w-[400px] border border-gray-4 bg-gray-2" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-a4" />
        <Dialog.Stack dialogs={dialogs} />
      </Dialog.Portal>
    </Dialog.Root>
  );
};
