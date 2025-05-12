"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
const UploadThumbnailForm = ({ form, isEditingVideo }) => {
  const [isChangingThumbnail, setIsChangingThumbnail] = useState(
    !isEditingVideo
  );
  return (
    <FormField
      control={form.control}
      name="thumbnail"
      render={({ field: { value, onChange, ...fieldProps } }) => {
        return (
          <FormItem>
            <FormControl>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label for="thumbnail" className="mb-1 inline-block">
                    Thumbnail<sup>*</sup>
                  </label>
                  {/* show edit button if editing video */}
                  {value && (
                    <Button
                      type="button"
                      variant="outline"
                      className=""
                      onClick={() => {
                        setIsChangingThumbnail(!isChangingThumbnail);
                      }}
                    >
                      {isChangingThumbnail ? (
                        "Cancel"
                      ) : (
                        <>
                          <Pencil className="h-4 w-4 " />
                          Edit
                        </>
                      )}
                    </Button>
                  )}
                </div>
                {/*  show the image if editing video */}
                {isChangingThumbnail ? (
                  <div className="mt-5 border-2 border-dashed h-[300px] flex items-center justify-center">
                    <label
                      htmlFor="thumbnail"
                      className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                    >
                      <input
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        {...fieldProps}
                        onChange={(e) => {
                          onChange(e.target?.files && e.target.files[0]);
                          setIsChangingThumbnail(false);
                        }}
                        id="thumbnail"
                        type="file"
                        className="sr-only "
                      />
                      Select File
                    </label>
                  </div>
                ) : (
                  value && (
                    <div className="mt-5">
                      <Image
                        width={700}
                        height={500}
                        src={value?.name ? URL.createObjectURL(value) : value}
                        alt="Thumbnail"
                        className="w-full h-[300px] border"
                      />
                      {/* name of the image */}
                      <p className="mt-2 text-sm text-secondary">
                        {value?.name}
                      </p>
                    </div>
                  )
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default UploadThumbnailForm;
