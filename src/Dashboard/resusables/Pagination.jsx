import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between py-4">
      <div>
        <p className="text-md text-gray-500">
          Showing
          <span className="font-medium">
            {" "}
            {currentPage * postsPerPage - postsPerPage === 0
              ? 1
              : currentPage * postsPerPage - postsPerPage}{" "}
          </span>
          to
          <span className="font-medium">
            {" "}
            {currentPage === parseInt(totalPosts / 10) + 1
              ? totalPosts
              : currentPage * postsPerPage}{" "}
          </span>
          of
          <span className="font-semibold"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block">
        <ul className="flex list-none flex-wrap rounded pl-0">
          <Stack spacing={2}>
            <Pagination
              count={parseInt(totalPosts / 10) + 1}
              size="large"
              page={currentPage}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={(e, page) => paginate(page)}
            />
          </Stack>

          {/* <li>
            {pageNumbers.map((number) => (
              <a
                onClick={() => {
                  paginate(number)
                }}
                href="#!"
                className={
                  currentPage === number
                    ? 'bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                }
              >
                {number}
              </a>
            ))}
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
