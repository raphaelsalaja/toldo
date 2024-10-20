import * as Toldo from "@/components/toldo";

export const ToldoExample = () => {
  return (
    <Toldo.Root id="example" debug>
      <Toldo.Trigger className="relative isolate flex h-72 w-72 bg-white">
        <Toldo.Item
          id="container"
          className="h-full w-full bg-[#FFBEE8] p-4"
          style={{
            borderRadius: "32px",
          }}
        />
      </Toldo.Trigger>
      <Toldo.Portal>
        <Toldo.Overlay />
        <Toldo.Content className="relative isolate flex items-center">
          <Toldo.Item
            id="container"
            className="h-[597px] w-[597px] bg-[#FFBEE8]"
            style={{
              borderRadius: "32px",
            }}
          />
        </Toldo.Content>
      </Toldo.Portal>
    </Toldo.Root>
  );
};
