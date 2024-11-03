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
      <div className="border-gray-4 border  bg-gray-3 rounded-lg w-full  mt-6 overflow-hidden h-[42px]">
        <div className="text-center py-3 text-gray-11 font-default text-small">No Additional Props</div>
      </div>
    );
  }

  return (
    <div className="border-gray-4 border rounded-lg w-full h-full mt-6 overflow-hidden">
      <table className="w-full h-full table-fixed">
        <thead className="bg-gray-2 text-left border-b border-gray-4 font-default text-default">
          <tr>
            <th className="font-normal py-3 px-4 text-default w-1/3">Prop</th>
            <th className="font-normal py-3 px-4 text-default w-1/3">Type</th>
            <th className="font-normal py-3 px-4 text-default w-1/3">Default</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name} className={clsx("text-left font-default text-default w-full", item !== data[data.length - 1] && "border-b border-gray-4")}>
              <td className="font-normal py-3 px-4 text-small">
                <div className="flex gap-1 items-center">
                  <div className="bg-pink-3 text-pink-11 w-fit px-1 rounded-md font-mono">{item.name}</div>
                  {item.nameDetails && <PropInformation content={item.nameDetails} />}
                </div>
              </td>
              <td className="font-normal py-3 px-4 text-small">
                {item.type ? (
                  <div className=" flex gap-1 items-center w-fit">
                    <div className="bg-gray-3 text-gray-11 w-fit px-1 rounded-md font-mono">{item.type}</div>
                    {item.typeDetails && <PropInformation content={item.typeDetails} />}
                  </div>
                ) : (
                  <div>-</div>
                )}
              </td>
              <td className="font-normal py-3 px-4 text-small">
                {item.default ? <div className="bg-gray-3 text-gray-11 w-fit px-1 rounded-md font-mono">{item.default}</div> : <div>-</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
