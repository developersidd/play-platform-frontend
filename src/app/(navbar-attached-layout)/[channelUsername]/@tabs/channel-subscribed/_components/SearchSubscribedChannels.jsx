"use client";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchSubscribedChannels = () => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const searchVal = searchParams.get("search");
    if (searchVal) {
      setSearch(searchVal);
    }
  }, []);
  const pathname = usePathname();
  const router = useRouter();
  const handleDebounceSearch = useDebounce((value) => {
    if (value === "") {
      router.push(pathname);
      return;
    }
    router.push(`${pathname}?search=${value}`);
  }, 500);
  return (
    <div class="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
      <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </span>
      <input
        value={search}
        onChange={(e) => {
          const { value } = e.target;
          setSearch(value);
          handleDebounceSearch(value);
        }}
        class="w-full bg-transparent outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchSubscribedChannels;
