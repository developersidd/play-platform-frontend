"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxios from "@/hooks/useAxios";
import useDebounce from "@/hooks/useDebounce";
import useQueryParam from "@/hooks/useQueryParam";
import { Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// create a sorting options array to use in the dropdown menu with prop, label as object
const sortingOptions = [
  { value: "title", label: "Title" },
  { value: "views", label: "Views" },
  { value: "likes", label: "Likes" },
  { value: "dislikes", label: "Dislikes" },
  { value: "createdAt", label: "Date" },
];

const VideosTableHeader = ({ selectedIds, onCheckboxChange, totalVideos }) => {
  const { setValue, getValue } = useQueryParam();
  const [search, setSearch] = useState(getValue("search") || "");
  const [filterField, setFilterField] = useState(getValue("sortBy") || "title");
  console.log(" filterField:", filterField);
  const [sortOrder, setSortOrder] = useState(getValue("sortOrder") || "desc");
  const [status, setStatus] = useState(getValue("status"));
  const handleDebounceSearch = useDebounce((value) => {
    setValue(["search", "page"], [value, 1]);
  }, 500);
  const { apiClient } = useAxios();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteVideos = async () => {
    if (selectedIds?.length > 0) {
      try {
        setIsDeleting(true);
        await apiClient.delete("/videos/", {
          data: { videoIds: selectedIds },
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
          {/*  show totalVideos as badge inside searchbar */}
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
          <Button variant="secondary">
            Total videos: <span className="font-bold">{totalVideos}</span>
          </Button>
          {/*  delete many videos */}
          {selectedIds?.length > 0 && (
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
          <Select
            value={filterField}
            onValueChange={(value) => {
              setFilterField(value);
              setValue("sortBy", value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortingOptions.map(({ value, label }) => (
                <SelectItem key={value} className="capitalize" value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Type */}
          <Select
            onValueChange={(value) => {
              setSortOrder(value);
              setValue("sortOrder", value);
            }}
            value={sortOrder}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>

          {/* Publish Filter */}

          <Select
            value={status || "all"}
            onValueChange={(value) => {
              setStatus(value);
              setValue(["status", "page"], [value, 1]);
            }}
          >
            <SelectTrigger className="capitalize w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["all", "published", "unpublished"].map((status) => (
                <SelectItem className="capitalize" key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default VideosTableHeader;
