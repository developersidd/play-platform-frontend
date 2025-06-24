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
const sortingOptions = [
  { value: "username", label: "Username" },
  { value: "videosCount", label: "Videos" },
  { value: "tweetsCount", label: "Tweets" },
  { value: "subscribersCount", label: "Subscribers" },
  { value: "subscribedChannelsCount", label: "Subscribed Channels" },
  { value: "createdAt", label: "Date" },
];

const UsersTableHeader = ({ selectedIds, onCheckboxChange }) => {
  console.log(" selectedIds:", selectedIds)
  const { setValue, getValue } = useQueryParam();
  const [search, setSearch] = useState(getValue("search") || "");
  const [filterField, setFilterField] = useState(
    getValue("sortBy") || "createdAt"
  );
  const [sortOrder, setSortOrder] = useState(getValue("sortOrder") || "desc");

  const handleDebounceSearch = useDebounce((value) => {
    setValue(["search", "page"], [value, 1]);
  }, 500);
  const { apiClient } = useAxios();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteUsers = async () => {
    if (selectedIds?.length > 0) {
      try {
        setIsDeleting(true);
        await apiClient.delete("/users/", {
          data: { userIds: selectedIds },
        });
        toast.success("Users deleted successfully");
        onCheckboxChange(false, "all");
        router.refresh();
      } catch (error) {
        console.error("Error deleting users:", error);
        toast.error("Failed to delete users");
      } finally {
        setIsDeleting(false);
        router.refresh();
      }
    } else {
      toast.warn("No users selected for deletion");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4">
        {/* Search */}
        <div className="relative w-full md:max-w-[300px]">
          <Input
            placeholder="Search users..."
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
          {/*  delete many users */}
          {selectedIds?.length > 0 && (
            <Button
              disabled={isDeleting}
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteUsers}
            >
              <Trash />
              Delete users
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
              console.log(" value:", value);
              setSortOrder(value);
              setValue("sortOrder", value);
            }}
            value={sortOrder}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default UsersTableHeader;
