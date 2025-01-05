"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";

const HistorySearch = () => {
  const [search, setSearch] = useState("");

  return (
    <div
      className="w-full relative border-b border-gray-400 flex items-center
  before:w-full before:h-[1.5px] before:bg-white before:absolute before:bottom-0 before:left-0 
  before:z-10 before:transform before:scale-x-0 before:transition-transform before:duration-300 
  before:ease-in-out before:origin-center 
  before:focus-within:scale-x-100 before:focus-within:transition-transform 
  before:focus-within:duration-300 before:focus-within:ease-in-out 
        "
    >
      <Search />
      <input
        type="text"
        placeholder="Search history"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full focus:outline-none  bg-transparent pl-2 py-2 pr-10 rounded-md"
      />
      <button
        onClick={() => setSearch("")}
        className={`${
          search ? "block" : "hidden"
        } absolute right-0 p-2 hover:bg-[#3F3F3F] rounded-full`}
      >
        <X />
      </button>
    </div>
  );
};

export default HistorySearch;
