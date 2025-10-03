import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const searchVal = searchParams.get("q");
  useEffect(() => {
    if (searchVal) {
      setSearch(searchVal);
    }
    return () => {
      setSearch("");
    };
  }, [searchVal]);
  const router = useRouter();
  const gotToSearch = () => {
    if (search) {
      router.push(`/result?q=${encodeURIComponent(search)}`);
    }
  };
  return (
    <div className="relative hidden w-full  h-[45px]  lg:max-w-md overflow-hidden lg:flex items-center border dark:border-gray-600 border-gray-300 rounded mr-24">
      <input
        onKeyDown={(e) => e.key === "Enter" && gotToSearch()}
        value={search}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        className="w-[90%] bg-transparent py-1 pl-10 pr-9  dark:placeholder-gray-300 outline-none sm:py-2"
        placeholder="Search"
      />
      <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
        <SearchIcon className="text-gray-600" size={20} />
      </span>
      {search && (
        <button
          title="Clear search"
          onClick={() => {
            setSearch("");
          }}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 absolute right-[53px] top-1/2 inline-block -translate-y-1/2"
        >
          <X size={20} className="text-gray-500" />
        </button>
      )}
      <button
        disabled={!search}
        onClick={gotToSearch}
        className="h-full border-l border-gray-300 dark:border-gray-600 py-[10px] flex items-center justify-center w-[50px]"
      >
        <SearchIcon size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

export default Search;
