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
  }, [searchParams]);
  const router = useRouter();
  const gotToSearch = () => {
    if (search) {
      router.push(`/result?q=${encodeURIComponent(search)}`);
    }
  };
  return (
    <div className="relative hidden w-full h-[45px] max-w-md overflow-hidden sm:flex items-center border rounded ">
      <input
        onKeyDown={(e) => e.key === "Enter" && gotToSearch()}
        value={search}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        className="w-[90%] bg-transparent py-1 pl-10 pr-8  placeholder-white outline-none sm:py-2"
        placeholder="Search"
      />
      <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
        <SearchIcon size={20} />
      </span>
      {search && (
        <button
          title="Clear search"
          onClick={() => {
            setSearch("");
          }}
          className="p-1 rounded-full hover:bg-white/10 absolute right-[45px] top-1/2 inline-block -translate-y-1/2"
        >
          <X size={25} />
        </button>
      )}
      <button
        onClick={gotToSearch}
        className="h-full border-l py-[10px] flex items-center justify-center w-[10%]"
      >
        <SearchIcon size={20} />
      </button>
    </div>
  );
};

export default Search;
