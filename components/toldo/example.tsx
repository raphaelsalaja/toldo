import * as Dialog from "@/components/toldo";

export const ToldoExample = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Dialog.Item
          layoutId="container"
          className="relative isolate flex h-[400px] w-[400px] border border-gray-4 bg-gray-2"
          style={{ borderRadius: "8px" }}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-a4" />
        <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2">
          <Dialog.Item
            layoutId="container"
            className="relative isolate flex h-[600px] w-[600px] border border-gray-4 bg-gray-2"
            style={{ borderRadius: "8px" }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
