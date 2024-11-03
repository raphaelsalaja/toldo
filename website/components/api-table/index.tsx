import React from "react";
import { PropInformation } from "../prop-information";

interface Description {
  title: string;
  information?: string;
}

interface APITableProps {
  data: {
    name: Description;
    type?: Description;
    default?: string;
  }[];
}

export const APITable = ({ data }: APITableProps) => {
  return (
    <div className="border-gray-4 border rounded-lg w-full h-full mt-6 overflow-hidden">
      <table className="w-full h-full">
        <thead className="bg-gray-2 text-left border-b border-gray-4 font-default text-default">
          <tr>
            <th className="font-normal py-3 px-4 text-default">Prop</th>
            <th className="font-normal py-3 px-4 text-default">Type</th>
            <th className="font-normal py-3 px-4 text-default">Default</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name.title} className="text-left border-b border-gray-4 font-default text-default w-full">
              <td className="font-normal py-3 px-4 text-small">
                <div className="bg-pink-3 text-pink-11 w-fit px-2 rounded-md font-mono">{item.name.title}</div>
                {item.name.information && <PropInformation information={item.name.information} />}
              </td>
              <td className="font-normal py-3 px-4 text-small">
                {item.type ? (
                  <div className=" flex gap-1 items-center w-fit">
                    <div className="bg-gray-3 text-gray-11 w-fit px-2 rounded-md font-mono">{item.type.title}</div>
                    {item.type.information && <PropInformation information={item.type.information} />}
                  </div>
                ) : (
                  <div>-</div>
                )}
              </td>
              <td className="font-normal py-3 px-4 text-small">
                {item.default ? <div className="bg-gray-3 text-gray-11 w-fit px-2 rounded-md font-mono">{item.default}</div> : <div>-</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
