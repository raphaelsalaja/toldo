import clsx from "clsx";
import type React from "react";
import { PropInformation } from "../prop-information";

interface PropsTableProps {
  data: {
    name: string;
    nameDetails?: React.ReactNode;
    type: string;
    typeDetails?: React.ReactNode;
    default?: string;
    defaultDetails?: React.ReactNode;
  }[];
}

export const PropsTable = ({ data }: PropsTableProps) => {
  if (data.length === 0) {
    return (
      <div className="mt-6 h-[42px] w-full overflow-hidden rounded-lg border border-gray-4 bg-gray-2">
        <div className="py-3 text-center font-default text-gray-11 text-small">No Additional Props</div>
      </div>
    );
  }

  return (
    <div className="mt-6 h-full w-full overflow-hidden rounded-lg border border-gray-4">
      <table className="h-full w-full md:table-fixed">
        <thead className="border-gray-4 border-b bg-gray-2 text-left font-default text-default">
          <tr>
            <th className="px-4 py-3 font-normal text-small">Prop</th>
            <th className="px-4 py-3 font-normal text-small">Type</th>
            <th className="px-4 py-3 font-normal text-small">Default</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.name}
              className={clsx(
                "w-full text-left font-default text-default",
                item !== data[data.length - 1] && "border-gray-4 border-b",
              )}
            >
              <td className="px-4 py-3 font-normal text-small">
                <div className="flex items-center gap-1">
                  <div className="w-fit rounded-md bg-pink-3 px-1 font-mono text-pink-11">{item.name}</div>
                  {item.nameDetails && <PropInformation content={item.nameDetails} />}
                </div>
              </td>
              <td className="px-4 py-3 font-normal text-small">
                {item.type ? (
                  <div className=" flex w-fit items-center gap-1">
                    <div className="w-fit rounded-md bg-gray-3 px-1 font-mono text-gray-11">{item.type}</div>
                    {item.typeDetails && <PropInformation content={item.typeDetails} />}
                  </div>
                ) : (
                  <div>-</div>
                )}
              </td>
              <td className="px-4 py-3 font-normal text-small">
                {item.default ? (
                  <div className="w-fit rounded-md bg-gray-3 px-1 font-mono text-gray-11">{item.default}</div>
                ) : (
                  <div>-</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
