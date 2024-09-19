import React from "react";
import { Header } from "../types/types";

interface TableOfContentsProps {
  headers: Header[];
  scrollToHeader: (id: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  headers,
  scrollToHeader,
}) => (
  <nav aria-label="Table of contents" className="fixed right-[100px] w-[300px]">
    <div className="p-2 flex flex-col gap-[20px]">
      {headers.map((header) => (
        <button
          key={header.id}
          onClick={() => scrollToHeader(header.id)}
          className="text-left py-1 hover:bg-gray-200"
        >
          {header.text}
        </button>
      ))}
    </div>
  </nav>
);

export default TableOfContents;
