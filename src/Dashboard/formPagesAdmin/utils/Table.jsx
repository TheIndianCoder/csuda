import React from "react";
import { ColorRing } from "react-loader-spinner";

const Table = ({
  data = null,
  columns = null,
  hover = true,
  striped = true,
}) => {
  console.log(data.length,data,"table data") 
  const getCaps = (head, field) => {
    if (head) return head.toUpperCase();
    return field.toUpperCase();
  };
  return (
  <div className="flex flex-col">
    <div className="overflow-x-auto">
      <div className="p-2.5">
        <div className="overflow-auto">
          <table className="min-w-full">
            <thead className="preview-saf-form-table-laypout">
              <tr>
                {columns &&
                  columns.map((head) => (
                    <th
                      scope="col"
                      className="px-2 py-2 text-xs font-bold text-center 
                        text-gray-700 whitespace-normal uppercase border border-gray-300"
                    >
                      {getCaps(head.header, head.field)}</th>
                 ))}
              </tr>
           </thead>
        <tbody className="divide-y divide-gray-200">
          {
          data?.length > 0 ?
            data?.map((row) => ( 
              <tr className={`${hover && "hover"} ${striped && "striped"} hover:bg-gray-50 dark:hover:bg-gray-600`}>
                {columns.map((col) => (
                  <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">{row[col.field]}</td>
                ))}
              </tr>
            ))
            : 
            data.length === 0 ? 
            <p className="text-sm font-semibold text-gray-700 mx-auto my-2">No records found!</p>
            : 
            <ColorRing
            visible={true}
            height="40"
            width="40"
            colors={['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']}

          />
            }
        </tbody>
      </table>
      {/* {data ? null : <p>No Row to show</p>} */}
     
        </div>
       </div>
      </div>
    </div>
  );
};

export default Table;