"use client";
import Paginate from "@/components/common/Paginate/Paginate";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useQueryParam from "@/hooks/useQueryParam";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
const VideosTableFooter = ({ totalPages }) => {
  const { setValue, getValue } = useQueryParam();
  const [perPage, setPerPage] = useState(parseInt(getValue("limit")) || 10);
  const currentPageNum = parseInt(getValue("page")) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageNum);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setValue("page", page);
    }
  };

  useEffect(() => {
    setCurrentPage(currentPageNum);
  }, [currentPageNum]);

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between py-4 gap-4">
      {/* Page info */}
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-2">
        {/* Per Page Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Per page: {perPage} <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[10, 20, 30, 40].map((num) => (
              <DropdownMenuItem
                key={num}
                onClick={() => {
                  setPerPage(num);
                  setValue("limit", num);
                }}
              >
                {num}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Pagination */}
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

export default VideosTableFooter;
