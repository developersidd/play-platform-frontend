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
import { Button } from "../../ui/button";
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
                <div className="flex items-center justify-between mb-5">
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
                  <div>
                       
                        <input
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          {...fieldProps}
                          onChange={(e) => {
                            onChange(e.target?.files && e.target.files[0]);
                          setIsChangingThumbnail(false);

                          }}
                          id="thumbnail"
                          type="file"
                          className="w-full p-1 border file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                        />
                      </div>
                ) : (
                  value && (
                    <div className="mb-8 h-[250px] md:h-[300px] w-full">
                      <Image
                        width={700}
                        height={500}
                        src={value?.name ? URL.createObjectURL(value) : value}
                        alt="Thumbnail"
                        className="rounded-md w-full h-full border"
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
