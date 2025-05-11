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
  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false);
  return (
    <FormField
      control={form.control}
      name="thumbnail"
      render={({ field: { value, onChange, ...fieldProps } }) => {
        console.log("valei", value);
        return (
          <FormItem>
            <FormControl>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label for="thumbnail" className="mb-1 inline-block">
                    Thumbnail<sup>*</sup>
                  </label>
                  {/* show edit button if editing video */}
                  {isEditingVideo && (
                    <Button
                      type="button"
                      variant="outline"
                      className=""
                      onClick={() => setIsEditingThumbnail(!isEditingThumbnail)}
                    >
                      {isEditingThumbnail ? (
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
                {isEditingVideo && value && (
                  <div className="my-4">
                    <Image
                      width={700}
                      height={500}
                      src={value?.name ? URL.createObjectURL(value) : value}
                      alt="Thumbnail"
                      className="w-full h-[400px] border"
                    />
                    {/* name of the image */}
                    <p className="mt-2 text-sm text-secondary">{value?.name}</p>
                  </div>
                )}

                {/* input field */}
                {isEditingThumbnail && (
                  <input
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    {...fieldProps}
                    onChange={(e) => {
                      onChange(e.target?.files && e.target.files[0]);
                      setIsEditingThumbnail(false);
                    }}
                    id="thumbnail"
                    type="file"
                    className="w-full p-1 border file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                  />
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
