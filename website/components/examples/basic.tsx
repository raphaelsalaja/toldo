import * as Dialog from "toldo";

export const Basic = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="h-[32px] rounded-lg border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95">
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" fixed inset-0 bg-black-a10" />
        <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] flex-col overflow-hidden rounded-xl border border-gray-3 bg-gray-1 sm:w-[384px]">
          <Dialog.Title className="px-6 pt-5 font-semibold text-foreground text-large">Change Username</Dialog.Title>
          <Dialog.Description className="px-6 py-1 text-default text-muted">
            Make changes to your username here.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-4 px-6 py-4">
            <input
              id="name"
              placeholder="@raphaelsalaja"
              className="inline-flex h-[32px] w-full flex-1 items-center justify-center rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
            />
          </fieldset>
          <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
            <Dialog.Close className="!text-gray-11 h-[32px] max-w-fit rounded-lg bg-gray-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Cancel
            </Dialog.Close>
            <Dialog.Close className="!text-green-11 h-[32px] max-w-fit rounded-lg bg-green-a3 px-3 transition-all ease-in-out hover:brightness-150">
              Save Changes
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
