import { Card, Typography } from "@material-tailwind/react";
import React from "react";

const BankReconciliationTable = ({
  tableHeadings,
  tableRows,
  selectedPaymentMode,
}) => {
  return (
    <div>
      <div className="mb-12 h-full  overflow-auto shadow-md ">
        <table className="container w-full table-auto text-left">
          <thead>
            <tr>
              {tableHeadings.map((heading, index) => (
                <th
                  key={index}
                  scope="col"
                  className="w-10 whitespace-normal border border-gray-300 px-4 py-2  text-center text-xs font-bold uppercase text-blue-gray-800"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tableRows.map((eachRow, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {Object.entries(eachRow).map(([key, value]) => {
                    return (
                      <td
                        key={key.sl_no}
                        className="w-10 whitespace-normal border border-gray-300 px-4 py-2 text-center text-xs font-normal text-gray-700"
                      >
                        {value === null ? <i>Not mentioned</i> : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody> 
        </table>

        {/* <div className="flex flex-col items-center justify-center py-6">
          <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px">
              <li>
                <a
                  href="#"
                  class="ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  class="border border-gray-300 bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div> */}
      </div>
    </div>
  );
};

export default BankReconciliationTable;
