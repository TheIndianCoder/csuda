import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import data from "./mock-data.json";

let PageSize = 10;

export default function DummyTable(tableHeader) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <div className="mb-6 h-full  overflow-auto shadow-md ">
        <table className="container mt-2 min-w-full table-auto text-left overflow-x-scroll">
          {tableHeader.tableHeader &&
            <thead className="flex table-header flex-col border-t">
              {tableHeader && tableHeader.tableHeader.map((tableHead) => {
                return (
                  <tr className="min-w-full border-b border-gray-300 py-1.5 flex justify-evenly">
                    {tableHead.length === 1 ?
                      <th className="text-blue-gray-700 font-bold uppercase text-xs">
                    {tableHead}</th>
                      :
                      <>
                        {tableHead.map((tableCol) => {
                          return (
                            <th className="text-blue-gray-700 font-bold uppercase text-xs">{tableCol}</th>
                          );
                        })}
                      </>
                    }
                  </tr>
                );
              })}
            </thead>
          }
        <table className="text-left container table-auto">
          <thead>
            <tr>
              <th className="whitespace-normal border border-gray-300 px-4 py-2  text-center text-xs font-bold uppercase text-blue-gray-800">
                ID
              </th>
              <th className="whitespace-normal border border-gray-300 px-4 py-2  text-center text-xs font-bold uppercase text-blue-gray-800">
                FIRST NAME
              </th>
              <th className="whitespace-normal border border-gray-300 px-4 py-2  text-center text-xs font-bold uppercase text-blue-gray-800">
                LAST NAME
              </th>
              <th className="whitespace-normal border border-gray-300 px-4 py-2  text-center text-xs font-bold uppercase text-blue-gray-800">
                EMAIL
              </th>
              <th className="whitespace-normal border border-gray-300 px-4 py-2  text-center text-xs font-bold uppercase text-blue-gray-800">
                PHONE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTableData.map((item) => {
              return (
                <tr
                  key={item?.id}
                  className="hover:dark:hover:bg-gray-600"
                >
                  <td className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-sm font-normal text-gray-700">
                    {item.id}
                  </td>
                  <td className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-sm font-normal text-gray-700">
                    {item.first_name}
                  </td>
                  <td className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-sm font-normal text-gray-700">
                    {item.last_name}
                  </td>
                  <td className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-sm font-normal text-gray-700">
                    {item.email}
                  </td>
                  <td className="whitespace-normal border border-gray-300 px-4 py-2 text-center text-sm font-normal text-gray-700">
                    {item.phone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </table>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
