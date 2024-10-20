import * as Modal from "@/components/toldo";

export const ToldoExample = () => {
  return (
    <Modal.Root id="example">
      <Modal.Trigger className="relative isolate flex h-72 w-72 bg-white">
        <Modal.Item
          id="container"
          className="h-full w-full bg-[#FFBEE8] p-4"
          style={{
            borderRadius: "32px",
          }}
        />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content className="relative isolate flex items-center">
          <Modal.Item
            id="container"
            className="h-[597px] w-[597px] bg-[#FFBEE8]"
            style={{
              borderRadius: "32px",
            }}
          />
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};
