import { Basic, BasicWithAnimation, Shared, Stacked } from "@/components/examples";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-8 p-8">
      <Basic />
      <BasicWithAnimation />
      <Shared />
      <Stacked />
    </div>
  );
}
