"use client";
import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const HistorySearch = () => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);
  const router = useRouter();

  // set search query from url
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(searchParams);
    if (urlSearchParams.has("search")) {
      setSearch(decodeURI(urlSearchParams.get("search")));
    }
  }, [searchParams]);

  // Debounce Handler
  const debounceHandler = useDebounce((value) => {
    if (value) {
      urlSearchParams.set("search", encodeURI(value));
    } else {
      urlSearchParams.delete("search");
    }
    router.push(`/history?${urlSearchParams.toString()}`, {
      scroll: false,
    });
  }, 500);
  const handleSearch = (value) => {
    setSearch(value);
    debounceHandler(value);
  };

  const clearSearch = () => {
    setSearch("");
    urlSearchParams.delete("search");
    router.push(`/history?${urlSearchParams.toString()}`, {
      scroll: false,
    });
  };

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
      <button className="p-2 hover:bg-[#3F3F3F] rounded-full">
        <Search size={20} />
      </button>
      <input
        type="text"
        placeholder="Search history"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full focus:outline-none  bg-transparent py-2 pr-10 rounded-md"
      />
      <button
        onClick={clearSearch}
        className={`${
          search ? "block" : "hidden"
        } absolute right-0 p-2 hover:bg-[#3F3F3F] rounded-full`}
      >
        <X size={21} />
      </button>
    </div>
  );
};

export default HistorySearch;
