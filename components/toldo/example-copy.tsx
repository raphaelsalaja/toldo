import * as Dialog from "@/components/toldo";

const IMAGE =
  "https://cms-cdn.thesolesupplier.co.uk/2023/10/cars-x-crocs-classic-clog-lightning-mcqueen-205759-610-front_w672_h672_pad_.jpg.webp";

const ALT_IMAGE = "Lightning McQueen Crocs";

const Divider = () => <div className="w-full border-border border-t" />;

const Row = ({
  leading,
  trailing,
}: {
  leading: string | React.ReactNode;
  trailing: string | React.ReactNode;
}) => (
  <div className="flex w-full justify-between">
    <div className="text-muted">{leading}</div>
    <div>{trailing}</div>
  </div>
);

export const ToldoExample = () => {
  return (
    <Dialog.Root id="example" debug>
      <Dialog.Trigger>
        <Dialog.Item
          id="container"
          className="relative isolate flex w-[200px] items-center justify-center overflow-hidden border border-border"
          style={{
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            alt={ALT_IMAGE}
            src={IMAGE}
            className="h-full w-full object-cover"
          />
        </Dialog.Item>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <div className="flex w-[500px] flex-col gap-4 rounded-[12px] border border-border bg-[#fff] p-[24px] ">
            <div className="flex flex-col gap-1">
              <div className="font-medium">Checkout</div>
              <div className="text-muted">
                Duis eiusmod Lorem do aute reprehenderit laborum nisi irure
                velit id reprehenderit nisi dolor ut deserunt.
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Dialog.Item
                id="container"
                className="relative isolate flex w-full items-center justify-center overflow-hidden border border-border"
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  alt={ALT_IMAGE}
                  src={IMAGE}
                  className="h-full w-full object-cover"
                />
              </Dialog.Item>
              <div className="flex justify-between gap-4">
                <div className="flex flex-col justify-between">
                  <div className="font-medium">
                    Crocs Classic Clog Lightning McQueen
                  </div>
                  <div className="text-muted">US 10 ⋅ SKU205759610</div>
                </div>
                <div className="flex h-fit justify-center rounded-md bg-gray-4 px-2 py-px text-muted text-small">
                  12x
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-1">
              <Row leading="Shipping" trailing="$1,000.00" />
              <Row leading="VAT (20%)" trailing="$10.00" />
            </div>
            <Divider />
            <Row
              leading="Total"
              trailing={<div className="text-green-400">$40.00</div>}
            />

            <div className="dark flex h-[40px] items-center justify-center rounded-lg bg-blue-400 text-gray-12">
              Procced Payment
            </div>
            <Dialog.Root id="dialog-2">
              <Dialog.Trigger className="trigger">Open Dialog 2</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content className="dialog-content">
                  <Dialog.Title>Dialog 2</Dialog.Title>
                  <p>
                    This is the second dialog stacked on top of the first one.
                  </p>
                  <Dialog.Close>Close Dialog 2</Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
