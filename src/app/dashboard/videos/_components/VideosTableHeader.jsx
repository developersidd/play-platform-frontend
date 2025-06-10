"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useAxios from "@/hooks/useAxios";
import useDebounce from "@/hooks/useDebounce";
import useQueryParam from "@/hooks/useQueryParam";
import { ChevronDown, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// create a sorting options array to use in the dropdown menu with prop, label as boject
const sortingOptions = [
  { prop: "title", label: "Title" },
  { prop: "views", label: "Views" },
  { prop: "likes", label: "Likes" },
  { prop: "dislikes", label: "Dislikes" },
  { prop: "createdAt", label: "Date" },
];

const VideosTableHeader = ({ selectedVideoIds, onCheckboxChange }) => {
  const { setValue, getValue } = useQueryParam();
  const [search, setSearch] = useState(getValue("search") || "");
  const [filterField, setFilterField] = useState(getValue("sortBy") || "Date");
  const [sortOrder, setSortOrder] = useState(getValue("sortOrder") || "Desc");
  const [status, setStatus] = useState(getValue("status") || "all");
  const handleDebounceSearch = useDebounce((value) => {
    setValue(["search", "page"], [value, 1]);
  }, 500);
  const { apiClient } = useAxios();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteVideos = async () => {
    if (selectedVideoIds?.length > 0) {
      try {
        setIsDeleting(true);
        await apiClient.delete("/videos/", {
          data: { videoIds: selectedVideoIds },
        });
        toast.success("Videos deleted successfully");
        onCheckboxChange(false, "all");
        router.refresh();
      } catch (error) {
        console.error("Error deleting videos:", error);
        toast.error("Failed to delete videos");
      } finally {
        setIsDeleting(false);
        router.refresh();
      }
    } else {
      toast.warn("No videos selected for deletion");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4">
        {/* Search */}
        <div className="relative w-full md:max-w-[300px]">
          <Input
            placeholder="Search videos..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              handleDebounceSearch(value);
            }}
            className="pr-10"
          />
          {search && (
            <button
              title="Clear search"
              onClick={() => {
                setSearch("");
                setValue(["search", "page"], ["", 0]);
              }}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 absolute right-2 top-1/2 inline-block -translate-y-1/2"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/*  delete many videos */}
          {selectedVideoIds?.length > 0 && (
            <Button
              disabled={isDeleting}
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteVideos}
            >
              <Trash />
              Delete videos
            </Button>
          )}

          {/* Filter Field */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort By:<span className="capitalize">{filterField}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortingOptions.map(({ prop, label }) => (
                <DropdownMenuItem
                  className="capitalize"
                  key={label}
                  onClick={() => {
                    setFilterField(label);
                    setValue("sortBy", prop);
                  }}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort Type:<span className="capitalize"> {sortOrder}</span>
                <ChevronDown className="ml-1 h-4 w-4 capitalize" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["asc", "desc"].map((type) => (
                <DropdownMenuItem
                  className="capitalize"
                  key={type}
                  onClick={() => {
                    setSortOrder(type);
                    setValue("sortOrder", type);
                  }}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Publish Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status:<span className="capitalize">{status}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["all", "published", "unpublished"].map((status) => (
                <DropdownMenuItem
                  className="capitalize"
                  key={status}
                  onClick={() => {
                    console.log(status);
                    setStatus(status);
                    setValue(["status", "page"], [status, 1]);
                  }}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default VideosTableHeader;
